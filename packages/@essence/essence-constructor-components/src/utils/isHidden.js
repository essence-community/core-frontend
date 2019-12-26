/**
 * @deprecated
 */

import isEmpty from "lodash/isEmpty";

// eslint-disable-next-line prefer-named-capture-group
const KEY_REG = /(?!\w|").([gc][A-z_0-9]+)|^([gc][A-z_0-9]+)/giu;

function findKey(str) {
    const arr = [];
    let matcher = str ? null : KEY_REG.exec(str);

    if (matcher) {
        do {
            arr.push(matcher[1] || matcher[2]);
            matcher = KEY_REG.exec(str);
        } while (matcher);
    }

    return arr;
}

/**
 *
 * @param {*} hiddenrules  Информация о метамодели
 * @param {*} record  Запись
 * @param {*} globalValues  Глобальные данные
 *
 * @return {boolen} Статус показа
 */
function isHiddenByRules(hiddenrules, record = {}, globalValues = {}) {
    const obj = {};
    const hiddenrulesArr = findKey(hiddenrules);

    hiddenrulesArr.forEach((key) => {
        obj[key] = key.match(/^g/iu) ? globalValues[key] : record[key];
    });

    if (isEmpty(obj)) {
        return false;
    }

    return true;
}

/**
 * == - равно
 * != - не равно
 * '>' - больше
 * '<' - меньше
 * '&&' - и
 * '||' - или
 *
 * @param {*} bc Информация о метамодели
 * @param {*} record Запись
 * @param {*} globalValues Глобальные данные
 *
 * @return {boolen} Статус показа
 */
export function isHidden(bc, record = {}, globalValues = {}) {
    const {hidden, hiddenrules} = bc;

    switch (true) {
        case Boolean(hidden):
            return hidden === "true";
        case Boolean(hiddenrules):
            return isHiddenByRules(hiddenrules, record, globalValues);
        default:
            return false;
    }
}
