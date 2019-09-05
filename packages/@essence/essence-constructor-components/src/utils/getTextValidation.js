// @flow
import {Field} from "mobx-react-form";
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

const getValueSizeRules = (datatype: string, bc: BcType): Array<string> => {
    const validations = [];

    if (!(datatype in disabledSize)) {
        ["maxvalue", "minvalue", "maxsize"].forEach((rule: string) => {
            if (bc[rule]) {
                validations.push(`${rule}:${bc[rule]}`);
            }
        });
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
        ...getValueSizeRules(datatype, bc),
        getDateRule(datatype, bc),
        ...getExtraRules(rules),
        field.get("options").imask,
    ];

    // $FlowFixMe
    return validations.filter((rule: ?string): boolean => Boolean(rule));
};
