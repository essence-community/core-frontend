import {IGetOffsetContainerProps, IOffset} from "./Popover.types";

const marginThreshold = 16;

type RectType = {
    height: number;
    width: number;
    left: number;
    top: number;
};

const EMPTY_RECT: RectType = {height: 0, left: 0, top: 0, width: 0};

export function getOffsetTop(rect: RectType, vertical: "top" | "center" | "bottom" | number): number {
    let offset = 0;

    if (typeof vertical === "number") {
        offset = vertical;
    } else if (vertical === "center") {
        offset = rect.height / 2;
    } else if (vertical === "bottom") {
        offset = rect.height;
    }

    return offset;
}

export function getOffsetLeft(rect: RectType, horizontal: "left" | "center" | "right" | number): number {
    let offset = 0;

    if (typeof horizontal === "number") {
        offset = horizontal;
    } else if (horizontal === "center") {
        offset = rect.width / 2;
    } else if (horizontal === "right") {
        offset = rect.width;
    }

    return offset;
}

export function getDiffWindowLeft(left: number, popoverRect: RectType, rectContainer: RectType): number {
    const diffLeft = left + rectContainer.left + popoverRect.width + marginThreshold;

    return diffLeft > window.innerWidth ? diffLeft - window.innerWidth : 0;
}

export function getDiffWindowTop(top: number, popoverRect: RectType, containerRect: RectType): number {
    const diffTop = top + containerRect.top + popoverRect.height + marginThreshold;

    return diffTop > window.innerHeight ? diffTop - window.innerHeight : 0;
}

export function getOffsetContainer({
    container,
    popupEl,
    rootEl,
    left,
    top,
    anchorOrigin,
    transformOrigin,
}: IGetOffsetContainerProps): IOffset {
    const anchorRect = rootEl ? rootEl.getBoundingClientRect() : EMPTY_RECT;
    const popoverRect = popupEl ? popupEl.getBoundingClientRect() : EMPTY_RECT;
    const containerRect = container ? container.getBoundingClientRect() : EMPTY_RECT;
    const leftPopover =
        left +
        getOffsetLeft(anchorRect, anchorOrigin.horizontal) -
        getOffsetLeft(popoverRect, transformOrigin.horizontal);
    const topPopover =
        top + getOffsetTop(anchorRect, anchorOrigin.vertical) - getOffsetTop(popoverRect, transformOrigin.vertical);
    const diffWindowTop = getDiffWindowTop(topPopover, popoverRect, containerRect);

    if (diffWindowTop > 0) {
        return {
            bottom: containerRect.height - topPopover + anchorRect.height,
            left: leftPopover - getDiffWindowLeft(leftPopover, popoverRect, containerRect),
            top: "auto",
        };
    }

    return {
        left: leftPopover - getDiffWindowLeft(leftPopover, popoverRect, containerRect),
        top: topPopover - getDiffWindowTop(topPopover, popoverRect, containerRect),
    };
}
