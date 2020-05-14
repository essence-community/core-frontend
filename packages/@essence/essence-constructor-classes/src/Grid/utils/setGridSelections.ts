import {ICkId} from "@essence-community/constructor-share/types";
import {VAR_RECORD_PARENT_ID, VAR_RECORD_LEAF} from "@essence-community/constructor-share/constants";
import {IGridModel} from "../stores/GridModel/GridModel.types";

export function setGridSelections(gridStore: IGridModel, isSelected: boolean, parentId: ICkId) {
    gridStore.recordsStore.records.forEach((record) => {
        const recordId = record[gridStore.recordsStore.recordId];

        if (record[VAR_RECORD_PARENT_ID] === parentId && (recordId === "string" || recordId === "number")) {
            if (record[VAR_RECORD_LEAF] === "false") {
                setGridSelections(gridStore, isSelected, recordId);
            }

            if (isSelected) {
                gridStore.recordsStore.selectedRecords.delete(recordId);
            } else {
                gridStore.recordsStore.selectedRecords.set(recordId, record);
            }
        }
    });
}
