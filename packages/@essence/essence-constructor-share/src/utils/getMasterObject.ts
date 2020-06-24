import {IPageModel} from "../types/PageModel";
import {VAR_RECORD_ID} from "../constants/variables";
import {FieldValue, IBuilderConfig} from "../types";

const getValue = (value: FieldValue) => (typeof value === "string" && value.indexOf("auto-") === 0 ? undefined : value);

export function getMasterObject(
    idMaster?: string,
    pageStore?: IPageModel | null,
    getMasterValue?: IBuilderConfig["getmastervalue"],
) {
    if (!pageStore || !idMaster || !getMasterValue) {
        return undefined;
    }
    const result: Record<string, FieldValue> = {};
    const {globalValues} = pageStore;
    const masterStore = pageStore.stores.get(idMaster);
    const idProperty = masterStore?.recordId || VAR_RECORD_ID;
    const masterFieldValue = pageStore.fieldValueMaster.get(idMaster);
    const record: Record<string, FieldValue> = {
        ...(masterStore?.selectedRecord || {}),
        ...(typeof masterFieldValue === "undefined" ? {} : {[idProperty]: masterFieldValue}),
    };

    getMasterValue.forEach(({in: keyIn, out}) => {
        const name = out || keyIn;

        if (Object.prototype.hasOwnProperty.call(record, keyIn)) {
            result[name] = getValue(record[keyIn]);
        } else if (globalValues.has(keyIn)) {
            result[name] = getValue(globalValues.get(keyIn));
        } else if (typeof masterFieldValue !== "undefined") {
            result[name] = getValue(masterFieldValue);
        }
    });

    return result;
}
