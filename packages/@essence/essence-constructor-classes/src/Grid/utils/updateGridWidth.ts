import {VAR_RECORD_PAGE_OBJECT_ID} from "@essence-community/constructor-share/constants";
import {IGridModel} from "../stores/GridModel/GridModel.types";
import {TABLE_CELL_MIN_WIDTH} from "../constants";
import {getGridWidth} from "./getGridWidth";

export function updateGridWidth(gridStore: IGridModel) {
    const tableContentNode: HTMLElement | undefined = gridStore.refs.get("table-content");
    const tableHeaderNodeInstance: HTMLElement | undefined = gridStore.refs.get("table-header");
    const tableHeaderNode: HTMLTableElement | undefined =
        tableHeaderNodeInstance instanceof HTMLTableElement ? tableHeaderNodeInstance : undefined;
    let staticCols = 0;

    const calcGridWidth = gridStore.gridColumns.reduce<number>((sum, column, index) => {
        let columnWidth = gridStore.columnsWidth.get(column[VAR_RECORD_PAGE_OBJECT_ID]);

        if (typeof columnWidth === "string" && columnWidth.indexOf("px") === -1) {
            const cellEl = tableHeaderNode?.querySelector("tr")?.children?.[index];

            if (cellEl instanceof HTMLElement) {
                columnWidth = cellEl.offsetWidth;
            } else {
                columnWidth = TABLE_CELL_MIN_WIDTH;
            }

            if (columnWidth < TABLE_CELL_MIN_WIDTH) {
                columnWidth = TABLE_CELL_MIN_WIDTH;
            }
        } else if (typeof columnWidth === "string" && columnWidth.indexOf("px") > -1) {
            columnWidth = parseInt(columnWidth, 10);
            staticCols += 1;
        } else if (typeof columnWidth === "number") {
            staticCols += 1;
        }

        return sum + ((columnWidth as number) || TABLE_CELL_MIN_WIDTH);
    }, 0);
    const isAllSet = staticCols === gridStore.gridColumns.length;

    const gridWidth = getGridWidth(calcGridWidth, isAllSet, tableContentNode);

    [tableContentNode, tableHeaderNode].forEach((element) => {
        if (element) {
            element.style.width = gridWidth;
        }
    });
}
