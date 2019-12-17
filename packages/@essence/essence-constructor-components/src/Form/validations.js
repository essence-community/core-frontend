// @flow
import forOwn from "lodash/forOwn";
import toString from "lodash/toString";
import toNumber from "lodash/toNumber";
import {i18next} from "@essence/essence-constructor-share/utils";
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
    (value, req) => {
        const valueSize = Array.isArray(value) ? value.length : toString(value).length;

        return valueSize <= toNumber(req);
    },
    i18next.t("e668fef0db6d4eeb9eb72c62a8d31052"),
);

validatorjs.register(
    "minsize",
    (value, req) => {
        const valueSize = Array.isArray(value) ? value.length : toString(value).length;

        return valueSize >= toNumber(req);
    },
    i18next.t("e668fef0db6d4eeb9eb72c62a8d31052"),
);

validatorjs.register(
    "maxvalue",
    (value, req) => {
        if (req.length > MAX_NUMBER_SIZE) {
            return new BigNumber(value).lte(new BigNumber(req));
        }

        return toNumber(value) <= toNumber(req);
    },
    i18next.t("58b71773e7664e70874020a45705bc4c"),
);

validatorjs.register(
    "minvalue",
    (value, req) => {
        if (req.length > MAX_NUMBER_SIZE) {
            return new BigNumber(value).gte(new BigNumber(req));
        }

        return toNumber(value) >= toNumber(req);
    },
    i18next.t("31d96e87a5514f509c75bc701b772504"),
);

validatorjs.register(
    "minvaluedate",
    (value, req) => {
        const val1 = moment(req);
        const val2 = moment(value);

        if (val1.isValid() && val2.isValid()) {
            return val2.isSameOrAfter(val1, "days");
        }

        return true;
    },
    // TODO: Добавить текст валидации
    i18next.t("31d96e87a5514f509c75bc701b772504"),
);

validatorjs.register(
    "maxvaluedate",
    (value, req) => {
        const val1 = moment(req);
        const val2 = moment(value);

        if (val1.isValid() && val2.isValid()) {
            return val2.isSameOrBefore(val1, "days");
        }

        return true;
    },
    // TODO: Добавить текст валидации
    i18next.t("58b71773e7664e70874020a45705bc4c"),
);

validatorjs.register(
    "required-checkbox",
    (value) => value === 1 || value === "1" || value === true,
    i18next.t("58c125b1b34f445c9ae5640ff3122e03"),
);

/*
 * TODO переписал, т.к. в билиотеке ошибка v: ^3.14.2
 * pr: https://github.com/skaterdav85/validatorjs/pull/247
 */
validatorjs.register(
    "regex",
    (val?: string | number, req: string) => {
        const mod = /[g|i|m]{1,3}$/u;
        const flagMatch = req.match(mod);
        const flag = flagMatch ? flagMatch[0] : "";
        const clearReq = req.replace(mod, "").slice(1, -1);
        const reqExp = new RegExp(clearReq, flag);

        return Boolean(reqExp.test(toString(val)));
    },
    i18next.t("f488a90cb69e4567a092325fecffb1ed"),
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
    i18next.t("4f5060a1dc7c4f5ca76a606b4977f868"),
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
    i18next.t("93e0035fa0684768839021399baed028"),
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
    i18next.t("a5a5d7213d1f4f77861ed40549ee9c57"),
);
