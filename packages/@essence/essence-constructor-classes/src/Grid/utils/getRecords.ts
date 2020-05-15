import {IRecord} from "@essence-community/constructor-share/types";
import {IGridModel} from "../stores/GridModel/GridModel.types";
import {GRID_ROW_HEIGHT} from "../constants";

export const getRecords = (store: IGridModel, records: IRecord[]) => {
    const maxHeight = GRID_ROW_HEIGHT * records.length;
    let startRecord = Math.floor(store.scrollTop / GRID_ROW_HEIGHT);
    const endRecord = Math.min(Math.ceil((store.scrollTop + store.gridHeight) / GRID_ROW_HEIGHT) + 2, records.length);

    if (maxHeight <= store.gridHeight * 2) {
        return {
            heightBottom: 0,
            heightTop: 0,
            records,
        };
    }

    if (startRecord % 2 === 1) {
        startRecord = Math.max(startRecord - 2, 0);
    } else {
        startRecord = Math.max(startRecord - 3, 0);
    }

    return {
        heightBottom: (records.length - endRecord) * GRID_ROW_HEIGHT,
        heightTop: startRecord * GRID_ROW_HEIGHT,
        records: records.slice(startRecord, endRecord),
    };
};
