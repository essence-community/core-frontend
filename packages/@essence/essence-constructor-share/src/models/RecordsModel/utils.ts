// TODO: Import from utils
export const camalize = (str: string): string => {
    return str.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (_: any, chr: string) => chr.toUpperCase());
};

interface IAcc {
    [$key: string]: string;
}

// TODO: Import from utils
export const findGetGlobalKey = (str: string): IAcc =>
    str.split(",").reduce((acc: IAcc, item: string) => {
        const keys = item.split("=");

        acc[camalize(keys[1] || keys[0])] = camalize(keys[0]);

        return acc;
    }, {});

// TODO: Import from utils
/**
 * Column - используется для определения дефолнотного значения "локального поля"
 *
 * @param {string} str Исходная строка
 * @param {string} [column] Колонка, которая будет браться по умолчанию
 *
 * @returns {Object} Распарсенная исходная строка в виде "глобальная переменная": "локальное поле"
 */
export const findSetKey = (str: string, column?: string): IAcc =>
    str.split(",").reduce((acc: IAcc, item: string) => {
        const keys = item.split("=");
        const setKey = keys[1] || keys[0];

        acc[camalize(setKey)] = keys[1] ? camalize(keys[0]) : column || camalize(keys[0].replace(/^g_?/, ""));

        return acc;
    }, {});

// TODO: Import from utils
export const sleep = (time: number): Promise<void> =>
    new Promise((resolve) => {
        setTimeout(resolve, time);
    });
