// @flow
import {Field} from "mobx-react-form";
import {camelCaseMemoized} from "@essence/essence-constructor-share/utils";
import {parse} from "@essence/essence-constructor-share/utils/parser";
import {type PageModel} from "../stores/PageModel";
import {disabledSize} from "../TextField/TFUtils/TFConstants";
import {getFieldDate} from "../TextField/Fields/FieldDateRC/fieldDateHelpers";

type BcType = {
    required?: "true" | "false",
    regexp?: string,
    datatype?: string,
    format?: string,
    rules?: string,
    imask?: string,
};

type GetTextValidationOptionsType = {
    isRequired: boolean,
    pageStore: PageModel,
};

const getRequiredRule = (required?: "true" | "false", datatype: string, isRequired: boolean): ?string => {
    if (isRequired || required === "true") {
        return datatype === "checkbox" || datatype === "boolean" ? "required-checkbox" : "required";
    }

    return null;
};

const getRegexRule = (regexp?: string, imask?: string, field: Field): ?string => {
    if (regexp) {
        return `regex:/^${regexp}$/`;
    } else if (imask && imask.indexOf("!") === 1) {
        return field.get("rules").find((rule) => rule.indexOf("regex"));
    }

    return null;
};

const getValueSizeRules = (datatype: string, bc: BcType, pageStore: PageModel): Array<string> => {
    const validations = [];

    if (!(datatype in disabledSize)) {
        if (bc.datatype === "date") {
            ["maxvalue", "minvalue"].forEach((rule: string) => {
                if (bc[rule]) {
                    const value = parse(bc[rule]).runer(pageStore.globalValues);

                    if (value) {
                        validations.push(`${bc.datatype === "date" ? `${rule}date` : rule}:${value}`);
                    }
                }
            });
        } else {
            ["maxvalue", "minvalue", "maxsize", "minsize"].forEach((rule: string) => {
                const ruleValue =
                    bc[rule] && /[g_]/u.test(bc[rule])
                        ? pageStore.globalValues.get(camelCaseMemoized(bc[rule]))
                        : bc[rule];

                if (ruleValue) {
                    validations.push(`${rule}:${ruleValue}`);
                }
            });
        }
    }

    return validations;
};

const getDateRule = (datatype: string, bc: BcType) => {
    if (datatype === "date") {
        const dateConfig = getFieldDate(bc.format);

        return `date-${dateConfig.dateType}`;
    }

    return null;
};

const getExtraRules = (rules?: string) => {
    if (rules) {
        return rules.split("|");
    }

    return [];
};

export const getTextValidation = (bc: BcType, field: Field, options: GetTextValidationOptionsType): Array<string> => {
    const {required, regexp, datatype = "", rules, imask} = bc;
    const validations: Array<?string> = [
        getRequiredRule(required, datatype, options.isRequired),
        getRegexRule(regexp, imask, field),
        ...getValueSizeRules(datatype, bc, options.pageStore),
        getDateRule(datatype, bc),
        ...getExtraRules(rules),
        field.get("options").imask,
    ];

    // $FlowFixMe
    return validations.filter((rule: ?string): boolean => Boolean(rule));
};
