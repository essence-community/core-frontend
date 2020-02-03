import {IPageModel} from "../../types";

export interface IRect {
    height: number;
    width: number;
    left: number;
    top: number;
}

export interface IPopoverTransfromOrigin {
    vertical: "top" | "center" | "bottom" | number;
    horizontal: "left" | "center" | "right" | number;
}

export interface IPopoverAnchorOrigin {
    vertical: "top" | "center" | "bottom" | number;
    horizontal: "left" | "center" | "right" | number;
}

export interface IGetOffsetContainerProps extends IOffset {
    container: null | HTMLElement;
    popupEl: null | HTMLElement;
    rootEl: null | HTMLElement;
    transformOrigin: IPopoverTransfromOrigin;
    anchorOrigin: IPopoverAnchorOrigin;
}

export interface IOffset {
    bottom?: number;
    left: number;
    top: number | "auto";
    height?: number;
}

export interface IPopoverChildrenProps {
    open: boolean;
    position: "top" | "bottom";
    height?: number;
    onOpen: (event: React.SyntheticEvent) => void;
    onClose: (event: React.SyntheticEvent) => void;
    onCalculateOffset: () => void;
}

export type PopoverRenderChildren = (props: IPopoverChildrenProps) => React.ReactNode;

export interface IHookIsOpenProps {
    container: HTMLElement;
    pageStore: IPageModel;
    hideOnScroll?: boolean;
    disableOutsideClose?: boolean;
    open: boolean;
    onOutsideClick: (event: MouseEvent) => void;
    onResize: (event: UIEvent) => void;
    setStyle: (styles: IOffset) => void;
    onChangeOpen: (isOpen: boolean) => void;
}

export interface IPopoverProps {
    popoverContent: React.ReactNode | PopoverRenderChildren;
    paperClassName?: string;
    hideBackdrop?: boolean;
    transformOrigin?: IPopoverTransfromOrigin;
    anchorOrigin?: IPopoverAnchorOrigin;
    container: HTMLElement | null;
    disableRestoreFocus?: boolean;
    pageStore: IPageModel;
    restoreFocusedElement?: boolean;
    focusableMount?: boolean;
    dataPageObjectPopover?: string;
    hideOnScroll?: boolean;
    hideOnResize?: boolean;
    disableOutsideClose?: boolean;
    children: PopoverRenderChildren;
    disableEscapeKeyDown?: boolean;
    tabFocusable?: boolean;
    width?: number | "auto";
    disableFocusableArrow?: boolean;
    onBackdropClick?: () => void;
    onClickOutside?: () => void;
    onChangeOpen?: (isOpen: boolean) => void;
    onBlur?: (event: React.FocusEvent<HTMLDivElement>) => void;
}

export interface IPopoverContentProps {
    ref?: React.Ref<HTMLDivElement>;
    styleOffset: IOffset;
    open: boolean;
    hideBackdrop: boolean;
    dataPageObjectPopover?: string;
    container: HTMLElement;
    disableEscapeKeyDown?: boolean;
    tabFocusable: boolean;
    focusableMount?: boolean;
    restoreFocusedElement?: boolean;
    paperClassName?: string;
    width: number | "auto";
    onEscapeKeyDown?: React.ReactEventHandler<{}>;
    popoverContent: React.ReactNode | PopoverRenderChildren;
    disableFocusableArrow?: boolean;
    onClose: () => void;
    onOpen: () => void;
    onCalculateOffset: () => void;
    onEntering: (node: HTMLElement, isAppearing: boolean) => void;
}
