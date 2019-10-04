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
