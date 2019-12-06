import {camelCaseMemoized} from "./transform";

export const findGetGlobalKey = (str: string): {[$key: string]: string} =>
    str.split(",").reduce((acc: {[$key: string]: string}, item) => {
        const keys = item.split("=");

        acc[camelCaseMemoized(keys[1] || keys[0])] = camelCaseMemoized(keys[0]);

        return acc;
    }, {});

/**
 * Column - используется для определения дефолнотного значения "локального поля"
 *
 * @param {string} str Исходная строка
 * @param {string} [column] Колонка, которая будет браться по умолчанию
 *
 * @returns {Object} Распарсенная исходная строка в виде "глобальная переменная": "локальное поле"
 */
export const findSetKey = (str: string, column?: string): Record<string, string> =>
    str.split(",").reduce((acc: Record<string, string>, item: string) => {
        const keys = item.split("=");
        const setKey = keys[1] || keys[0];

        acc[camelCaseMemoized(setKey)] = keys[1]
            ? camelCaseMemoized(keys[0])
            : column || camelCaseMemoized(keys[0].replace(/^g_?/u, ""));

        return acc;
    }, {});
