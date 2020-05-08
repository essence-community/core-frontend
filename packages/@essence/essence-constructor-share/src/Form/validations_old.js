/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
/* eslint-disable import/no-extraneous-dependencies */
// @flow
import forOwn from "lodash/forOwn";
import toString from "lodash/toString";
import toNumber from "lodash/toNumber";
import {i18next, BigNumberBase as BigNumber} from "@essence-community/constructor-share/utils";
import moment from "moment";
import validatorjs from "validatorjs";
import {dateMap} from "../TextField/Fields/FieldDateRC/fieldDateHelpers";

validatorjs.useLang("ru");

const MAX_NUMBER_SIZE = 9;

// TODO: verify it and migrate to custom language
i18next.on("loaded", (loaded) => {
    const {language} = i18next;

    if (loaded[language]) {
        validatorjs.useLang(language);
        validatorjs.setMessages(language, {
            ...validatorjs.getMessages("ru"),
            // eslint-disable-next-line camelcase
            after_not_required: i18next.t("static:4f5060a1dc7c4f5ca76a606b4977f868"),
            // eslint-disable-next-line camelcase
            before_not_required: i18next.t("static:93e0035fa0684768839021399baed028"),
            "date-1": i18next.t("static:3c205218305a4a25bada37004775789c"),
            "date-2": i18next.t("static:6b6305d16db148d986e782a66c4318da"),
            "date-3": i18next.t("static:77050515e7b2462e95429b9df33a7958"),
            "date-4": i18next.t("static:1583ea7e4b054c759818771219303c3c"),
            "date-5": i18next.t("static:a1fadf8d7e73453b8a1ed526f3d1103e"),
            "date-6": i18next.t("static:5f09f8f54f174ecfb6befd64ca4c3423"),
            "date-default": i18next.t("static:77050515e7b2462e95429b9df33a7958"),
            maxsize: i18next.t("static:e668fef0db6d4eeb9eb72c62a8d31052"),
            maxvalue: i18next.t("static:58b71773e7664e70874020a45705bc4c"),
            maxvaluedate: i18next.t("static:58b71773e7664e70874020a45705bc4c"),
            minsize: i18next.t("static:a240c31303c74c5490623d7781964c11"),
            minvalue: i18next.t("static:31d96e87a5514f509c75bc701b772504"),
            minvaluedate: i18next.t("static:31d96e87a5514f509c75bc701b772504"),
            regex: i18next.t("static:f488a90cb69e4567a092325fecffb1ed"),
            reqcount: i18next.t("static:a5a5d7213d1f4f77861ed40549ee9c57"),
            "required-checkbox": i18next.t("static:58c125b1b34f445c9ae5640ff3122e03"),
        });
    }
});

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
    i18next.t("static:e668fef0db6d4eeb9eb72c62a8d31052"),
);

validatorjs.register(
    "minsize",
    (value, req) => {
        const valueSize = Array.isArray(value) ? value.length : toString(value).length;

        return valueSize >= toNumber(req);
    },
    i18next.t("static:a240c31303c74c5490623d7781964c11"),
);

validatorjs.register(
    "maxvalue",
    (value, req) => {
        const reqValue = req.replace(",", ".");

        if (reqValue.length > MAX_NUMBER_SIZE) {
            return new BigNumber(value).lte(new BigNumber(reqValue));
        }

        return toNumber(value) <= toNumber(reqValue);
    },
    i18next.t("static:58b71773e7664e70874020a45705bc4c"),
);

validatorjs.register(
    "minvalue",
    (value, req) => {
        const reqValue = req.replace(",", ".");

        if (reqValue.length > MAX_NUMBER_SIZE) {
            return new BigNumber(value).gte(new BigNumber(reqValue));
        }

        return toNumber(value) >= toNumber(reqValue);
    },
    i18next.t("static:31d96e87a5514f509c75bc701b772504"),
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
    i18next.t("static:31d96e87a5514f509c75bc701b772504"),
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
    i18next.t("static:58b71773e7664e70874020a45705bc4c"),
);

validatorjs.register(
    "required-checkbox",
    (value) => value === 1 || value === "1" || value === true,
    i18next.t("static:58c125b1b34f445c9ae5640ff3122e03"),
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
    i18next.t("static:f488a90cb69e4567a092325fecffb1ed"),
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
    i18next.t("static:4f5060a1dc7c4f5ca76a606b4977f868"),
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
    i18next.t("static:93e0035fa0684768839021399baed028"),
);

validatorjs.register(
    "reqcount",
    function(numberFields = 0) {
        const [reqcount, columnsCount] = this.getParameters();

        if (numberFields === 0) {
            return true;
        }

        if (numberFields < 0) {
            return false;
        }

        return parseInt(reqcount, 10) <= columnsCount - numberFields;
    },
    i18next.t("static:a5a5d7213d1f4f77861ed40549ee9c57"),
);
