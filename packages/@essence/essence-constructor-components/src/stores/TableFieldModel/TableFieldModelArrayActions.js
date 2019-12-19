// @flow
import {VAR_RECORD_ID} from "@essence/essence-constructor-share/constants";
import {type CkIdType} from "../../BuilderType";
import {type TableFieldModelType} from "./TableFieldModelType";

function getValuesFromFields(valueFields: Array<[string, string]>, record: Object) {
    const values = {};

    valueFields.forEach(([fieldName, valueFeild]) => {
        values[fieldName] = record[valueFeild];
    });

    return values;
}

export function prepareArrayValues(
    tableStore: TableFieldModelType,
    selectedRecords: Map<CkIdType, Object> | Array<Object>,
) {
    const records = [];
    const {valueFields, valueField} = tableStore;
    const isValuesFiledsMore = valueFields && valueFields.length > 1;
    const isValuesFiledsOne = valueFields && valueFields.length > 0;

    for (const record of selectedRecords.values()) {
        switch (true) {
            case isValuesFiledsMore:
                records.push(getValuesFromFields(valueFields || [], record));
                break;
            case isValuesFiledsOne:
                records.push(record[valueField]);
                break;
            default:
                records.push(record[VAR_RECORD_ID]);
                break;
        }
    }

    return records;
}
