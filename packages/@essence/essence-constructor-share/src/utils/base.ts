import {isArray} from "lodash";

export function isEmpty(value: any, allowEmptyString?: boolean) {
    return value == null || (allowEmptyString ? false : value === "") || (isArray(value) && value.length === 0);
}
