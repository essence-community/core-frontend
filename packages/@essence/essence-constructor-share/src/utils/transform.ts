import * as DOMPurify from "dompurify";
import {camelCase, isArray, isEmpty, isObject, isString, reduce, snakeCase} from "lodash";

const BUTCH_SIZE = 50;
const memoizedValues: any = {};

type ValueType = undefined | null | number | string;
type ValueComplexType = ValueType | ValueType[] | {[key: string]: ValueType};
interface INestedValue extends Array<INestedValue | ValueComplexType> {}
type ValueObjType = ValueComplexType | INestedValue;

// @ts-ignore
window.memoizedValues = memoizedValues;

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
        minWidth: width,
    };
};

export const camelCaseMemoized = (value: string) => {
    if (memoizedValues[value]) {
        return memoizedValues[value];
    }

    const transfomedValue = camelCase(value);

    memoizedValues[value] = transfomedValue;

    return transfomedValue;
};

export function camelCaseKeys<T>(obj: T): T {
    if (!isObject(obj)) {
        return obj;
    }

    if (Array.isArray(obj)) {
        // @ts-ignore
        return obj.map((value: ValueObjType) => camelCaseKeys(value));
    }

    const newObj: any = {};

    for (const key in obj) {
        // eslint-disable-next-line no-prototype-builtins
        if (obj.hasOwnProperty(key)) {
            if (typeof obj[key] === "object") {
                newObj[camelCase(key)] = camelCaseKeys(obj[key]);
            } else {
                newObj[camelCase(key)] = obj[key];
            }
        }
    }

    return newObj;
}

// eslint-disable-next-line max-statements
export async function camelCaseKeysAsync(obj: {[key: string]: ValueType}) {
    if (!isObject(obj)) {
        return obj;
    } else if (Array.isArray(obj)) {
        if (obj.length > BUTCH_SIZE) {
            let index = 0;
            let endIndex = 0;
            const res: any[] = [];

            const pushRes = () => {
                for (; index < endIndex; index += 1) {
                    res.push(camelCaseKeys(obj[index]));
                }
            };

            while (index < obj.length) {
                endIndex += BUTCH_SIZE;

                if (endIndex > obj.length) {
                    endIndex = obj.length;
                }

                pushRes();
            }

            return res;
        }

        return obj.map((value) => camelCaseKeys(value));
    }

    let key = "";
    const newObj: any = {};

    for (key in obj) {
        if (typeof obj[key] === "object") {
            // eslint-disable-next-line no-await-in-loop
            newObj[camelCase(key)] = await camelCaseKeysAsync(obj[key] as any);
        } else {
            newObj[camelCase(key)] = obj[key];
        }
    }

    return newObj;
}

export const snakeCaseKeys = (obj: any): any => {
    if (!isObject(obj)) {
        return obj;
    } else if (isArray(obj)) {
        return obj.map((value) => snakeCaseKeys(value));
    }

    return reduce(
        obj,
        (sum: any, value: any, key: string) => {
            sum[snakeCase(key)] = snakeCaseKeys(value);

            return sum;
        },
        {},
    );
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
