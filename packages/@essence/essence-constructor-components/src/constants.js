// @flow
import {getFromStore} from "@essence/essence-constructor-share/utils";
import debug from "debug/dist/debug";

if (process.env.NODE_ENV === "developent") {
    debug.enable("essence:constructor:*");
}

if (process.env.NODE_ENV === "production") {
    debug.enable("essence:constructor:*");
}

const defaultPreference = {
    // Задержка скрытия Tooltip
    debounceTooltipTime: 12,
    // Время появления Tooltip после наведения
    delayTooltipShow: 300,
    // Список модулей через запятую
    modules: "",
    // Смещение Tooltip по даигонали от курсора мышки
    offsetTooltip: 15,
    // Включение отладочного окна при передае параметров извне
    redirectDebugWindow: false,
    // Включение режима объединения полей в wysiwyg
    wysiwygCombineFields: false,
};

export const BASE_URL = process.env.REACT_APP_BASE_URL || "gate_ub_dev";
export const styleTheme = getFromStore("theme", "light");
export const wrapperPanelDirection = styleTheme === "dark" ? "row" : "column";
export const buttonDirection = styleTheme === "dark" ? "column" : "row";
export const TABLE_CELL_MIN_WIDTH = 90;
export const STORE_PAGES_IDS_KEY = "pages_ids";
export const STORE_LAST_CV_LOGIN_KEY = "last_cv_login";
export const TAB_KEY_CODE = 9;
export const KEY_ARROW_LEFT = 37;
export const KEY_ARROW_RIGHT = 39;
export const KEY_ARROW_DOWN = 40;
export const KEY_ARROW_UP = 38;
export const FRAME_DELAY = 16;
export const QUERY_ELEMENT = [
    "button:not(:disabled)",
    "[href]",
    "input:not(:disabled)",
    "select:not(:disabled)",
    "textarea:not(:disabled)",
    "[tabindex='0']:not([disabled])",
].join(", ");
export const QUERY_GRID_ELEMENT = "[data-tabindex-grid='0']";
export const SCROLL_WEIGHT = 10;
export const loggerRoot = debug("essence:constructor");
export const loggerRootInfo = loggerRoot.extend("info");
export const loggerRootError = loggerRoot.extend("error");
export const preference: typeof defaultPreference = {
    ...defaultPreference,
    ...getFromStore("preference"),
};
window.preference = preference;
export const GRID_ROW_HEIGHT = 30;
export const BUTTON_HEIGHT = 42;
export const GRID_ROWS_COUNT = 5;

// Test

// eslint-disable-next-line no-magic-numbers
export const ANIMATION_TIMEOUT = process.env.NODE_ENV === "test" ? 10 : 500;

export const CARRY_LINES_REGEXP = /\r\n|\r|\n|<br\/?>/iu;
