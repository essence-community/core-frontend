export const findGetGlobalKey = (str: string): {[$key: string]: string} =>
    str.split(",").reduce((acc: {[$key: string]: string}, item) => {
        const keys = item.split("=");

        // eslint-disable-next-line prefer-destructuring
        acc[keys[1] || keys[0]] = keys[0];

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

        acc[setKey] = keys[1] ? keys[0] : column || keys[0].replace(/^g_?/u, "");

        return acc;
    }, {});
