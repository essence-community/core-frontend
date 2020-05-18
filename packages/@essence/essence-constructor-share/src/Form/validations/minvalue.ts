import {BigNumber} from "bignumber.js";
import {IField, IForm} from "../types";
import {MAX_NUMBER_SIZE} from "../../constants";
import {TFunction} from "../../utils";

function maxvalueMessage(trans: TFunction) {
    return trans("static:31d96e87a5514f509c75bc701b772504");
}

function hasError(value: string | number, reqValue: string) {
    if (reqValue.length > MAX_NUMBER_SIZE) {
        return new BigNumber(value).gte(new BigNumber(reqValue));
    }

    if (typeof value === "string") {
        return parseFloat(value) >= parseFloat(reqValue);
    }

    return value >= parseFloat(reqValue);
}

export function minvalue(field: IField, form: IForm, req = "") {
    const reqValue = req.replace(",", ".");
    const {value} = field;

    if (value === undefined || value === null || typeof value === "object" || typeof value === "boolean") {
        return undefined;
    }

    if (hasError(value, reqValue)) {
        return maxvalueMessage;
    }

    return undefined;
}
