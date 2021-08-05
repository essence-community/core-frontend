import {IBuilderMode, IRecord} from "@essence-community/constructor-share/types";
import {IGridModel} from "../stores/GridModel/GridModel.types";

// eslint-disable-next-line @typescript-eslint/naming-convention
interface GetGridValuesType {
    gridStore: IGridModel;
    mode: IBuilderMode;
    values: IRecord;
}

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
            [gridStore.recordsStore.recordParentId]:
                typeof value === "string" && value.indexOf("auto-") === 0 ? null : value,
            ...gridValues,
        };
    }

    return gridValues;
}
