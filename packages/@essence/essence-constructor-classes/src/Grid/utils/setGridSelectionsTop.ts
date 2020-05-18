import {ICkId} from "@essence-community/constructor-share/types";
import {VAR_RECORD_PARENT_ID} from "@essence-community/constructor-share/constants";
import {IGridModel} from "../stores/GridModel/GridModel.types";

export function setGridSelectionsTop(gridStore: IGridModel, isSelected: boolean, ckChild: ICkId) {
    gridStore.recordsStore.records.forEach((record) => {
        const recordId = record[VAR_RECORD_PARENT_ID] as string | number;

        if (record[gridStore.recordsStore.recordId] === ckChild) {
            setGridSelectionsTop(gridStore, isSelected, recordId);

            if (isSelected) {
                gridStore.recordsStore.selectedRecords.delete(recordId);
            } else {
                gridStore.recordsStore.selectedRecords.set(recordId, record);
            }
        }
    });
}
