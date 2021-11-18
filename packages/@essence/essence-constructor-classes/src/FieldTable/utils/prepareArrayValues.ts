import {IRecord, ICkId, FieldValue} from "@essence-community/constructor-share/types";
import {VAR_RECORD_ID} from "@essence-community/constructor-share/constants";
// eslint-disable-next-line import/named
import {IObservableArray, ObservableMap} from "mobx";
import {deepFind} from "@essence-community/constructor-share/utils";
import {IFieldTableModel} from "../stores/FieldTableModel/FieldTableModel.types";

function getValuesFromFields(valueFields: Array<[string, string]>, record: IRecord) {
    const values: IRecord = {};

    valueFields.forEach(([fieldName, valueFeild]) => {
        values[fieldName] = deepFind(record, valueFeild)[1];
    });

    return values;
}

export function prepareArrayValues(
    tableStore: IFieldTableModel,
    selectedRecords: IObservableArray | IRecord[] | ObservableMap<ICkId, IRecord>,
    recordId: string = VAR_RECORD_ID,
) {
    const records: FieldValue[] = [];
    const {valueFields, valueField} = tableStore;
    const isValuesFiledsMore = valueFields && valueFields.length > 1;
    const isValuesFiledsOne = valueFields && valueFields.length > 0;

    selectedRecords.forEach((record: IRecord) => {
        switch (true) {
            case isValuesFiledsMore:
                records.push(getValuesFromFields(valueFields || [], record));
                break;
            case isValuesFiledsOne:
                records.push(deepFind(record, valueField)[1]);
                break;
            default:
                records.push(record[recordId]);
                break;
        }
    });

    return records;
}
