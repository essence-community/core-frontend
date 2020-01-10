import {get} from "lodash";
import {IPageModel} from "../types/PageModel";
import {VAR_RECORD_ID} from "../constants/variables";
import {FieldValue} from "../types/Field";
import {findSetKey} from "./findKey";

export function getMasterObject(
    master?: string,
    pageStore?: IPageModel | null,
    getMasterValue: string = VAR_RECORD_ID,
) {
    if (!pageStore || !master) {
        return undefined;
    }
    const result: Record<string, FieldValue> = {};
    const keys = findSetKey(getMasterValue);
    const {globalValues} = pageStore;
    const record: Record<string, FieldValue> = get(pageStore.stores.get(master), "selectedRecord") || {};
    const idProperty = VAR_RECORD_ID;

    if (pageStore.fieldValueMaster.has(master)) {
        record[idProperty] = pageStore.fieldValueMaster.get(master);
    }
    Object.keys(keys).forEach((globaleKey: string) => {
        const fieldName = keys[globaleKey];

        if (record && record[globaleKey]) {
            const value = record[globaleKey];

            result[fieldName] = typeof value === "string" && value.indexOf("auto-") === 0 ? undefined : value;
        } else if (globalValues && globalValues.has(globaleKey)) {
            const value = globalValues.get(globaleKey);

            result[fieldName] = typeof value === "string" && value.indexOf("auto-") === 0 ? undefined : value;
        }
    });

    return result;
}
