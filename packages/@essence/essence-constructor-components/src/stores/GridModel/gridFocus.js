// @flow
import find from "lodash/find";
import {KEY_ARROW_DOWN, KEY_ARROW_LEFT, KEY_ARROW_RIGHT, KEY_ARROW_UP, QUERY_GRID_ELEMENT} from "../../constants";

const isDisabled = (el?: Object) => el && el.disabled;

const handleFocusRow = (tr: HTMLTableRowElement, isNext: boolean) => {
    const cells = [...tr.querySelectorAll(QUERY_GRID_ELEMENT)];
    const indexCell = cells.findIndex((el) => el === document.activeElement);
    // $FlowFixMe
    const nextTr: ?HTMLTableRowElement = isNext ? tr.nextElementSibling : tr.previousSibling;

    if (nextTr) {
        nextTr.click();

        const nextCells = [...nextTr.querySelectorAll(QUERY_GRID_ELEMENT)];
        const nextCell = isDisabled(nextCells[indexCell])
            ? find(nextCells, (el) => !isDisabled(el))
            : nextCells[indexCell];

        if (nextCell) {
            nextCell.focus();
        } else {
            nextTr.focus();
        }
    }
};

const handleFocusCell = (tr: HTMLTableRowElement, isNext: boolean) => {
    const cells = [...tr.querySelectorAll(QUERY_GRID_ELEMENT)];
    const indexCell = cells.findIndex((el) => el === document.activeElement);
    const nextCell = isNext ? cells[indexCell + 1] : cells[indexCell - 1];

    if (nextCell) {
        nextCell.focus();
    }
};

export const handleFocusAfterKeyDown = (tr: HTMLTableRowElement, keyCode: number) => {
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
};
