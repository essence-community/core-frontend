import {IBuilderMode} from "@essence-community/constructor-share/types";

/**
 * Проверяем на возможность редактирования
 *
 * @param {string} mode 1 - создание, 2 - редактирование
 * @param {string} editmode all - все, insert - создание, update - редактирование
 *
 * @returns {boolean} возвращает true или false
 */
export function checkEditable(mode: IBuilderMode, editmode?: string): boolean {
    switch (true) {
        case editmode === "all":
        case mode === "1" && (editmode === "insert" || editmode === "insert-editing"):
        case mode === "2" && (editmode === "update" || editmode === "update-editing"):
            return true;
        default:
            return false;
    }
}
