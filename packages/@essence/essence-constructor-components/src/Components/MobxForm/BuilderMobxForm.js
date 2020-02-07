import {Form} from "mobx-react-form";
import {isNil, isArray, isString, transform, each} from "lodash";
import utils from "mobx-react-form/src/utils";
import parser from "mobx-react-form/src/parser";
import BuilderField from "./BuilderMobxField";

/*
 * Заоверайдил parseCheckArray,
 * оригинал:
 * https://github.com/foxhound87/mobx-react-form/blob/bd6b0dbf075672620f0580bc3fac66c8c218e717/src/parser.js#L49
 */
const parseCheckArray = (field, value, prop) => (isArray(value) ? parser.parseArrayProp(value, prop) : value);

class BuilderMobxForm extends Form {
    makeField(props) {
        return new BuilderField(props);
    }

    /*
     * Заоверайдил get,
     * оригинал https://github.com/foxhound87/mobx-react-form/blob/v1.35.1/src/shared/Actions.js#L135
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

export default BuilderMobxForm;
