import {mapValueToArray, isEmpty, deepFind} from "@essence-community/constructor-share/utils";
import {IRecord} from "@essence-community/constructor-share/types";
import {VAR_RECORD_JN_TOTAL_CNT} from "@essence-community/constructor-share/constants/variables";
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
                        return deepFind(value, valueFields[0][1])[1];
                    }

                    valueFields.forEach(([valueFieldName, valueField]) => {
                        obj[valueFieldName] = deepFind(value, valueField)[1];
                    });
                } else if (keyIn === VAR_RECORD_JN_TOTAL_CNT) {
                    obj[keyIn] = gridStore.recordsStore.recordsCount;
                } else {
                    const [isExist, res] = deepFind(value, keyIn);

                    obj[keyIn] = isExist ? res : value[keyIn];
                }

                return obj;
            });
        } else {
            const [isExist, res] = deepFind(selectedRecord, keyIn);

            if (keyIn === VAR_RECORD_JN_TOTAL_CNT) {
                values[out] = gridStore.recordsStore.recordsCount;
            } else {
                values[out] = isExist ? res : selectedRecord[keyIn || recordId];
            }
            if (isEmpty(values[out])) {
                values[out] = globalValues.has(out) ? null : undefined;
            }
        }
    });

    return gridStore.pageStore.updateGlobalValues(values);
}
