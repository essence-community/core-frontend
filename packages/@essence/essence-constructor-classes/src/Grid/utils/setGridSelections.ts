import {ICkId} from "@essence-community/constructor-share/types";
import {VAR_RECORD_LEAF} from "@essence-community/constructor-share/constants";
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

        if (record[gridStore.recordsStore.recordParentId] === parentId) {
            if (isSelected) {
                gridStore.recordsStore.setSelectionsAction([record], gridStore.recordsStore.recordId, "delete");
            } else if (!maxSize || maxSize > gridStore.recordsStore.selectedRecords.size) {
                gridStore.recordsStore.setSelectionsAction([record], gridStore.recordsStore.recordId, "append");
            }
            if (
                typeof record[VAR_RECORD_LEAF] === "boolean"
                    ? !record[VAR_RECORD_LEAF]
                    : record[VAR_RECORD_LEAF] === "false"
            ) {
                setGridSelections({
                    gridStore,
                    isSelected,
                    maxSize,
                    parentId: recordId,
                });
            }
        }
    });
}
