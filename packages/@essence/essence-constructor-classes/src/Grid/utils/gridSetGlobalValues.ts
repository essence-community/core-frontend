import {mapValueToArray, isEmpty} from "@essence-community/constructor-share/utils";
import {IRecord} from "@essence-community/constructor-share/types";
import {IGridModel} from "../stores/GridModel/GridModel.types";

export function gridSetGlobalValues(gridStore: IGridModel) {
    const {
        pageStore: {globalValues},
        recordsStore: {recordId},
    } = gridStore;
    const {setglobal = [], selmode, collectionvalues} = gridStore.bc;
    const selectedRecord = gridStore.selectedRecord || {};
    const selectedRecords = mapValueToArray(gridStore.recordsStore.selectedRecords);
    const {valueFields} = gridStore;
    const values: IRecord = {};

    setglobal.forEach(({in: keyIn, out}) => {
        if (selmode === "MULTI" || collectionvalues === "array") {
            values[out] = selectedRecords.map((value) => {
                const obj: IRecord = {};

                if (isEmpty(keyIn)) {
                    if (valueFields.length === 1) {
                        return value[valueFields[0][1]];
                    }

                    valueFields.forEach(([valueFieldName, valueField]) => {
                        obj[valueFieldName] = value[valueField];
                    });
                } else {
                    obj[keyIn] = value[keyIn];
                }

                return obj;
            });
        } else {
            values[out] = selectedRecord[keyIn || recordId];

            if (isEmpty(values[out])) {
                values[out] = globalValues.has(out) ? null : undefined;
            }
        }
    });

    return gridStore.pageStore.updateGlobalValues(values);
}
