import {FieldValue, IBuilderConfig} from "../../types";
import {parseMemoize} from "../../utils";

export function isHidden(bc: IBuilderConfig, getValue: (key: string) => FieldValue): boolean {
    let res = bc.hidden;

    if (bc.hiddenrules) {
        res = Boolean(parseMemoize(bc.hiddenrules).runer({get: getValue}));
    }

    return res;
}