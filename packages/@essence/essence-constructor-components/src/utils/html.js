// @flow

export function isVisibleInHtml(element: HTMLElement) {
    if (element.offsetWidth === 0 || element.offsetHeight === 0) {
        return false;
    }
    const rects = element.getClientRects();
    const onTop = function(rect) {
        const posX = (rect.left + rect.right) / 2;
        const posY = (rect.top + rect.bottom) / 2;

        return element.contains(document.elementFromPoint(posX, posY));
    };

    for (const rect of rects) {
        if (onTop(rect)) {
            return true;
        }
    }

    return false;
}

// eslint-disable-next-line max-statements
export function getCoords(elem: HTMLElement) {
    const box = elem.getBoundingClientRect();

    const {body} = document;

    if (!body) {
        return {left: 0, top: 0};
    }

    const scrollTop = window.pageYOffset || body.scrollTop;
    const scrollLeft = window.pageXOffset || body.scrollLeft;

    const clientTop = body.clientTop || 0;
    const clientLeft = body.clientLeft || 0;

    const top = box.top + scrollTop - clientTop;
    const left = box.left + scrollLeft - clientLeft;

    return {
        left,
        top,
    };
}
