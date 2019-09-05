// @flow
import forOwn from "lodash/forOwn";
import {GRID_ROW_HEIGHT} from "../constants";
import {type GridModelType} from "../stores/GridModel";
import {isEmpty, valuesMap} from "./base";
import {findSetKey} from "./findKey";

function getGridCkId(getglobal: ?string, params: Object): string {
    if (getglobal) {
        const keys = findSetKey(getglobal, "ckId");
        const values = {};

        forOwn(keys, (fieldName, globalKey) => {
            values[fieldName] = params[globalKey];
        });

        return values.ckId;
    }

    return "";
}

export const getGridHeight = ({height}: {height?: string}) => {
    if (height) {
        return parseInt(height, 10);
    }

    return undefined;
};

const calculateTreeRecords = (store: GridModelType, record: Object, nesting: number = 1) =>
    store.expansionRecords.get(record.ckId) && store.recordsTree[record.ckId]
        ? store.recordsTree[record.ckId].reduce(
              (acc, rec) => [...acc, ...calculateTreeRecords(store, rec, nesting + 1)],
              [{...record, nesting}],
          )
        : [{...record, nesting}];

export const getTreeRecords = (store: GridModelType) =>
    store.recordsTree.null
        ? store.recordsTree.null.reduce((acc, rec) => [...acc, ...calculateTreeRecords(store, rec)], [])
        : [];

const getAllVisibleGridRecords = (store: GridModelType) =>
    store.bc.type === "GRID" ? store.recordsStore.records : getTreeRecords(store);

export const gridScrollToRecordAction = async (params: Object, gridStore: GridModelType) => {
    const ckId = getGridCkId(gridStore.bc.getglobal, params);

    if (!isEmpty(ckId)) {
        await gridStore.recordsStore.setSelectionAction(ckId);
        await gridStore.expandSelectedAction();

        const allVisibleRecords = getAllVisibleGridRecords(gridStore);
        const recordIndex = allVisibleRecords.findIndex((rec) => rec.ckId === ckId);

        if (recordIndex !== -1) {
            const tableContent = gridStore.refs.get("table-content");

            if (tableContent instanceof HTMLDivElement) {
                tableContent.parentNode.scrollTop =
                    recordIndex * GRID_ROW_HEIGHT + (gridStore.rootNode ? GRID_ROW_HEIGHT : 0);
            }
        }
    }
};

export const gridSetGlobalValues = (gridStore: GridModelType) => {
    const {
        pageStore: {globalValues},
    } = gridStore;
    const {setglobal = "", selmode} = gridStore.bc;
    const selectedRecord = gridStore.selectedRecord || {};
    const selectedRecords = gridStore.selectedRecords ? valuesMap(gridStore.selectedRecords) : [];
    const {valueFields} = gridStore;
    const values = {};
    const keys = findSetKey(setglobal, "ckId");

    forOwn(keys, (fieldName, globaleKey) => {
        if (selmode === "MULTI" || selmode === "SIMPLE") {
            values[globaleKey] = selectedRecords.map((value) => {
                if (valueFields.length === 1) {
                    return value[valueFields[0][1]];
                }
                const obj = {};

                valueFields.forEach(([valueFieldName, valueField]) => {
                    obj[valueFieldName] = value[valueField];
                });

                return obj;
            });
        } else {
            values[globaleKey] = selectedRecord[fieldName];

            if (isEmpty(values[globaleKey])) {
                values[globaleKey] = globalValues.has(globaleKey) ? null : undefined;
            }
        }
    });

    return gridStore.pageStore.updateGlobalValues(values);
};
