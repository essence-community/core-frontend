import {mapValueToArray, isEmpty} from "@essence-community/constructor-share/utils";
import {IRecord} from "@essence-community/constructor-share/types";
import {IGridModel} from "../stores/GridModel/GridModel.types";

export function gridSetGlobalValues(gridStore: IGridModel) {
    const {
        pageStore: {globalValues},
        recordsStore: {recordId},
    } = gridStore;
    const {setglobal = [], selmode} = gridStore.bc;
    const selectedRecord = gridStore.selectedRecord || {};
    const selectedRecords = mapValueToArray(gridStore.recordsStore.selectedRecords);
    const {valueFields} = gridStore;
    const values: IRecord = {};

    setglobal.forEach(({in: keyIn, out}) => {
        if (selmode === "MULTI") {
            values[out] = selectedRecords.map((value) => {
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
            values[out] = selectedRecord[keyIn || recordId];

            if (isEmpty(values[out])) {
                values[out] = globalValues.has(out) ? null : undefined;
            }
        }
    });

    return gridStore.pageStore.updateGlobalValues(values);
}
