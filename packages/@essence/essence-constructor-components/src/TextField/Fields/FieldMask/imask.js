// @flow
import formatChars from "./formatChars.json";
import validCharToVal from "./validCharToVal.json";
import validationCharacters from "./validationCharacters.json";

type ExtendValidMask = {
    imask: string,
    value: string,
    regex: RegExp,
    oldImask: string,
};

/**
 * Проверка маски на валидность
 *
 * @param {string} newImask Новая маска
 * @param {RegExp} regex Маска валидации
 *
 * @returns {boolean} Признак валидность маски
 */
export const checkValidImask = (newImask: string, regex: RegExp) => {
    const mockValue = newImask
        .split("")
        .map((char) => validCharToVal[char] || char)
        .join("");

    return regex.test(mockValue);
};

export function getStrRegexFromImask(imask: string): string {
    return imask
        .split("")
        .map((pattern) => validationCharacters[pattern] || `\\${pattern}`)
        .join("");
}

/**
 * Получение валидации из маски
 *
 * @param {string} imask Маска ввода
 *
 * @returns {RegExp} Регулярное выражение для валидации
 */
export function getRegexFromImask(imask: string): RegExp {
    return new RegExp(`^${getStrRegexFromImask(imask)}$`, "u");
}

function getCharRegex(imask: string, index: number) {
    return new RegExp(`^${formatChars[imask[index]] || imask[index]}$`, "u");
}

function prepareImask(imask: string, value: string) {
    let index = 0;
    let newImask = "";

    for (const char of value.split("")) {
        if (getCharRegex(imask, index).test(char)) {
            newImask += imask[index];
            index += 1;
        } else if (getCharRegex(imask, index - 1).test(char)) {
            newImask += imask[index - 1];
        }
    }

    if (index < imask.length) {
        newImask += imask.slice(index);
    }

    return newImask;
}

/**
 * Преобрзует маску под значение
 *
 * @param {object} props Параметры
 * @param {string} props.imask Маска ввода
 * @param {string} props.value Новое значение поля
 * @param {RegExp} props.regex Валидация поля для подстановки маски
 *
 * @returns {object} newImask - Новая маска; valid - Флаг валидности новой маски
 */
export const extendValidMask = ({imask, value, regex, oldImask}: ExtendValidMask) => {
    const newImask = prepareImask(imask, value);

    if (checkValidImask(newImask, regex)) {
        return {newImask, valid: true};
    }

    return {newImask: oldImask, valid: false};
};
