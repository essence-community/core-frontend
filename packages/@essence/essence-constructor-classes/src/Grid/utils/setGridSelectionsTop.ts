import {ICkId} from "@essence-community/constructor-share/types";
import {isEmpty} from "@essence-community/constructor-share/utils/base";
import {IGridModel} from "../stores/GridModel/GridModel.types";

interface ISetGridSelectionsTopProps {
    gridStore: IGridModel;
    isSelected: boolean;
    ckChild: ICkId;
    maxSize?: number;
}

export function setGridSelectionsTop({gridStore, isSelected, ckChild, maxSize}: ISetGridSelectionsTopProps) {
    if (isEmpty(ckChild)) {
        return;
    }
    gridStore.recordsStore.records.forEach((record) => {
        const recordParentId = record[gridStore.recordsStore.recordParentId] as string | number;

        if (record[gridStore.recordsStore.recordId] === ckChild) {
            if (isSelected) {
                gridStore.recordsStore.setSelectionsAction([record], gridStore.recordsStore.recordId, "delete");
            } else if (!maxSize || maxSize > gridStore.recordsStore.selectedRecords.size) {
                gridStore.recordsStore.setSelectionsAction([record], gridStore.recordsStore.recordId, "append");
            }

            setGridSelectionsTop({
                ckChild: recordParentId,
                gridStore,
                isSelected:
                    isSelected &&
                    !gridStore.recordsStore.records
                        .filter((rec) => rec[gridStore.recordsStore.recordParentId] === recordParentId)
                        .some((rec) =>
                            gridStore.recordsStore.selectedRecords.has(
                                rec[gridStore.recordsStore.recordId] as string | number,
                            ),
                        ),
                maxSize,
            });
        }
    });
}
