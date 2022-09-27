import {IRecordsModel} from "@essence-community/constructor-share/types";
import {deepFind, isEmpty} from "@essence-community/constructor-share/utils";

export function getFirstValues(recordsStore: IRecordsModel) {
    const {records, valueField} = recordsStore;

    const value = records[0] && deepFind(records[0], valueField)[1];

    return isEmpty(value) ? "" : value;
}
