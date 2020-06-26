import {IRecord, FieldValue} from "@essence-community/constructor-share/types";

export function getRestoreValue(value: FieldValue | IRecord, fieldName: string) {
    if (Array.isArray(value)) {
        return value.map((val) => (typeof val === "object" && value !== null ? val[fieldName] : val));
    }

    if (typeof value === "object" && value !== null) {
        return (value as IRecord)[fieldName];
    }

    return value;
}
