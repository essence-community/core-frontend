// @flow
import forOwn from "lodash/forOwn";
import toString from "lodash/toString";
import toNumber from "lodash/toNumber";
import moment from "moment";
import {BigNumber} from "bignumber.js";
import validatorjs from "validatorjs";
import {dateMap} from "../TextField/Fields/FieldDateRC/fieldDateHelpers";

validatorjs.useLang("ru");

const MAX_NUMBER_SIZE = 9;

forOwn(dateMap, (dateConfig) => {
    validatorjs.register(
        `date-${dateConfig.dateType}`,
        (value) => {
            if (value && value !== "defaultvaluequery") {
                return moment(value).isValid();
            }

            return true;
        },
        dateConfig.invalidTextValidation,
    );
});

validatorjs.register(
    "maxsize",
    (value, req) => toString(value).length <= toNumber(req),
    "Максимальная длина этого поля :maxsize",
);

validatorjs.register(
    "maxvalue",
    (value, req) => {
        if (req.length > MAX_NUMBER_SIZE) {
            return new BigNumber(value).lte(new BigNumber(req));
        }

        return toNumber(value) <= toNumber(req);
    },
    "Значение этого поля не может быть больше :maxvalue",
);

validatorjs.register(
    "minvalue",
    (value, req) => {
        if (req.length > MAX_NUMBER_SIZE) {
            return new BigNumber(value).gte(new BigNumber(req));
        }

        return toNumber(value) >= toNumber(req);
    },
    "Значение этого поля не может быть меньше :minvalue",
);

validatorjs.register(
    "required-checkbox",
    (value) => value === 1 || value === "1" || value === true,
    "Обязателен для заполнения",
);

/*
 * TODO переписал, т.к. в билиотеке ошибка v: ^3.14.2
 * pr: https://github.com/skaterdav85/validatorjs/pull/247
 */
validatorjs.register(
    "regex",
    (val?: string | number, req: string) => {
        const mod = /[g|i|m]{1,3}$/;
        const flagMatch = req.match(mod);
        const flag = flagMatch ? flagMatch[0] : "";
        const clearReq = req.replace(mod, "").slice(1, -1);
        const reqExp = new RegExp(clearReq, flag);

        return Boolean(reqExp.test(toString(val)));
    },
    "Неверный формат поля :attribute.",
);

validatorjs.register(
    "after_not_required",
    function(val: string, req: string) {
        const val1 = moment(this.validator.input[req]);
        const val2 = moment(val);

        if (val1.isValid() && val2.isValid()) {
            return val2.isSameOrAfter(val1, "days");
        }

        return true;
    },
    // eslint-disable-next-line quotes
    'Дата "по" не может быть меньше даты "с"',
);

validatorjs.register(
    "before_not_required",
    function(val: string, req: string) {
        const val1 = moment(this.validator.input[req]);
        const val2 = moment(val);

        if (val1.isValid() && val2.isValid()) {
            return val2.isSameOrBefore(val1, "days");
        }

        return true;
    },
    // eslint-disable-next-line quotes
    'Дата "с" не может быть больше даты "по"',
);

validatorjs.register(
    "reqcount",
    function(numberFields: number = 0) {
        const [reqcount, columnsCount] = this.getParameters();

        if (numberFields === 0) {
            return true;
        }

        if (numberFields < 0) {
            return false;
        }

        return parseInt(reqcount, 10) <= columnsCount - numberFields;
    },
    "Поля должны быть заполнены в требуемом количестве",
);
