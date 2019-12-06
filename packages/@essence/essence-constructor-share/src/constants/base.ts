import debug from "debug/dist/debug";

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
