/**
 * Скланение значения
 *
 * @param {*} num значение
 * @param {[string, string, string]} expressions 1, 2-4, 5...
 *
 * @returns {string} Склоненный текст
 */
export function declension(num: number, expressions: string[]) {
    let count: number = num % 100;
    const [what, whomSingle, whomMuch] = expressions;

    if (count >= 5 && count <= 20) {
        return whomMuch;
    }

    count %= 10;

    if (count === 1) {
        return what;
    } else if (count >= 2 && count <= 4) {
        return whomSingle;
    }

    return whomMuch;
}
