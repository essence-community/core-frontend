import {IHanderOptions} from "./hander.types";

export function popoverToggleHandler({popoverCtx}: IHanderOptions) {
    if (popoverCtx.open) {
        popoverCtx.onClose();
    } else {
        popoverCtx.onOpen();
    }
}
