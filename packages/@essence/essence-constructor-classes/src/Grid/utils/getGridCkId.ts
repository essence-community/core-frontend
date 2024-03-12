import {IRecord, ICkId} from "@essence-community/constructor-share/types";
import {parseMemoize} from "@essence-community/constructor-share/utils";

export function getGridCkId(params: IRecord, getglobal?: string): ICkId {
    if (getglobal) {
        return parseMemoize(getglobal).runer({get: (key: string) => params[key]}) as string;
    }

    return "";
}
