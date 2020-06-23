import {IRecord, ICkId, FieldValue} from "@essence-community/constructor-share/types";
import {IFieldTableModel} from "../stores/FieldTableModel/FieldTableModel.types";

export function getRestoredRecords(value: (FieldValue | IRecord)[], store: IFieldTableModel): [ICkId, IRecord][] {
    return value.reduce<[ICkId, IRecord][]>((acc, val) => {
        const isObject = typeof val === "object" && val !== null;
        const record = store.recordsStore.records.find((rec) => {
            if (isObject) {
                return store.valueFields.some(
                    ([fieldName, valueField]) => rec[fieldName] === (val as IRecord)[valueField],
                );
            }

            return rec[store.valueField] === val;
        });

        if (record) {
            acc.push([record[store.recordsStore.recordId] as ICkId, record]);
        } else {
            acc.push([val as ICkId, {}]);
        }

        return acc;
    }, []);
}
