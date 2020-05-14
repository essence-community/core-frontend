import {IGridModel} from "../stores/GridModel/GridModel.types";
import {getTreeRecords} from "./getTreeRecords";

export function getAllVisibleGridRecords(store: IGridModel) {
    return store.bc.type === "GRID" ? store.recordsStore.records : getTreeRecords(store);
}
