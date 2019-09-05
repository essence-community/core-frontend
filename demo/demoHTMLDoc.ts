interface IObject {
    [key: string]: any;
}

/**
 * Получения сообщения по режиму формы.
 *
 * @param {string} mode Режим формы.
 * @returns {string} Значение
 */
export function getModeTitle(mode: string): string {
    switch (mode) {
        case "1":
            return "Добавление";
        case "6":
            return "Клонирование";
        default:
            return "Редактирование";
    }
}

/**
 * @deprecated
 */

import isEmpty from "lodash/isEmpty";

const KEY_REG = /(?!\w|").([gc][A-z_0-9]+)|^([gc][A-z_0-9]+)/gi;

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
 * @param {string} hiddenrules  Информация о метамодели
 * @param {object} record  Запись
 * @param {object} globalValues  Глобальные данные
 *
 * @return {boolean} Статус показа
 */
function isHiddenByRules(hiddenrules: string, record: IObject = {}, globalValues: IObject = {}): boolean {
    const obj = {};
    const hiddenrulesArr = findKey(hiddenrules);

    hiddenrulesArr.forEach((key) => {
        obj[key] = key.match(/^g/i) ? globalValues[key] : record[key];
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
 * @param {object} bc Информация о метамодели
 * @param {object} record Запись
 * @param {object} globalValues Глобальные данные
 *
 * @return {boolean} Статус показа
 */
export function isHidden(bc: IObject, record: IObject = {}, globalValues: IObject = {}): boolean {
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
