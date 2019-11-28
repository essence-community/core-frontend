// @flow
const MAX_PERCENT = 100;

export const getWidth = (initialWidthPx: number, initialWidthPercent: number, offset: number) => {
    if (initialWidthPercent === 0 || initialWidthPx === 0) {
        return offset / MAX_PERCENT;
    }

    const fullWidthPx = (initialWidthPx * MAX_PERCENT) / initialWidthPercent;
    const currentWidthPercent = ((initialWidthPx - offset) * MAX_PERCENT) / fullWidthPx;

    return currentWidthPercent;
};
