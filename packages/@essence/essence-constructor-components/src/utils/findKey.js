// @flow
import uniq from "lodash/uniq";
import trim from "lodash/trim";
import isEmpty from "lodash/isEmpty";

// eslint-disable-next-line prefer-named-capture-group
const keyReg = /(?!\w|").([gc][A-z_0-9]+)|^([gc][A-z_0-9]+)/giu;

export const findGetKey = (str: string): Array<string> => str.split("||").filter((value) => value.indexOf("'") === -1);

/**
 * Column - используется для определения дефолнотного значения "локального поля"
 *
 * @param {string} str Исходная строка
 * @param {string} [column] Колонка, которая будет браться по умолчанию
 *
 * @returns {Object} Распарсенная исходная строка в виде "глобальная переменная": "локальное поле"
 */
export const findSetKey = (str: string, column?: string): {[$key: string]: string} =>
    str.split(",").reduce((acc, item) => {
        const keys = item.split("=");
        const setKey = keys[1] || keys[0];

        acc[setKey] = keys[1] ? keys[0] : column || keys[0].replace(/^g_?/u, "");

        return acc;
    }, {});

export const findGetGlobalKey = (str: string): {[$key: string]: string} =>
    str.split(",").reduce((acc, item) => {
        const keys = item.split("=");

        // eslint-disable-next-line prefer-destructuring
        acc[keys[1] || keys[0]] = keys[0];

        return acc;
    }, {});

export const findRulesKey = (str: string): Array<string> => {
    const arr = [];
    let matcher = isEmpty(str) ? null : keyReg.exec(str);

    if (matcher) {
        do {
            arr.push(trim(matcher[1] || matcher[2]));
            matcher = keyReg.exec(str);
        } while (matcher);
    }

    return uniq(arr);
};
