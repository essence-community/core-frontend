import {TFunction} from "../../utils";
import {IField, IForm} from "../types";

export function regex(field: IField, form: IForm, req = "") {
    const mod = /[g|i|m]{1,3}$/u;
    const {value} = field;
    const flagMatch = req.match(mod);
    const flag = flagMatch ? flagMatch[0] : "";
    const clearReq = req.replace(mod, "").slice(1, -1);
    const reqExp = new RegExp(clearReq, flag);

    if (value === undefined || value === null || typeof value === "object" || typeof value === "boolean") {
        return undefined;
    }

    if (reqExp.test(String(value))) {
        return undefined;
    }

    return function regexMessage(trans: TFunction) {
        return trans("static:f488a90cb69e4567a092325fecffb1ed").replace(":attribute", req);
    };
}
