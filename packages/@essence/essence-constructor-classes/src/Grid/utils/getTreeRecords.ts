import {IGridModel} from "../stores/GridModel/GridModel.types";
import {calculateTreeRecords} from "./calculateTreeRecords";

export function getTreeRecords(store: IGridModel) {
    return store.recordsStore.recordsTree.null
        ? store.recordsStore.recordsTree.null.reduce((acc, rec) => [...acc, ...calculateTreeRecords(store, rec)], [])
        : [];
}
