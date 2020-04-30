import {IRecordsModel, ICkId, IRecord} from "@essence-community/constructor-share/types";
import {VAR_RECORD_ID, VAR_RECORD_LEAF} from "@essence-community/constructor-share/constants";

// eslint-disable-next-line max-params
export function isMinusChecked(
    recordsStore: IRecordsModel,
    parentId: string | number,
    parentRecord: IRecord,
    recordId: string = VAR_RECORD_ID,
): boolean {
    const records = recordsStore.recordsTree[parentId];

    if (!records) {
        return Boolean(recordsStore.selectedRecords.get(parentRecord[recordId] as ICkId));
    }

    return records.some((record: IRecord) => {
        if (record[VAR_RECORD_LEAF] === "true") {
            return Boolean(recordsStore.selectedRecords.get(record[recordId] as ICkId));
        }

        return isMinusChecked(recordsStore, record[recordId] as ICkId, record);
    });
}
