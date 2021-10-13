import {IGridModel, IPercentColumnsType} from "../GridModel.types";

const MAX_PERCENT_COLUMN_WIDTH = 100;

export function setWidthForZeroWidthCol(gridStore: IGridModel, zerowWidthColArr: string[]) {
    const percentColumns: IPercentColumnsType[] = [];

    gridStore.columnsWidth.forEach((colWidth, colId) => {
        if (typeof colWidth === "string") {
            percentColumns.push({
                id: colId,
                width: parseInt(colWidth, 10),
            });
        }
    });

    if (percentColumns.length > 0) {
        const sumWidth = percentColumns.reduce((sum, col) => sum + col.width, 0);

        if (sumWidth < MAX_PERCENT_COLUMN_WIDTH) {
            const width = (MAX_PERCENT_COLUMN_WIDTH - sumWidth) / zerowWidthColArr.length;

            zerowWidthColArr.forEach((id) => gridStore.columnsWidth.set(id, `${width}%`));
        }
    }
}
