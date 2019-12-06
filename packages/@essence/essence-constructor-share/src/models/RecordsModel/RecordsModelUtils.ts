import {ObservableMap} from "mobx";
import {IPageModel, FieldValue} from "../../types";
import {findSetKey} from "../../utils";

export const getMasterData = (
    masterObject?: Record<string, FieldValue>,
    idproperty?: string,
    globalValues?: ObservableMap<string, FieldValue>,
) => {
    const master: Record<string, FieldValue> = {};

    if (!idproperty) {
        return master;
    }

    const idPropertyValues = findSetKey(idproperty || "");

    Object.keys(idPropertyValues).forEach((globaleKey: string) => {
        const fieldName = idPropertyValues[globaleKey];

        if (masterObject && masterObject[globaleKey]) {
            const value = masterObject[globaleKey];

            master[fieldName] = typeof value === "string" && value.indexOf("auto-") === 0 ? undefined : value;
        } else if (globalValues && globalValues.has(globaleKey)) {
            const value = globalValues.get(globaleKey);

            master[fieldName] = typeof value === "string" && value.indexOf("auto-") === 0 ? undefined : value;
        }
    });

    return master;
};

export function getMasterObject(ckMaster?: string, pageStore?: IPageModel): undefined | Record<string, FieldValue> {
    if (!ckMaster || !pageStore) {
        return undefined;
    }

    const masterObject = pageStore.stores.get(ckMaster);
    const selectedRecord = masterObject ? masterObject.selectedRecord : {};

    return {
        ...selectedRecord,
        ...(pageStore.fieldValueMaster.has(ckMaster) ? {ckId: pageStore.fieldValueMaster.get(ckMaster)} : {}),
    };
}
