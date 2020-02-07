import {IPageModel} from "@essence-community/constructor-share/types";

const movePageRight = (pages: Array<IPageModel>, dragIndex: number, hoverIndex: number) => {
    const dragPage = pages[dragIndex];
    const hoverPage = pages[hoverIndex];

    let startPages = [];
    let middlePages = [];
    let endPages = [];

    startPages = pages.slice(0, dragIndex);
    middlePages = pages.slice(dragIndex + 1, hoverIndex);
    endPages = pages.slice(hoverIndex + 1, pages.length);

    return [...startPages, ...middlePages, hoverPage, dragPage, ...endPages];
};

const movePageLeft = (pages: Array<IPageModel>, dragIndex: number, hoverIndex: number) => {
    const dragPage = pages[dragIndex];
    const hoverPage = pages[hoverIndex];

    let startPages = [];
    let middlePages = [];
    let endPages = [];

    startPages = pages.slice(0, hoverIndex);
    middlePages = pages.slice(hoverIndex + 1, dragIndex);
    endPages = pages.slice(dragIndex + 1, pages.length);

    return [...startPages, dragPage, hoverPage, ...middlePages, ...endPages];
};

export const changePagePosition = (pages: Array<IPageModel>, dragIndex: number, hoverIndex: number) => {
    if (dragIndex > hoverIndex) {
        return movePageLeft(pages, dragIndex, hoverIndex);
    }

    return movePageRight(pages, dragIndex, hoverIndex);
};
