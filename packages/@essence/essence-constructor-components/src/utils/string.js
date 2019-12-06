import {i18next} from "@essence/essence-constructor-share/utils";
/**
 * Получения сообщения по режиму формы.
 *
 * @param {string} mode Режим формы.
 * @returns {string} Значение
 */
export function getModeTitle(mode) {
    switch (mode) {
        case "1":
            return i18next.t("aa75a46ca0a44a6a8a16ffa1357ec313");
        case "6":
            return i18next.t("7437988e948f4962abba9656e4988adc");
        default:
            return i18next.t("8059806cc90c4ba4be7fa5ae15d5e64b");
    }
}
