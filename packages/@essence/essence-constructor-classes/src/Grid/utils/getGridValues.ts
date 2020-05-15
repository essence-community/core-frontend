import {IWindowModel, IBuilderMode, IPageModel, IRecord} from "@essence-community/constructor-share/types";
import {VAR_RECORD_PAGE_OBJECT_ID, VAR_RECORD_PARENT_ID} from "@essence-community/constructor-share/constants";
import {IGridModel} from "../stores/GridModel/GridModel.types";

type GetGridValuesType = {
    gridStore: IGridModel;
    windowStore?: IWindowModel;
    pageStore: IPageModel;
    mode: IBuilderMode;
    values: IRecord;
};

function getFirstSubGridValues(pageStore: IPageModel, windowStore: IWindowModel, gridValues: IRecord): IRecord[] {
    for (const child of windowStore.childs) {
        if (child.type === "GRID" || child.type === "TREEGRID") {
            const store = pageStore.stores.get(child[VAR_RECORD_PAGE_OBJECT_ID]);
            const recordsStore = store?.recordsStore;

            if (!store || !recordsStore) {
                return [];
            }

            const values: IRecord[] = [];
            const {valuefield} = store.bc;

            // eslint-disable-next-line guard-for-in
            for (const key in recordsStore.selectedRecords.keys()) {
                const value = recordsStore.selectedRecords.get(key);

                if (value && store.bc.column && valuefield) {
                    const checkedRecord =
                        recordsStore.records.find((record) => record[recordsStore.recordId] === key) || value;

                    values.push({
                        ...gridValues,
                        [store.bc.column]: checkedRecord[valuefield],
                        ...(child.type === "TREEGRID"
                            ? {[VAR_RECORD_PARENT_ID]: checkedRecord[VAR_RECORD_PARENT_ID]}
                            : {}),
                    });
                }
            }

            return values;
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
}: GetGridValuesType): IRecord[] | IRecord {
    const isArrayValue = windowStore?.windowBc?.collectionvalues === "array";
    const selectedRecord = gridStore.recordsStore.selectedRecord || {};
    let gridValues = values;

    if (gridStore.bc.type === "TREEGRID" && mode === "1") {
        const value = selectedRecord[gridStore.recordsStore.recordId];

        gridValues = {
            [VAR_RECORD_PARENT_ID]: typeof value === "string" && value.indexOf("auto-") === 0 ? null : value,
            ...gridValues,
        };
    }

    if (isArrayValue) {
        return windowStore?.name === "window" ? getFirstSubGridValues(pageStore, windowStore, gridValues) : [];
    }

    return gridValues;
}
