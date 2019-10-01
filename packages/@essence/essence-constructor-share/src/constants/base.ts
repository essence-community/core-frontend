import debug from "debug/dist/debug";

export const loggerRoot = debug("essence:constructor");
export const BASE_URL = process.env.REACT_APP_BASE_URL;
export const FILE_URL = process.env.REACT_APP_FILE_URL;
export const HOST_URL = process.env.REACT_APP_HOST_URL;
export const QUERY_ELEMENT = [
    "button:not(:disabled)",
    "[href]",
    "input:not(:disabled)",
    "select:not(:disabled)",
    "textarea:not(:disabled)",
    "[tabindex='0']:not([disabled])",
].join(", ");
export const ANIMATION_TIMEOUT = process.env.NODE_ENV === "test" ? 10 : 500;
