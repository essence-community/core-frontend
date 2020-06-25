import {IBuilderMode, IRecord} from "@essence-community/constructor-share/types";
import {VAR_RECORD_PARENT_ID} from "@essence-community/constructor-share/constants";
import {IGridModel} from "../stores/GridModel/GridModel.types";

type GetGridValuesType = {
    gridStore: IGridModel;
    mode: IBuilderMode;
    values: IRecord;
};

/**
 * Получение данных для грида
 *
 * @param {GetGridValuesType} config Параметры для получения данных
 *
 * @returns {Array<Object> | Object} Данные
 */
export function getGridValues({gridStore, mode, values}: GetGridValuesType): IRecord[] | IRecord {
    const selectedRecord = gridStore.recordsStore.selectedRecord || {};
    let gridValues = values;

    if (gridStore.bc.type === "TREEGRID" && mode === "1") {
        const value = selectedRecord[gridStore.recordsStore.recordId];

        gridValues = {
            [VAR_RECORD_PARENT_ID]: typeof value === "string" && value.indexOf("auto-") === 0 ? null : value,
            ...gridValues,
        };
    }

    return gridValues;
}
