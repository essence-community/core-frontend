import {IRecord, ICkId} from "@essence-community/constructor-share/types";
import {IGridModel} from "../stores/GridModel/GridModel.types";

export function calculateTreeRecords(store: IGridModel, record: IRecord, nesting = 1): IRecord[] {
    return store.recordsStore.expansionRecords.get(record[store.recordsStore.recordId] as ICkId) &&
        store.recordsStore.recordsTree[record[store.recordsStore.recordId] as ICkId]
        ? store.recordsStore.recordsTree[record[store.recordsStore.recordId] as ICkId].reduce(
              (acc, rec) => [...acc, ...calculateTreeRecords(store, rec, nesting + 1)],
              [{...record, nesting}],
          )
        : [{...record, nesting}];
}
