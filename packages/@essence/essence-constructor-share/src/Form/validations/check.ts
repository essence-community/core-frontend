import {isEmpty} from "../../utils/base";
import {parseMemoize} from "../../utils/parser";
import {IField, TError} from "../types";

export function check(field: IField): TError | undefined {
    const msg = parseMemoize(field.bc.check).runer({get: field.getParseValue});

    if (typeof msg === "string" && !isEmpty(msg)) {
        return (trans) => trans(msg);
    }

    return undefined;
}
