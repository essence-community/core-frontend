// @flow
/* eslint-disable no-redeclare */
import isArray from "lodash/isArray";
import toString from "lodash/toString";

declare function isEmpty(value: void | null | "" | {} | [] | number | boolean): true;
declare function isEmpty(value: any): boolean;
declare function isEqual(value: any, other: any): boolean;

export function isEmpty(value, allowEmptyString) {
    // eslint-disable-next-line no-eq-null
    return value == null || (allowEmptyString ? false : value === "") || (isArray(value) && value.length === 0);
}

export function isEqualStr(value: any, other: any) {
    return toString(value) === toString(other);
}

export function valuesMap(map: any) {
    const arr = [];

    map.forEach((value) => {
        arr.push(value);
    });

    return arr;
}

export const sleep = (time: number): Promise<void> =>
    new Promise((resolve) => {
        setTimeout(resolve, time);
    });
