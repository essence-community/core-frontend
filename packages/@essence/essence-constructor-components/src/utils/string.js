/**
 * Получения сообщения по режиму формы.
 *
 * @param {string} mode Режим формы.
 * @returns {string} Значение
 */
export function getModeTitle(mode) {
    switch (mode) {
        case "1":
            return "Добавление";
        case "6":
            return "Клонирование";
        default:
            return "Редактирование";
    }
}
