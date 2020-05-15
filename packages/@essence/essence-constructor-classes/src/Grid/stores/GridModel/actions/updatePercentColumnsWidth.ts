import {ICkId} from "@essence-community/constructor-share/types";
import {PercentColumnsType, IGridModel} from "../GridModel.types";

const MAX_PERCENT_COLUMN_WIDTH = 100;

export function updatePercentColumnsWidth(gridStore: IGridModel, ckId: ICkId) {
    const percentColumns: PercentColumnsType[] = [];

    gridStore.columnsWidth.forEach((colWidth, colId) => {
        if (colId !== ckId && typeof colWidth === "string") {
            percentColumns.push({
                id: colId,
                width: parseInt(colWidth, 10),
            });
        }
    });

    if (percentColumns.length > 0) {
        const sumWidth = percentColumns.reduce((sum, col) => sum + col.width, 0);

        if (sumWidth < MAX_PERCENT_COLUMN_WIDTH) {
            percentColumns.forEach((col) => {
                const newWidth = col.width + (MAX_PERCENT_COLUMN_WIDTH - sumWidth) / percentColumns.length;

                gridStore.columnsWidth.set(col.id, `${newWidth}%`);
            });
        }
    }
}
