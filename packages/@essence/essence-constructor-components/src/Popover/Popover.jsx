// @flow
import * as React from "react";
import {createPortal} from "react-dom";
import noop from "lodash/noop";
import isFunction from "lodash/isFunction";
import keycode from "keycode";
import {Paper, Backdrop, Grow} from "@material-ui/core";
import {withStyles} from "@material-ui/core/styles";
import {getAbsoluteOffsetFromGivenElement} from "@essence/essence-constructor-share/utils";
import {ANIMATION_TIMEOUT} from "../constants";
import FocusableArrow from "../Components/Focusable/FocusableArrow";
import {type PopoverPropsType} from "./PopoverTypes";
import {getOffsetTop, getOffsetLeft, getDiffWindowLeft, getDiffWindowTop} from "./popoverUtils";
import styles from "./PopoverStyles";

type StateType = {|
    open: boolean,
    width?: number,
    top: number,
    left: number,
|};

const EMPTY_RECT = {height: 0, left: 0, top: 0, width: 0};

export class PopoverBase extends React.Component<PopoverPropsType, StateType> {
    rootRef = React.createRef();

    popupRef = React.createRef();

    static defaultProps = {
        anchorOrigin: {
            horizontal: "left",
            vertical: "bottom",
        },
        container: document.body,
        hideBackdrop: true,
        hideOnResize: true,
        onChangeOpen: noop,
        onClickOutside: noop,
        tabFocusable: true,
        transformOrigin: {
            horizontal: "left",
            vertical: "top",
        },
    };

    state = {
        left: 0,
        open: false,
        top: 0,
        width: undefined,
    };

    unmounted = false;

    isMouseDownPopover = false;

    componentDidUpdate(prevProps: PopoverPropsType) {
        if (!this.unmounted) {
            const {current} = this.rootRef;

            if (current && this.state.open && this.state.width !== current.offsetWidth) {
                this.setState({width: current.offsetWidth});
            }

            if (!prevProps.open && this.props.open) {
                this.handleOpen();
            }

            if (prevProps.open && !this.props.open) {
                this.handleClose();
            }
        }
    }

    componentWillUnmount() {
        this.unmounted = true;
        this.handleClose();
    }

    getOffsetContainer = ({containerRect, current, left, top}: any) => {
        const {current: popupEl} = this.popupRef;
        const {anchorOrigin, transformOrigin} = this.props;
        const anchorRect = current.getBoundingClientRect();
        const popoverRect = popupEl ? popupEl.getBoundingClientRect() : EMPTY_RECT;
        const leftPopover =
            left +
            getOffsetLeft(anchorRect, anchorOrigin.horizontal) -
            getOffsetLeft(popoverRect, transformOrigin.horizontal);
        const topPopover =
            top + getOffsetTop(anchorRect, anchorOrigin.vertical) - getOffsetTop(popoverRect, transformOrigin.vertical);

        return {
            left: leftPopover - getDiffWindowLeft(leftPopover, popoverRect, containerRect),
            top: topPopover - getDiffWindowTop(topPopover, popoverRect, containerRect),
        };
    };

    handleOpen = () => {
        const {container, pageStore, hideOnScroll, disableOutsideClose} = this.props;

        if (container && !disableOutsideClose) {
            container.addEventListener("mousedown", this.handleOutsideClick);
        }

        if (pageStore && hideOnScroll) {
            pageStore.addScrollEvent(this.handleClose);
        }

        window.addEventListener("resize", this.handleResize);

        this.setState({open: true});
    };

    handleClose = () => {
        const {container, pageStore, hideOnScroll, disableOutsideClose} = this.props;

        if (container && !disableOutsideClose) {
            container.removeEventListener("mousedown", this.handleOutsideClick);
        }

        if (pageStore && hideOnScroll) {
            pageStore.removeScrollEvent(this.handleClose);
        }

        window.removeEventListener("resize", this.handleResize);

        if (!this.unmounted) {
            this.setState({left: 0, open: false, top: 0});
            this.props.onChangeOpen(false);
        }
    };

    handleCalculateOffset = () => {
        const {container} = this.props;
        const {current} = this.rootRef;
        const {left, top} = getAbsoluteOffsetFromGivenElement(current, container);
        const containerRect = container ? container.getBoundingClientRect() : EMPTY_RECT;

        if (current) {
            this.setState(this.getOffsetContainer({containerRect, current, left, top}));
        } else {
            this.setState({left, top});
        }
    };

    handleResize = () => {
        if (this.props.hideOnResize) {
            this.handleClose();
        } else {
            const {current} = this.rootRef;

            this.handleCalculateOffset();

            if (current) {
                this.setState({width: current.offsetWidth});
            }
        }
    };

    handleKeyDown = (event: KeyboardEvent) => {
        if (keycode(event) === "esc") {
            this.handleEscapeKeyDown();
        }
    };

    handleOutsideClick = (event: MouseEvent) => {
        setTimeout(() => {
            const {current: rootEl} = this.rootRef;
            const {current: popupEl} = this.popupRef;

            /*
             * При клике на лоадер окно считается что идет outside click.
             * если будут проблемы, нужно добавить проверку на pageStore.isLoading.
             */
            switch (true) {
                case this.isMouseDownPopover:
                case rootEl && rootEl.contains(event.target):
                case popupEl && popupEl.contains(event.target):
                    break;
                default:
                    this.handleClose();
                    this.props.onClickOutside();
            }

            this.isMouseDownPopover = false;
        }, 0);
    };

    handleEscapeKeyDown = () => {
        const {open} = this.state;
        const {disableEscapeKeyDown} = this.props;

        if (!disableEscapeKeyDown && open) {
            this.handleClose();
        }
    };

    handleEntering = () => {
        this.handleCalculateOffset();
        this.props.onChangeOpen(true);
    };

    handleExiting = () => {
        this.props.onChangeOpen(false);
    };

    handleMouseDownPopover = () => {
        if (this.state.open) {
            this.isMouseDownPopover = true;
        }
    };

    render() {
        const {left, top, open} = this.state;
        const {
            popoverContent,
            children,
            onOpen = this.handleOpen,
            paperClassName,
            container,
            hideBackdrop,
            width = this.state.width,
            classes,
            restoreFocusedElement,
            focusableMount,
            dataPageObjectPopover,
            tabFocusable,
        } = this.props;

        const popup = (
            <React.Fragment>
                {hideBackdrop ? null : <Backdrop open className={classes.popoverBackdrop} />}

                <div
                    ref={this.popupRef}
                    className={classes.popoverRoot}
                    style={{left, top}}
                    data-page-object={dataPageObjectPopover}
                    onKeyDown={this.handleKeyDown}
                >
                    <Grow
                        appear
                        in
                        onEntering={this.handleEntering}
                        onExiting={this.handleExiting}
                        timeout={ANIMATION_TIMEOUT}
                    >
                        <FocusableArrow
                            tabFocusable={tabFocusable}
                            focusableMount={focusableMount}
                            restoreFocusedElement={restoreFocusedElement}
                        >
                            <Paper className={paperClassName} style={{width}}>
                                {isFunction(popoverContent)
                                    ? popoverContent({onClose: this.handleClose, onOpen, open})
                                    : popoverContent}
                            </Paper>
                        </FocusableArrow>
                    </Grow>
                </div>
            </React.Fragment>
        );

        return (
            <div ref={this.rootRef} onMouseDown={this.handleMouseDownPopover}>
                {isFunction(children) ? children({onClose: this.handleClose, onOpen, open}) : children}
                {open && container ? createPortal(popup, container) : null}
            </div>
        );
    }
}

export default withStyles(styles, {name: "EssencePopover"})(PopoverBase);
