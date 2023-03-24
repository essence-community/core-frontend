import {ICkId} from "@essence-community/constructor-share/types";
import {IPercentColumnsType, IGridModel} from "../GridModel.types";

const MAX_PERCENT_COLUMN_WIDTH = 100;

export function updatePercentColumnsWidth(gridStore: IGridModel, ckId: ICkId) {
    const percentColumns: IPercentColumnsType[] = [];

    gridStore.columnsWidth.forEach((colWidth, colId) => {
        if (colId !== ckId && typeof colWidth === "string" && colWidth.indexOf("%") > -1) {
            percentColumns.push({
                id: colId,
                width: parseInt(colWidth, 10),
            });
        }
    });

    if (percentColumns.length > 0) {
        const sumWidth = percentColumns.reduce((sum, col) => sum + col.width, 0);
        let newSum = 0;

        percentColumns.forEach((col) => {
            let newWidth = col.width + (MAX_PERCENT_COLUMN_WIDTH - sumWidth) / percentColumns.length;

            if (newWidth < 0) {
                newWidth = 0;
            }
            gridStore.columnsWidth.set(col.id, `${newWidth}%`);
            newSum += newWidth;
        });

        if (newSum > MAX_PERCENT_COLUMN_WIDTH) {
            updatePercentColumnsWidth(gridStore, ckId);
        }
    }
}
