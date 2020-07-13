import {VAR_RECORD_LEAF} from "@essence-community/constructor-share/constants";
import {IStoreBaseModel, IBuilderConfig} from "@essence-community/constructor-share/types";
import {getRecordsEnabled} from "./getRecordsEnabled";

export function checkPageSelectedRecords(store: IStoreBaseModel, bc: IBuilderConfig): boolean {
    const {recordsStore} = store;

    if (!recordsStore) {
        return false;
    }

    const records = getRecordsEnabled(bc, recordsStore, store.pageStore);

    if (store.bc.type === "TREEGRID") {
        return records.every((record) => {
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

    return records.every((record) => {
        const recordId = record[recordsStore.recordId];

        if (typeof recordId === "string" || typeof recordId === "number") {
            return Boolean(recordsStore.selectedRecords.get(recordId));
        }

        return false;
    });
}
