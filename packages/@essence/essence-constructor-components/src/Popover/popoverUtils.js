// @flow
const marginThreshold = 16;

type RectType = {
    height: number,
    width: number,
    left: number,
    top: number,
};

export function getOffsetTop(rect: RectType, vertical: "top" | "center" | "bottom" | number) {
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

export function getOffsetLeft(rect: RectType, horizontal: "left" | "center" | "right" | number) {
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

export function getDiffWindowLeft(left: number, popoverRect: RectType, rectContainer: RectType) {
    const diffLeft = left + rectContainer.left + popoverRect.width + marginThreshold;

    return diffLeft > window.innerWidth ? diffLeft - window.innerWidth : 0;
}

export function getDiffWindowTop(top: number, popoverRect: RectType, containerRect: RectType) {
    const diffTop = top + containerRect.top + popoverRect.height + marginThreshold;

    return diffTop > window.innerHeight ? diffTop - window.innerHeight : 0;
}
