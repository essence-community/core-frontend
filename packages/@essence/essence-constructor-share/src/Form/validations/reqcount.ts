import {IField, IForm} from "../types";
import {TFunction} from "../../utils";

function reqcountMessage(trans: TFunction) {
    return trans("static:a5a5d7213d1f4f77861ed40549ee9c57");
}

export function reqcount(field: IField, form: IForm, req = "") {
    const {value} = field;
    const [reqcountval, columnsCount] = req.split(".");

    if (value === undefined || value === null || typeof value === "object" || typeof value === "boolean") {
        return undefined;
    }

    if (value === 0) {
        return undefined;
    }

    if (value < 0) {
        return reqcountMessage;
    }

    const numberValue = typeof value === "string" ? parseInt(value, 10) : value;

    if (parseInt(reqcountval, 10) <= parseInt(columnsCount, 10) - numberValue) {
        return undefined;
    }

    return reqcountMessage;
}
