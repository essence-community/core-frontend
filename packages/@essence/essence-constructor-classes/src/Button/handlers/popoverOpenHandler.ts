import {IHanderOptions} from "./hander.types";

export function popoverOpenHander({popoverCtx}: IHanderOptions) {
    popoverCtx.onOpen();
}
