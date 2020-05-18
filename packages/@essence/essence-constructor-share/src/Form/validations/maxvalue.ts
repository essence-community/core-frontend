import {BigNumber} from "bignumber.js";
import {IField, IForm} from "../types";
import {MAX_NUMBER_SIZE} from "../../constants";
import {TFunction} from "../../utils";

function maxvalueMessage(trans: TFunction) {
    return trans("static:58b71773e7664e70874020a45705bc4c");
}

function hasError(value: string | number, reqValue: string) {
    if (reqValue.length > MAX_NUMBER_SIZE) {
        return new BigNumber(value).lte(new BigNumber(reqValue));
    }

    if (typeof value === "string") {
        return parseFloat(value) <= parseFloat(reqValue);
    }

    return value <= parseFloat(reqValue);
}

export function maxvalue(field: IField, form: IForm, req = "") {
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
