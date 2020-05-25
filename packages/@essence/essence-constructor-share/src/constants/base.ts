import debug from "debug/dist/debug";
import {getFromStore} from "../utils/storage";

const defaultPreference = {
    // Задержка скрытия Tooltip
    debounceTooltipTime: 12,
    // Время появления Tooltip после наведения
    delayTooltipShow: 300,
    // Enable experimental UI
    experimentalUI: false,
    // Список модулей через запятую
    modules: "",
    // Смещение Tooltip по даигонали от курсора мышки
    offsetTooltip: 15,
    // Включение отладочного окна при передае параметров извне
    redirectDebugWindow: false,
    // Включение режима объединения полей в wysiwyg
    wysiwygCombineFields: false,
};

export const loggerRoot = debug("essence:constructor");
export const QUERY_ELEMENT = [
    "button:not(:disabled)",
    "[href]",
    "input:not(:disabled)",
    "select:not(:disabled)",
    "textarea:not(:disabled)",
    "[tabindex='0']:not([disabled])",
].join(", ");
export const ANIMATION_TIMEOUT = process.env.NODE_ENV === "test" ? 10 : 500;
export const CARRY_LINES_REGEXP = /\r\n|\r|\n|<br\/?>/iu;
export const STORE_PAGES_IDS_KEY = "pages_ids";
export const STORE_LAST_CV_LOGIN_KEY = "last_cv_login";
export const STORE_FAVORITS_KEY = "favorits";
export const preference = {
    ...defaultPreference,
    ...getFromStore<typeof defaultPreference>("preference"),
};
export const MAX_NUMBER_SIZE = 9;
export const ACTIONS_MODE_MAP = {
    1: "I",
    2: "U",
    3: "D",
    4: "U",
    6: "I",
    7: "I",
    8: "I",
};
