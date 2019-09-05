/**
 * Проверяем на возможность редактирования
 *
 * @param {string} mode 1 - создание, 2 - редактирование
 * @param {string} editmode all - все, insert - создание, update - редактирование
 *
 * @returns {boolean} возвращает true или false
 */
export function checkEditable(mode, editmode) {
    if (editmode === "all") {
        return true;
    }

    if ((mode === "1" && editmode === "insert") || (mode === "2" && editmode === "update")) {
        return true;
    }

    return false;
}
