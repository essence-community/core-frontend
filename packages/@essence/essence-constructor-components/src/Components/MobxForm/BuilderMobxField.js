import {Field} from "mobx-react-form";
import {action} from "mobx";
import isArray from "lodash/isArray";
import isDate from "lodash/isDate";
import isBoolean from "lodash/isBoolean";
import isNumber from "lodash/isNumber";
import isString from "lodash/isString";
import isObject from "lodash/isObject";
import isNil from "lodash/isNil";
import transform from "lodash/transform";
import each from "lodash/each";
import utils from "mobx-react-form/src/utils";
import parser from "mobx-react-form/src/parser";
import {parseValue} from "../../TextField/TFUtils/TFParseValue";

const defaultClearValue = ({value}) => {
    switch (true) {
        case isArray(value):
            return [];
        case isDate(value):
            return null;
        case isBoolean(value):
            return 0;
        case isNumber(value):
            return "";
        case isString(value):
            return "";
        default:
            return undefined;
    }
};

const getValue = (value, {bc, fieldSet, fieldSetObj, output}) => {
    switch (true) {
        case Boolean(output):
            return output(value);
        case !bc:
            return value;
        case bc.datatype === "repeater":
            return isObject(value) ? Object.values(value) : value;
        case fieldSet:
            return {
                column: bc.column,
                datatype: bc.datatype || "array",
                value: isObject(value) ? Object.values(value) : value,
            };
        case fieldSetObj:
            return {
                column: bc.column,
                datatype: bc.datatype,
                value: parseValue(value, bc),
            };
        default:
            return parseValue(value, bc);
    }
};

/*
 * Заоверайдил parseCheckArray,
 * оригинал:
 * https://github.com/foxhound87/mobx-react-form/blob/bd6b0dbf075672620f0580bc3fac66c8c218e717/src/parser.js#L49
 */
const parseCheckArray = (field, value, prop) => (isArray(value) ? parser.parseArrayProp(value, prop) : value);

class BuilderMobxField extends Field {
    clear = action("clear", (deep = true) => {
        this.$clearing = true;
        this.$touched = false;
        this.$changed = false;

        this.$value = defaultClearValue({value: this.$value});
        this.files = undefined;

        if (deep) {
            this.each((field) => field.clear(true, false));
        }

        this.validate({
            showErrors: this.state.options.get("showErrorsOnClear", this),
        });
    });

    $output = (value) => {
        const {options = {}} = this;

        const {bc, hidden} = options;
        const parsedValue = getValue(value, options);

        if (hidden && bc && bc.datatype !== "hidden") {
            return defaultClearValue({value: parsedValue});
        }

        return parsedValue;
    };

    /*
     * Заоверайдил get,
     * оригинал:
     * https://github.com/foxhound87/mobx-react-form/blob/v1.35.1/src/shared/Actions.js#L135
     */
    get(prop = null, strict = true) {
        if (isNil(prop)) {
            return this.deepGet(
                [...utils.props.booleans, ...utils.props.field, ...utils.props.validation],
                this.fields,
            );
        }

        utils.allowedProps("all", isArray(prop) ? prop : [prop]);

        if (isString(prop)) {
            if (strict && this.fields.size === 0) {
                return parser.parseCheckOutput(this, prop);
            }

            const value = this.deepGet(prop, this.fields);

            return parseCheckArray(this, value, prop);
        }

        return this.deepGet(prop, this.fields);
    }

    /*
     * Заоверайдил deepGet,
     * оригинал:
     * https://github.com/foxhound87/mobx-react-form/blob/v1.35.1/src/shared/Actions.js#L135
     */
    // eslint-disable-next-line max-lines-per-function
    deepGet(prop, fields) {
        return transform(
            utils.getObservableMapValues(fields),
            // eslint-disable-next-line max-statements
            (obj, field) => {
                const $nested = ($fields) => ($fields.size === 0 ? undefined : this.deepGet(prop, $fields));

                Object.assign(obj, {
                    [field.key]: {fields: $nested(field.fields)},
                });

                if (isString(prop)) {
                    const removeValue =
                        prop === "value" &&
                        ((this.state.options.get("retrieveOnlyDirtyValues", this) && field.isPristine) ||
                            (this.state.options.get("retrieveOnlyEnabledFields", this) && field.disabled) ||
                            (this.state.options.get("softDelete", this) && field.deleted));

                    if (field.fields.size === 0) {
                        delete obj[field.key]; // eslint-disable-line
                        if (removeValue) {
                            return obj;
                        }

                        return Object.assign(obj, {
                            [field.key]: parser.parseCheckOutput(field, prop),
                        });
                    }

                    let value = this.deepGet(prop, field.fields);

                    if (prop === "value") {
                        value = field.$output(value);
                    }

                    delete obj[field.key]; // eslint-disable-line
                    if (removeValue) {
                        return obj;
                    }

                    return Object.assign(obj, {
                        [field.key]: parseCheckArray(field, value, prop),
                    });
                }

                each(prop, ($prop) =>
                    Object.assign(obj[field.key], {
                        [$prop]: field[$prop],
                    }),
                );

                return obj;
            },
            {},
        );
    }
}

export default BuilderMobxField;
