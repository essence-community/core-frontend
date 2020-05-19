import {ICkId} from "@essence-community/constructor-share/types";
import {VAR_RECORD_PARENT_ID, VAR_RECORD_LEAF} from "@essence-community/constructor-share/constants";
import {IGridModel} from "../stores/GridModel/GridModel.types";

interface ISetGridSelectionsProps {
    gridStore: IGridModel;
    isSelected: boolean;
    parentId: ICkId | null;
    maxSize?: number;
}

export function setGridSelections({gridStore, isSelected, parentId, maxSize}: ISetGridSelectionsProps) {
    gridStore.recordsStore.records.forEach((record) => {
        const recordId = record[gridStore.recordsStore.recordId] as string | number;

        if (record[VAR_RECORD_PARENT_ID] === parentId) {
            if (record[VAR_RECORD_LEAF] === "false") {
                setGridSelections({
                    gridStore,
                    isSelected,
                    maxSize,
                    parentId: recordId,
                });
            }

            if (isSelected) {
                gridStore.recordsStore.selectedRecords.delete(recordId);
            } else if (!maxSize || maxSize > gridStore.recordsStore.selectedRecords.size) {
                gridStore.recordsStore.selectedRecords.set(recordId, record);
            }
        }
    });
}
