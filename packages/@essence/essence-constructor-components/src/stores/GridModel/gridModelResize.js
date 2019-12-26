// @flow
/* eslint-disable react/no-find-dom-node */
import * as React from "react";
import ReactDOM from "react-dom";
import get from "lodash/get";
import {VAR_RECORD_PAGE_OBJECT_ID} from "@essence/essence-constructor-share/constants";
import {type CkIdType} from "../../BuilderType";
import {TABLE_CELL_MIN_WIDTH, styleTheme, loggerRoot, BUTTON_HEIGHT, GRID_ROW_HEIGHT} from "../../constants";
import {type GridModelType, type PercentColumnsType} from "./GridModelType";

const ADDITIONAL_GRID_HEIGHT = 19;
const logger = loggerRoot.extend("gridModelResize");

const getGridWidth = ({calcGridWidth, tableContentNode, isAllSet}) => {
    const offsetWidth = get(tableContentNode, "parentElement.offsetWidth");

    return (!offsetWidth || calcGridWidth < offsetWidth) && !isAllSet ? "100%" : `${calcGridWidth}px`;
};
const getCloseMarginTop = (filterContent: HTMLDivElement): number =>
    // $FlowFixMe
    filterContent.previousSibling ? 0 : -BUTTON_HEIGHT;

const MAX_PERCENT_COLUMN_WIDTH = 100;

export const updateTopGrid = (refs: Map<CkIdType, HTMLDivElement | React.ElementRef<*>>, open: boolean): number => {
    try {
        // $FlowFixMe
        const gridContent: ?HTMLDivElement = ReactDOM.findDOMNode(refs.get("grid-content"));
        const filterContent: ?HTMLDivElement = refs.get("filter-content");

        if (filterContent && gridContent) {
            const marginTop = open
                ? filterContent.offsetHeight -
                  // $FlowFixMe
                  filterContent.parentElement.offsetHeight +
                  // $FlowFixMe
                  (filterContent.previousSibling && filterContent.previousSibling.offsetHeight)
                : getCloseMarginTop(filterContent);

            gridContent.style.marginTop = `${marginTop}px`;

            return marginTop;
        }
    } catch (err) {
        logger(err);
    }

    return 0;
};

export const updateMarginTopGrid = (gridStore: GridModelType, marginTop: number): void => {
    const tableInlintButton: ?HTMLDivElement = gridStore.refs.get("grid-inline-button");

    if (tableInlintButton && tableInlintButton.previousSibling instanceof HTMLDivElement) {
        const buttonsContainer: HTMLDivElement = tableInlintButton.previousSibling;
        const paginationHeight = gridStore.bc.pagesize ? GRID_ROW_HEIGHT : 0;
        const minHeightGrid =
            buttonsContainer.offsetHeight - marginTop - GRID_ROW_HEIGHT - ADDITIONAL_GRID_HEIGHT - paginationHeight;

        if (gridStore.minHeight !== minHeightGrid) {
            gridStore.setMinHeightAction(minHeightGrid);
        }

        if (gridStore.gridHeight < minHeightGrid) {
            gridStore.setHeightAction(minHeightGrid);
        }
    }
};

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

    if (styleTheme === "dark") {
        updateMarginTopGrid(gridStore, updateTopGrid(gridStore.refs, gridStore.isFilterOpen));
    }

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
