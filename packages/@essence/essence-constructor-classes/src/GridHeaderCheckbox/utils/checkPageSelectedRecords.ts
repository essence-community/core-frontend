import {VAR_RECORD_LEAF} from "@essence-community/constructor-share/constants";
import {IStoreBaseModel} from "@essence-community/constructor-share/types";

export function checkPageSelectedRecords(store: IStoreBaseModel): boolean {
    const {recordsStore} = store;

    if (!recordsStore) {
        return false;
    }

    if (store.bc.type === "TREEGRID") {
        return recordsStore.records.every((record) => {
            if (record[VAR_RECORD_LEAF] === "false") {
                return true;
            }

            const recordId = record[recordsStore.recordId];

            if (typeof recordId === "string" || typeof recordId === "number") {
                return Boolean(recordsStore.selectedRecords.get(recordId));
            }

            return false;
        });
    }

    return recordsStore.records.every((record) => {
        const recordId = record[recordsStore.recordId];

        if (typeof recordId === "string" || typeof recordId === "number") {
            return Boolean(recordsStore.selectedRecords.get(recordId));
        }

        return false;
    });
}
