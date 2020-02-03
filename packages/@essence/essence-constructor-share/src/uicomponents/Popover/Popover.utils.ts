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

function getDiffContainerLeft(left: number, popoverRect: RectType, rectContainer: RectType): number {
    const diffLeft = left + popoverRect.width + marginThreshold;

    return diffLeft > rectContainer.width ? diffLeft - rectContainer.width : 0;
}

function getDiffContainerTop(top: number, popoverRect: RectType, containerRect: RectType): number {
    const diffTop = top + popoverRect.height + marginThreshold;

    return diffTop > containerRect.height ? diffTop - containerRect.height : 0;
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
    const topNumber = top === "auto" ? 0 : top;
    const leftPopover =
        left +
        getOffsetLeft(anchorRect, anchorOrigin.horizontal) -
        getOffsetLeft(popoverRect, transformOrigin.horizontal);
    const topPopoverAbsoulte =
        topNumber +
        getOffsetTop(anchorRect, anchorOrigin.vertical) -
        getOffsetTop(popoverRect, transformOrigin.vertical);
    const topPopoverRelative = topPopoverAbsoulte < marginThreshold ? marginThreshold : topPopoverAbsoulte;
    const diffWindowTop = getDiffContainerTop(topPopoverRelative, popoverRect, containerRect);

    if (diffWindowTop > 0) {
        const bottom = containerRect.height - topPopoverRelative + anchorRect.height;
        const isAutoHeight = anchorRect.top - containerRect.top - popoverRect.height - marginThreshold - 1 > 0;

        return {
            bottom,
            height: isAutoHeight ? undefined : containerRect.height - marginThreshold - bottom,
            left: leftPopover - getDiffContainerLeft(leftPopover, popoverRect, containerRect),
            top: isAutoHeight ? "auto" : marginThreshold,
        };
    }

    return {
        left: leftPopover - getDiffContainerLeft(leftPopover, popoverRect, containerRect),
        top: topPopoverRelative - diffWindowTop,
    };
}
