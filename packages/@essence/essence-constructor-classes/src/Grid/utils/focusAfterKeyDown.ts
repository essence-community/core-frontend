import {KEY_ARROW_DOWN, KEY_ARROW_LEFT, KEY_ARROW_RIGHT, KEY_ARROW_UP, QUERY_GRID_ELEMENT} from "../constants";

function isDisabled(el: HTMLButtonElement) {
    return el && el.disabled;
}

function handleFocusRow(tr: HTMLTableRowElement, isNext: boolean) {
    const cells = tr.querySelectorAll(QUERY_GRID_ELEMENT);
    const indexCell = Array.prototype.findIndex.call(cells, (el: HTMLButtonElement) => el === document.activeElement);
    const nextTr = isNext ? tr.nextElementSibling : tr.previousSibling;

    if (nextTr instanceof HTMLTableRowElement) {
        nextTr.click();

        const nextCells = Array.from(nextTr.querySelectorAll(QUERY_GRID_ELEMENT));
        const nextCell = isDisabled(nextCells[indexCell])
            ? nextCells.find((el) => !isDisabled(el))
            : nextCells[indexCell];

        if (nextCell) {
            nextCell.focus();
        } else {
            nextTr.focus();
        }
    }
}

function handleFocusCell(tr: HTMLTableRowElement, isNext: boolean) {
    const cells = Array.from(tr.querySelectorAll(QUERY_GRID_ELEMENT));
    const indexCell = cells.findIndex((el) => el === document.activeElement);
    const nextCell = isNext ? cells[indexCell + 1] : cells[indexCell - 1];

    if (nextCell) {
        nextCell.focus();
    }
}

export function focusAfterKeyDown(tr: HTMLTableRowElement, keyCode: number) {
    switch (keyCode) {
        case KEY_ARROW_RIGHT:
            return handleFocusCell(tr, true);
        case KEY_ARROW_LEFT:
            return handleFocusCell(tr, false);
        case KEY_ARROW_DOWN:
            return handleFocusRow(tr, true);
        case KEY_ARROW_UP:
            return handleFocusRow(tr, false);
        default:
            return null;
    }
}
