// @flow
import get from "lodash/get";
import isString from "lodash/isString";
import {
    VAR_RECORD_ID,
    VAR_RECORD_PARENT_ID,
    VAR_RECORD_PAGE_OBJECT_ID,
} from "@essence-community/constructor-share/constants";
import {type PageModelType} from "../PageModel";
import {type WindowModelType} from "../WindowModel/WindowModelTypes";
import {type BuilderModeType} from "../../BuilderType";
import {type GridModelType} from "./GridModelType";

type GetGridValuesType = {
    gridStore: GridModelType,
    windowStore: Object,
    pageStore: PageModelType,
    mode: BuilderModeType,
    values: Object,
};

function getFirstSubGridValues(
    pageStore: PageModelType,
    windowStore: WindowModelType,
    gridValues: Object,
): Array<Object> {
    for (const child of windowStore.childs) {
        if (child.type === "GRID" || child.type === "TREEGRID") {
            const store = pageStore.stores.get(child[VAR_RECORD_PAGE_OBJECT_ID]);

            if (store && store.name === "grid") {
                const gridStore: GridModelType = store;
                const values: Array<Object> = [];
                const {valuefield} = gridStore.bc;

                gridStore.selectedRecords.forEach((value, key) => {
                    if (value) {
                        const checkedRecord =
                            gridStore.recordsStore.records.find((record) => record[VAR_RECORD_ID] === key) || value;

                        values.push({
                            ...gridValues,
                            [gridStore.bc.column]: checkedRecord[valuefield],
                            ...(child.type === "TREEGRID"
                                ? {[VAR_RECORD_PARENT_ID]: checkedRecord[VAR_RECORD_PARENT_ID]}
                                : {}),
                        });
                    }
                });

                return values;
            }
        }
    }

    return [];
}

/**
 * Получение данных с формы модального окна
 *
 * @param {GetGridValuesType} config Параметры для получения данных
 *
 * @returns {Array<Object> | Object} Данные
 */
export function getGridValues({
    gridStore,
    windowStore,
    pageStore,
    mode,
    values,
}: GetGridValuesType): Array<Object> | Object {
    const isArrayValue = get(windowStore, "windowBc.collectionvalues") === "array";
    const selectedRecord = gridStore.recordsStore.selectedRecord || {};
    let gridValues = values;

    if (gridStore.bc.type === "TREEGRID" && mode === "1") {
        gridValues = {
            [VAR_RECORD_PARENT_ID]:
                isString(selectedRecord[VAR_RECORD_ID]) && selectedRecord[VAR_RECORD_ID].indexOf("auto-") === 0
                    ? null
                    : selectedRecord[VAR_RECORD_ID],
            ...gridValues,
        };
    }

    if (isArrayValue) {
        return windowStore.name === "window" ? getFirstSubGridValues(pageStore, windowStore, gridValues) : [];
    }

    return gridValues;
}
