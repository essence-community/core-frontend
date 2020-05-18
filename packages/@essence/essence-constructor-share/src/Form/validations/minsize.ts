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

export function minsize(field: IField, form: IForm, req = "") {
    const {value} = field;

    if (value === undefined || value === null || typeof value === "boolean") {
        return undefined;
    }

    const valueSize = getValueSize(value);

    if (valueSize >= parseInt(req, 10)) {
        return undefined;
    }

    return function maxsizeMessage(trans: TFunction) {
        return trans("static:a240c31303c74c5490623d7781964c11").replace(":maxsize", req);
    };
}
