import {isArray} from "lodash";

export function isEmpty(value: any, allowEmptyString?: boolean) {
    // eslint-disable-next-line no-eq-null
    return value == null || (allowEmptyString ? false : value === "") || (isArray(value) && value.length === 0);
}
