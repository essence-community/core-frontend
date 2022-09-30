import {IRecord, ICkId, FieldValue} from "@essence-community/constructor-share/types";
import {deepFind} from "@essence-community/constructor-share/utils";
import {IFieldTableModel} from "../stores/FieldTableModel/FieldTableModel.types";

export function getRestoredRecords(value: (FieldValue | IRecord)[], store: IFieldTableModel): [ICkId, IRecord][] {
    return value.reduce<[ICkId, IRecord][]>((acc, val) => {
        const isObject = typeof val === "object" && val !== null;
        const record = store.recordsStore.records.find((rec) => {
            if (isObject) {
                return store.valueFields.some(
                    ([fieldName, valueField]) =>
                        deepFind(rec, fieldName)[1] === deepFind(val as IRecord, valueField)[1],
                );
            }

            return deepFind(rec, store.valueField)[1] === val;
        });

        if (record) {
            acc.push([record[store.recordsStore.recordId] as ICkId, record]);
        } else {
            acc.push([val as ICkId, {}]);
        }

        return acc;
    }, []);
}
