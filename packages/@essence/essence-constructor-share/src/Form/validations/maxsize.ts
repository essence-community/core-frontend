import {IField, IForm} from "../types";
import {TFunction} from "../../utils";

function getValueSize(value: string | number | object): number {
    if (typeof value === "object") {
        return Array.isArray(value) ? value.length : Object.keys(value).length;
    }

    if (typeof value === "string") {
        return value.length;
    }

    return String(value).length;
}

export function maxsize(field: IField, form: IForm, req = "") {
    const {value} = field;

    if (value === undefined || value === null || typeof value === "boolean") {
        return undefined;
    }

    const valueSize = getValueSize(value);

    if (valueSize <= parseInt(req, 10)) {
        return undefined;
    }

    return function (trans: TFunction) {
        return trans("static:e668fef0db6d4eeb9eb72c62a8d31052").replace(":maxsize", req);
    };
}
