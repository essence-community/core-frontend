// @flow
import * as React from "react";
import {type PageModelType} from "../stores/PageModel";
import styles from "./PopoverStyles";

export type PopoverChildrenParamsType = {|
    open: boolean,
    onOpen: () => void,
    onClose: (event: SyntheticEvent<>) => void,
|};
export type PopoverTransfromOriginType = {|
    vertical: "top" | "center" | "bottom" | number,
    horizontal: "left" | "center" | "right" | number,
|};
export type PopoverAnchorOriginType = {|
    vertical: "top" | "center" | "bottom" | number,
    horizontal: "left" | "center" | "right" | number,
|};
export type PopoverRenderChildren = (props: PopoverChildrenParamsType) => React.Node;

export type PopoverPropsType = {|
    popoverContent: React.Node | PopoverRenderChildren,
    open?: boolean,
    paperClassName?: string,
    width?: number | string,
    hideBackdrop: boolean,
    anchorOrigin: PopoverAnchorOriginType,
    transformOrigin: PopoverTransfromOriginType,
    container: ?HTMLElement,
    disableRestoreFocus?: boolean,
    pageStore?: PageModelType,
    children: PopoverRenderChildren,
    restoreFocusedElement?: boolean,
    focusableMount?: boolean,
    dataPageObjectPopover?: string,
    classes: {
        [$Keys<$Call<typeof styles>>]: string,
    },
    hideOnScroll?: boolean,
    hideOnResize?: boolean,
    disableEscapeKeyDown?: boolean,
    disableOutsideClose?: boolean,
    tabFocusable: boolean,
    onClickOutside: () => void,
    onClose?: () => void,
    onOpen?: () => void,
    onBackdropClick?: () => void,
    onChangeOpen: (open: boolean) => void,
|};
