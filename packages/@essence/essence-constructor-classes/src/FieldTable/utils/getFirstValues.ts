import {IRecordsModel} from "@essence-community/constructor-share/types";
import {isEmpty} from "@essence-community/constructor-share/utils";

export function getFirstValues(recordsStore: IRecordsModel) {
    const {records, valueField} = recordsStore;

    const value = records[0] && records[0][valueField];

    return isEmpty(value) ? "" : value;
}
