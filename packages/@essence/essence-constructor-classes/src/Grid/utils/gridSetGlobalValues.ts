import {mapValueToArray, findSetKey, isEmpty} from "@essence-community/constructor-share/utils";
import {IRecord} from "@essence-community/constructor-share/types";
import {IGridModel} from "../stores/GridModel/GridModel.types";

export function gridSetGlobalValues(gridStore: IGridModel) {
    const {
        pageStore: {globalValues},
    } = gridStore;
    const {setglobal = "", selmode} = gridStore.bc;
    const selectedRecord = gridStore.selectedRecord || {};
    const selectedRecords = mapValueToArray(gridStore.recordsStore.selectedRecords);
    const {valueFields} = gridStore;
    const values: IRecord = {};
    const keys = findSetKey(setglobal, gridStore.recordsStore.recordId);

    for (const globaleKey in keys) {
        if (Object.prototype.hasOwnProperty.call(keys, globaleKey)) {
            const fieldName = keys[globaleKey];

            if (selmode === "MULTI" || selmode === "SIMPLE") {
                values[globaleKey] = selectedRecords.map((value) => {
                    if (valueFields.length === 1) {
                        return value[valueFields[0][1]];
                    }
                    const obj: IRecord = {};

                    valueFields.forEach(([valueFieldName, valueField]) => {
                        obj[valueFieldName] = value[valueField];
                    });

                    return obj;
                });
            } else {
                values[globaleKey] = selectedRecord[fieldName];

                if (isEmpty(values[globaleKey])) {
                    values[globaleKey] = globalValues.has(globaleKey) ? null : undefined;
                }
            }
        }
    }

    return gridStore.pageStore.updateGlobalValues(values);
}
