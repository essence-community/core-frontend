// @flow
import camelCase from "lodash/camelCase";
import get from "lodash/get";
import isString from "lodash/isString";
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
            const store = pageStore.stores.get(child.ckPageObject);

            if (store && store.name === "grid") {
                const gridStore: GridModelType = store;
                const values: Array<Object> = [];
                const valuefield = camelCase(gridStore.bc.valuefield);

                gridStore.selectedRecords.forEach((value, key) => {
                    if (value) {
                        const checkedRecord = gridStore.recordsStore.records.find(({ckId}) => ckId === key) || value;

                        values.push({
                            ...gridValues,
                            [gridStore.bc.column]: checkedRecord[valuefield],
                            ...(child.type === "TREEGRID" ? {ckParent: checkedRecord.ckParent} : {}),
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
            ckParent:
                isString(selectedRecord.ckId) && selectedRecord.ckId.indexOf("auto-") === 0
                    ? null
                    : selectedRecord.ckId,
            ...gridValues,
        };
    }

    if (isArrayValue) {
        return windowStore.name === "window" ? getFirstSubGridValues(pageStore, windowStore, gridValues) : [];
    }

    return gridValues;
}
