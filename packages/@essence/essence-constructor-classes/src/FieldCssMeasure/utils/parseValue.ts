import {FieldValue} from "@essence-community/constructor-share/types";
import {EMPTY_STATE, PARSE_VALUE} from "../constants";

export function parseValue(value: FieldValue) {
    if (typeof value === "string") {
        const groups = value.match(PARSE_VALUE)?.groups;

        if (groups) {
            return {
                measure: groups.measure as "px" | "%",
                value: groups.value ?? "",
            };
        }
    }

    return EMPTY_STATE;
}
