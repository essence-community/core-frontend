import * as DOMPurify from "dompurify";
import {TText} from "../types/SnackbarModel";
import {IRecord} from "../types/Base";
import {FieldValue, IBuilderConfig} from "../types";
import {isEmpty} from "./base";
import {TFunction} from "./I18n";

/**
 * Преобразование bc.width в width для material-grid
 *
 * @param {string} [width] Ширина в формате 0-100%
 *
 * @returns {Object} [styleWidth] Ширина поля
 */
export const toColumnStyleWidth = (width?: number | string) => {
    if (!width) {
        return undefined;
    }

    return {
        flexBasis: width,
        maxWidth: width,
        width,
    };
};

export const toColumnStyleWidthBc = (bc: IBuilderConfig) => {
    if (!bc.width) {
        return undefined;
    }

    return {
        flexBasis: bc.width,
        maxWidth: bc.maxwidth || bc.width,
        minWidth: bc.minwidth,
        width: bc.width,
    };
};

export const sanitizeHtml = (html: string, config?: any): string => {
    if (isEmpty(html)) {
        return "";
    }
    if (config) {
        DOMPurify.sanitize(html, config);
    }

    return DOMPurify.sanitize(html);
};

export const isBool = (value: string): boolean => value === "true";

export const toTranslateText = (trans: TFunction, text?: string | TText): undefined | string | JSX.Element => {
    if (typeof text === "function") {
        return text(trans);
    }

    if (typeof text === "string") {
        return trans(text, text);
    }

    return text;
};

export const toTranslateTextArray = (
    trans: TFunction,
    textArr?: string | TText | TText[],
): undefined | string | JSX.Element | JSX.Element[] => {
    if (Array.isArray(textArr)) {
        return textArr.map((text: TText) => toTranslateText(trans, text)).join("\r\n");
    }

    return toTranslateText(trans, textArr);
};

export const deepFind = (obj: IRecord, path: string | string[]): [boolean, IRecord | FieldValue] => {
    if (isEmpty(obj) || isEmpty(path)) {
        return [false, undefined];
    }
    if (typeof path === "string" && Object.prototype.hasOwnProperty.call(obj, path)) {
        return [true, obj[path]];
    }
    const paths: any[] = Array.isArray(path) ? path : path.split(".");
    let current: any = obj;

    for (const [idx, val] of paths.entries()) {
        if (typeof current === "string" && (current.trim().charAt(0) === "[" || current.trim().charAt(0) === "{")) {
            current = JSON.parse(current);
        }
        if (!Array.isArray(current) && typeof current !== "object") {
            return [false, undefined];
        }

        if (val === "*" && (current[val] === undefined || current[val] === null)) {
            const arr = (Array.isArray(current)
                ? current.map((obj) => deepFind(obj, paths.slice(idx + 1))[1])
                : Object.entries(current).map(([, obj]) => deepFind(obj as any, paths.slice(idx + 1))[1])
            ).filter((val) => val !== undefined && val !== null);

            return [arr.length > 0, arr];
        }

        if (current[val] === undefined || current[val] === null) {
            return [false, current[val]];
        }

        current = current[val];
    }

    return [true, current];
};

export const deepChange = (obj: IRecord, path: string, value: IRecord | FieldValue): boolean => {
    if (isEmpty(path) || isEmpty(obj)) {
        return false;
    }
    const paths: any[] = path.split(".");
    const last = paths.pop();
    let current: any = obj;

    if (paths.length && !Array.isArray(current[paths[0]]) && typeof current[paths[0]] !== "object") {
        current[paths[0]] = /[0-9]+/.test(paths[0]) ? [] : {};
    }
    for (const val of paths) {
        current = current[val];
        if (!Array.isArray(current) && typeof current !== "object") {
            current[val] = /[0-9]+/.test(val) ? [] : {};
            current = current[val];
        }
    }
    current[last] = value;

    return true;
};

export const deepDelete = (obj: IRecord, path: string): IRecord => {
    const res = {...obj};
    const paths: any[] = path.split(".");
    const end = paths.pop();
    let current: any = res;

    for (const val of paths) {
        if (current[val] === undefined) {
            return res;
        }
        current = current[val];
    }

    if (Array.isArray(current)) {
        current.splice(end, 1);
    } else {
        delete current[end];
    }

    return res;
};

export function entriesMapSort<K, V>(map: Map<K, V>, sortFn?: (a: [K, V], b: [K, V]) => number): Array<[K, V]> {
    const arr = [];

    for (const val of map.entries()) {
        arr.push(val);
    }
    if (sortFn) {
        arr.sort(sortFn);
    }

    return arr;
}

export function mapValueToArray<K, L>(map?: Map<K, L>): L[] {
    if (!map) {
        return [];
    }
    const arr: L[] = [];

    for (const value of map.values()) {
        arr.push(value);
    }

    return arr;
}

export function transformToBoolean(value: any): boolean {
    if (typeof value === "string") {
        return value === "true" || value === "1" || value === "yes" || value === "on";
    }

    return Boolean(value);
}
