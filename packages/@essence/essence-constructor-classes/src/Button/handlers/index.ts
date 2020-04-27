import {Handler} from "./hander.types";
import {freeHandler} from "./freeHandler";
import {popoverOpenHander} from "./popoverOpenHandler";

export const handers: Handler = {
    free: freeHandler,
    onPopoverOpen: popoverOpenHander,
};
