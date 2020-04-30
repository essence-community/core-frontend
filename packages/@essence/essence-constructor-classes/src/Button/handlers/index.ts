import {Handler} from "./hander.types";
import {freeHandler} from "./freeHandler";
import {popoverOpenHander} from "./popoverOpenHandler";
import {popoverToggleHandler} from "./popoverToggleHandler";

export const handers: Handler = {
    free: freeHandler,
    onPopoverOpen: popoverOpenHander,
    onPopoverToggle: popoverToggleHandler,
};
