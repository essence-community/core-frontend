interface IGetCoodsResult {
    left: number;
    top: number;
}

export function getCoords(elem: HTMLElement): IGetCoodsResult {
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
