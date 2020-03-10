import * as DOMPurify from "dompurify";
import {isEmpty, isString} from "lodash";
import {TText} from "../types/SnackbarModel";
import {TFunction} from "./I18n";

export const toSize = (value?: string, defaultValue?: string) => {
    if (isEmpty(value) || !isString(value)) {
        return value || defaultValue;
    }

    if (/^\d+$/u.test(value)) {
        return parseFloat(value);
    }

    return value || defaultValue;
};

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

export const renderTText = (text: TText, trans: TFunction) => {
    if (typeof text === "function") {
        return text(trans);
    }

    if (typeof text === "string") {
        return trans(text, text);
    }

    return text;
};
