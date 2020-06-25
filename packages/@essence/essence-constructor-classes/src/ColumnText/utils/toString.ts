import {FieldValue} from "@essence-community/constructor-share/types";

export function toString(value: FieldValue): string | undefined {
    switch (true) {
        case typeof value === "string":
            return String(value);
        case typeof value === "number":
            return String(value);
        case typeof value === "boolean":
            return value ? "true" : "false";
        case typeof value === "object" && value !== null:
            return JSON.stringify(value);
        default:
            undefined;
    }
}
