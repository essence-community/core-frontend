import {IPageModel} from "../types/PageModel";
import {VAR_RECORD_ID} from "../constants/variables";
import {FieldValue} from "../types/Field";
import {findSetKey} from "./findKey";

export function getMasterObject(
    idMaster?: string,
    pageStore?: IPageModel | null,
    getMasterValue: string = VAR_RECORD_ID,
) {
    if (!pageStore || !idMaster) {
        return undefined;
    }
    const result: Record<string, FieldValue> = {};
    const keys = findSetKey(getMasterValue);
    const {globalValues} = pageStore;
    const idProperty = VAR_RECORD_ID;
    const record: Record<string, FieldValue> = {
        ...(pageStore.stores.get(idMaster)?.selectedRecord || {}),
        ...(pageStore.fieldValueMaster.has(idMaster) ? {[idProperty]: pageStore.fieldValueMaster.get(idMaster)} : {}),
    };

    Object.keys(keys).forEach((globaleKey: string) => {
        const fieldName = keys[globaleKey];

        if (record[globaleKey]) {
            const value = record[globaleKey];

            result[fieldName] = typeof value === "string" && value.indexOf("auto-") === 0 ? undefined : value;
        } else if (globalValues.has(globaleKey)) {
            const value = globalValues.get(globaleKey);

            result[fieldName] = typeof value === "string" && value.indexOf("auto-") === 0 ? undefined : value;
        }
    });

    return result;
}
