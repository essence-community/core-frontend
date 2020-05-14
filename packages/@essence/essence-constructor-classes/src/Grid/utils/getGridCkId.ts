import {IRecord, ICkId} from "@essence-community/constructor-share/types";
import {VAR_RECORD_ID} from "@essence-community/constructor-share/constants";
import {findSetKey} from "@essence-community/constructor-share/utils";

export function getGridCkId(params: IRecord, getglobal?: string, recordId: string = VAR_RECORD_ID): ICkId {
    if (getglobal) {
        const keys = findSetKey(getglobal, recordId);
        const values: IRecord = {};

        for (const globalKey in keys) {
            if (Object.prototype.hasOwnProperty.call(keys, globalKey)) {
                const fieldName = keys[globalKey];

                values[fieldName] = params[globalKey];
            }
        }

        return values[recordId] as ICkId;
    }

    return "";
}
