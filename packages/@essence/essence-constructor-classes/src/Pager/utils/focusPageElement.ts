import * as React from "react";
import {IPageModel, QUERY_ELEMENT} from "@essence-community/constructor-share";
import keycode from "keycode";

const isActiveElement = (editingPanel: Element | null) => (el: Element) => editingPanel && editingPanel.contains(el);

export function focusPageElement(event: React.KeyboardEvent<HTMLDivElement>, pageStore: IPageModel) {
    const {isEdit, pageEl, hiddenPage} = pageStore;
    const {shiftKey} = event;

    if (!hiddenPage && pageEl && keycode(event.keyCode) === "tab") {
        requestAnimationFrame(() => {
            if (
                !document.activeElement ||
                !pageEl.contains(document.activeElement) ||
                (isEdit && !isActiveElement(pageEl.querySelector(".panel-editing-focus"))(document.activeElement))
            ) {
                const focusableElementsAll = Array.from(pageEl.querySelectorAll(QUERY_ELEMENT));
                const focusableElements = (shiftKey ? focusableElementsAll.reverse() : focusableElementsAll).filter(
                    (el) => el.getAttribute("tabindex") !== "-1",
                );

                const element = isEdit
                    ? focusableElements.find(isActiveElement(pageEl.querySelector(".panel-editing-focus")))
                    : focusableElements[0];

                if (element instanceof HTMLElement) {
                    element.focus();
                }
            }
        });
    }
}
