import {ICkId} from "@essence-community/constructor-share/types";
import {VAR_RECORD_PARENT_ID, VAR_RECORD_LEAF} from "@essence-community/constructor-share/constants";
import {IGridModel} from "../stores/GridModel/GridModel.types";

export function setGridSelections(gridStore: IGridModel, isSelected: boolean, parentId: ICkId | null) {
    gridStore.recordsStore.records.forEach((record) => {
        const recordId = record[gridStore.recordsStore.recordId] as string | number;

        if (record[VAR_RECORD_PARENT_ID] === parentId) {
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
