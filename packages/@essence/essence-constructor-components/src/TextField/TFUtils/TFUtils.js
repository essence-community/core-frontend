// @flow
import {isEmpty} from "../../utils/base";
import {type RecordsModelType} from "../../stores/RecordsModel";

export const getFirstValues = (recordsStore: RecordsModelType) => {
    const {records, valueField} = recordsStore;

    const value = records[0] && records[0][valueField];

    return isEmpty(value) ? "" : value;
};
