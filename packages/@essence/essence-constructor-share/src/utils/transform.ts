import * as DOMPurify from "dompurify";
import {isEmpty} from "lodash";
import {TText} from "../types/SnackbarModel";
import {IRecord} from "../types/Base";
import {FieldValue} from "../types";
import {TFunction} from "./I18n";

/**
 * Преобразование bc.width в width для material-grid
 *
 * @param {srting} [width] Ширина в формате 0-100%
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

export const deepFind = (obj: IRecord, path: string): [boolean, IRecord | FieldValue] => {
    const paths: any[] = path.split(".");
    let current: any = obj;

    for (const val of paths) {
        if (current[val] === undefined || current[val] === null) {
            return [false, current[val]];
        }

        current = current[val];
    }

    return [true, current];
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
