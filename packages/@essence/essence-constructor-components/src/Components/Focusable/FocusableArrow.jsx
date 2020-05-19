// @flow
import * as React from "react";
import keycode from "keycode";
import {QUERY_ELEMENT} from "@essence-community/constructor-share/constants";

/**
 * @property focusableMount - Устанавливает фокус на первый активный элемент
 * @property restoreFocusedElement - Востанавливает фокус при закрытии окна (unmount)
 * @property tabFocusable - Переключает перелистывание по табу
 */
type PropsType = {
    children: React.Node,
    focusableMount?: boolean,
    restoreFocusedElement?: boolean,
    tabFocusable?: boolean,
};

class FocusableArrow extends React.Component<PropsType> {
    contentRef = React.createRef();

    lastFocusedElement: ?HTMLElement;

    componentDidMount() {
        if (this.props.restoreFocusedElement) {
            this.lastFocusedElement = document.activeElement;
        }
        document.addEventListener("keydown", this.initializationFocus);
    }

    componentWillUnmount() {
        this.lastFocusedElement && this.lastFocusedElement.focus();
        this.lastFocusedElement = null;
        document.removeEventListener("keydown", this.initializationFocus);
    }

    initializationFocus = (event: KeyboardEvent) => {
        const {current} = this.contentRef;
        const code = keycode(event);

        if (current && !current.contains(document.activeElement)) {
            if (code === "up" || code === "down" || code === "tab") {
                requestAnimationFrame(() => {
                    const focusElement = current.querySelector(QUERY_ELEMENT);

                    focusElement && focusElement.focus();
                    document.removeEventListener("keydown", this.initializationFocus);
                });
            }
        }
    };

    handleKeyDown = (event: SyntheticKeyboardEvent<>) => {
        const {tabFocusable} = this.props;
        const code = keycode(event);

        if (tabFocusable) {
            if (code === "tab") {
                this.handleNextKeySelect(event.shiftKey ? "up" : "down");
            }
        } else if (code === "up" || code === "down") {
            this.handleNextKeySelect(code);
        }

        if (code === "tab") {
            event.stopPropagation();
            event.preventDefault();
        }
    };

    handleNextKeySelect = (code: "up" | "down") => {
        const {current} = this.contentRef;

        if (current) {
            const elements = [...current.querySelectorAll(QUERY_ELEMENT)];

            const selectedIndex = elements.findIndex((el) => el === document.activeElement);
            const nextSelectedIndex = selectedIndex + (code === "up" ? -1 : 1);

            const focusElement = elements[nextSelectedIndex];

            if (focusElement) {
                focusElement.focus();
            }
        }
    };

    render() {
        return (
            <div onKeyDown={this.handleKeyDown} ref={this.contentRef}>
                {this.props.children}
            </div>
        );
    }
}

export default FocusableArrow;
