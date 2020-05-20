import {FieldValue} from "@essence-community/constructor-share/types";

export function toString(value: FieldValue) {
    if (typeof value === "string") {
        return value;
    }

    if (typeof value === "number") {
        return String(value);
    }

    return "";
}
