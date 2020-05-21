import {IPageModel} from "../types/PageModel";
import {VAR_RECORD_ID} from "../constants/variables";
import {FieldValue} from "../types";
import {findSetKey} from "./findKey";

const getValue = (value: FieldValue) => (typeof value === "string" && value.indexOf("auto-") === 0 ? undefined : value);

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
    const masterStore = pageStore.stores.get(idMaster);
    const idProperty = masterStore?.recordId || VAR_RECORD_ID;
    const masterFieldValue = pageStore.fieldValueMaster.get(idMaster);
    const record: Record<string, FieldValue> = {
        ...(masterStore?.selectedRecord || {}),
        ...(typeof masterFieldValue === "undefined" ? {} : {[idProperty]: masterFieldValue}),
    };

    Object.keys(keys).forEach((globaleKey: string) => {
        const fieldName = keys[globaleKey];

        if (Object.prototype.hasOwnProperty.call(record, globaleKey)) {
            result[fieldName] = getValue(record[globaleKey]);
        } else if (globalValues.has(globaleKey)) {
            result[fieldName] = getValue(globalValues.get(globaleKey));
        } else if (typeof masterFieldValue !== "undefined") {
            result[fieldName] = getValue(masterFieldValue);
        }
    });

    return result;
}
