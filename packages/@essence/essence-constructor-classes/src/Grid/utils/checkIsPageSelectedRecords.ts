import {IBuilderConfig, IRecord, IRecordsModel, ICkId} from "@essence-community/constructor-share/types";
import {VAR_RECORD_LEAF} from "@essence-community/constructor-share/constants";

export function checkIsPageSelectedRecords(
    bc: IBuilderConfig,
    records: IRecord[],
    recordsStore: IRecordsModel,
): boolean {
    if (bc.type === "TREEGRID") {
        return records.every(
            (record) =>
                (typeof record[VAR_RECORD_LEAF] === "boolean"
                    ? !record[VAR_RECORD_LEAF]
                    : record[VAR_RECORD_LEAF] === "false") ||
                Boolean(recordsStore.selectedRecords.get(record[recordsStore.recordId] as ICkId)),
        );
    }

    return records.every((record) => Boolean(recordsStore.selectedRecords.get(record[recordsStore.recordId] as ICkId)));
}
