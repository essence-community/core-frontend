import {ICkId} from "@essence-community/constructor-share/types";
import {IGridModel} from "../stores/GridModel/GridModel.types";

interface ISetGridSelectionsTopProps {
    gridStore: IGridModel;
    isSelected: boolean;
    ckChild: ICkId;
    maxSize?: number;
}

export function setGridSelectionsTop({gridStore, isSelected, ckChild, maxSize}: ISetGridSelectionsTopProps) {
    gridStore.recordsStore.records.forEach((record) => {
        const recordId = record[gridStore.recordsStore.recordParentId] as string | number;

        if (record[gridStore.recordsStore.recordId] === ckChild) {
            setGridSelectionsTop({ckChild: recordId, gridStore, isSelected, maxSize});

            if (isSelected) {
                gridStore.recordsStore.selectedRecords.delete(recordId);
            } else if (!maxSize || maxSize > gridStore.recordsStore.selectedRecords.size) {
                gridStore.recordsStore.selectedRecords.set(recordId, record);
            }
        }
    });
}
