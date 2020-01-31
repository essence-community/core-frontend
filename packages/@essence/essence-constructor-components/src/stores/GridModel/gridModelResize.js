// @flow
/* eslint-disable react/no-find-dom-node */
import ReactDOM from "react-dom";
import get from "lodash/get";
import {VAR_RECORD_PAGE_OBJECT_ID} from "@essence-community/constructor-share/constants";
import {type CkIdType} from "../../BuilderType";
import {TABLE_CELL_MIN_WIDTH} from "../../constants";
import {type GridModelType, type PercentColumnsType} from "./GridModelType";

const getGridWidth = ({calcGridWidth, tableContentNode, isAllSet}) => {
    const offsetWidth = get(tableContentNode, "parentElement.offsetWidth");

    return (!offsetWidth || calcGridWidth < offsetWidth) && !isAllSet ? "100%" : `${calcGridWidth}px`;
};

const MAX_PERCENT_COLUMN_WIDTH = 100;

export const updateGridWidth = (gridStore: GridModelType) => {
    const tableContentNode: ?HTMLTableElement = gridStore.refs.get("table-content");
    const tableHeaderNodeInstance = ReactDOM.findDOMNode(gridStore.refs.get("table-header"));
    const tableHeaderNode: ?HTMLTableElement =
        tableHeaderNodeInstance instanceof HTMLTableElement ? tableHeaderNodeInstance : null;
    let staticCols = 0;

    const calcGridWidth = gridStore.gridColumns.reduce((sum, column, index) => {
        let columnWidth = gridStore.columnsWidth.get(column[VAR_RECORD_PAGE_OBJECT_ID]);

        if (typeof columnWidth === "string") {
            columnWidth = tableHeaderNode
                ? get(tableHeaderNode.querySelector("tr"), `children.${index}.offsetWidth`)
                : TABLE_CELL_MIN_WIDTH;

            if (columnWidth < TABLE_CELL_MIN_WIDTH) {
                columnWidth = TABLE_CELL_MIN_WIDTH;
            }
        } else if (typeof columnWidth === "number") {
            staticCols += 1;
        }

        return sum + (columnWidth || TABLE_CELL_MIN_WIDTH);
    }, 0);
    const isAllSet = staticCols === gridStore.gridColumns.length;

    const gridWidth = getGridWidth({calcGridWidth, isAllSet, tableContentNode});

    [tableContentNode, tableHeaderNode].forEach((element) => {
        if (element) {
            element.style.width = gridWidth;
        }
    });
};

export const updatePercentColumnsWidth = (gridStore: GridModelType, ckId: CkIdType) => {
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
};

export const setWidthForZeroWidthCol = (gridStore: GridModelType, zerowWidthColArr: string[]) => {
    const percentColumns: PercentColumnsType[] = [];

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
};
