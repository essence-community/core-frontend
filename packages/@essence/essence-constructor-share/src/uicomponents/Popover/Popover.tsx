import * as React from "react";
import {createPortal} from "react-dom";
import {noop, isFunction} from "../../utils/functions";
import {getAbsoluteOffsetFromGivenElement} from "../../utils/browser";
import {IPopoverProps, IOffset, IPopoverAnchorOrigin, IPopoverTransfromOrigin} from "./Popover.types";
import {getOffsetContainer} from "./Popover.utils";
import {PopoverContent} from "./PopoverContent";

const STYLE_DEFAULT = {left: 0, top: 0};
const ANCHOR_ORIGIN: IPopoverAnchorOrigin = {
    horizontal: "left",
    vertical: "bottom",
};
const TRANSFORM_ORIGIN: IPopoverTransfromOrigin = {
    horizontal: "left",
    vertical: "top",
};

// eslint-disable-next-line max-lines-per-function
export const Popover: React.FC<IPopoverProps> = React.memo((props) => {
    const {
        anchorOrigin = ANCHOR_ORIGIN,
        hideBackdrop = true,
        hideOnResize = true,
        onChangeOpen = noop,
        onClickOutside = noop,
        tabFocusable = true,
        transformOrigin = TRANSFORM_ORIGIN,
    } = props;
    const container = props.container || document.body;
    const rootRef = React.useRef<HTMLDivElement>(null);
    const popupRef = React.useRef<HTMLDivElement>(null);
    const [width, setWidth] = React.useState<number>(0);
    const [style, setStyle] = React.useState<IOffset>(STYLE_DEFAULT);
    const [isOpen, setIsOpen] = React.useState(false);
    const isMouseDownPopover = React.useRef(false);

    const handleClose = React.useCallback(() => {
        setIsOpen(false);
        setStyle({left: 0, top: 0});
        onChangeOpen(false);
    }, [onChangeOpen]);

    const handleOpen = React.useCallback(() => {
        setIsOpen(true);
        onChangeOpen(true);
    }, [onChangeOpen]);

    const handleCalculateOffset = React.useCallback(() => {
        const {current: rootElement} = rootRef;
        let newPosition: IOffset = getAbsoluteOffsetFromGivenElement(rootElement, container);

        if (rootElement) {
            newPosition = getOffsetContainer({
                ...newPosition,
                anchorOrigin,
                container,
                popupEl: popupRef.current,
                rootEl: rootElement,
                transformOrigin,
            });
        }

        setStyle((prevStyle) => {
            if (
                prevStyle.left !== newPosition.left ||
                prevStyle.top !== newPosition.top ||
                prevStyle.bottom !== newPosition.bottom
            ) {
                return newPosition;
            }

            return prevStyle;
        });
    }, [anchorOrigin, container, transformOrigin]);

    const handleEntering = () => {
        handleCalculateOffset();
    };

    const handleResize = React.useCallback(() => {
        if (hideOnResize) {
            handleClose();
        } else {
            const {current} = rootRef;

            handleCalculateOffset();

            if (current && !props.width) {
                setWidth(current.offsetWidth);
            }
        }
    }, [handleCalculateOffset, handleClose, hideOnResize, props.width]);

    const handleOutsideClick = React.useCallback(
        (event: UIEvent) => {
            requestAnimationFrame(() => {
                const {target} = event;
                const {current: rootEl} = rootRef;
                const {current: popupEl} = popupRef;

                if (target instanceof Node) {
                    /*
                     * При клике на лоадер окно считается что идет outside click.
                     * если будут проблемы, нужно добавить проверку на pageStore.isLoading.
                     */
                    switch (true) {
                        case isMouseDownPopover.current:
                        case rootEl && rootEl.contains(target):
                        case popupEl && popupEl.contains(target):
                            break;
                        default:
                            handleClose();
                            onClickOutside();
                    }

                    isMouseDownPopover.current = false;
                }
            });
        },
        [handleClose, onClickOutside],
    );

    const handleMouseDownPopover = () => {
        if (isOpen) {
            isMouseDownPopover.current = true;
        }
    };

    const handleEscapeKeyDown = () => {
        if (!props.disableEscapeKeyDown && isOpen) {
            handleClose();
        }
    };

    React.useEffect(() => {
        if (isOpen) {
            if (container && !props.disableOutsideClose) {
                container.addEventListener("mousedown", handleOutsideClick);
            }

            if (props.pageStore && props.hideOnScroll) {
                props.pageStore.addScrollEvent(handleClose);
            }

            window.addEventListener("resize", handleResize);
        }

        return () => {
            if (isOpen) {
                if (container && !props.disableOutsideClose) {
                    container.removeEventListener("mousedown", handleOutsideClick);
                }

                if (props.pageStore && props.hideOnScroll) {
                    props.pageStore.removeScrollEvent(handleClose);
                }

                window.removeEventListener("resize", handleResize);
            }
        };
    }, [
        container,
        handleClose,
        handleOutsideClick,
        handleResize,
        isOpen,
        props.disableOutsideClose,
        props.hideOnScroll,
        props.pageStore,
    ]);

    React.useEffect(() => {
        const {current} = rootRef;

        if (current && isOpen && width !== current.offsetWidth) {
            setWidth(current.offsetWidth);
        }
    }, [isOpen, width]);

    return (
        <div ref={rootRef} onMouseDown={handleMouseDownPopover} onBlur={props.onBlur}>
            {isFunction(props.children)
                ? props.children({
                      height: style.height,
                      onCalculateOffset: handleCalculateOffset,
                      onClose: handleClose,
                      onOpen: handleOpen,
                      open: isOpen,
                      position: style.bottom ? "top" : "bottom",
                  })
                : props.children}
            {isOpen && container
                ? createPortal(
                      <PopoverContent
                          ref={popupRef}
                          styleOffset={style}
                          open={isOpen}
                          hideBackdrop={hideBackdrop}
                          dataPageObjectPopover={props.dataPageObjectPopover}
                          container={container}
                          disableEscapeKeyDown={props.disableEscapeKeyDown}
                          tabFocusable={tabFocusable}
                          focusableMount={props.focusableMount}
                          restoreFocusedElement={props.restoreFocusedElement}
                          width={props.width || width}
                          onOpen={handleOpen}
                          onEntering={handleEntering}
                          onClose={handleClose}
                          onCalculateOffset={handleCalculateOffset}
                          onEscapeKeyDown={handleEscapeKeyDown}
                          paperClassName={props.paperClassName}
                          popoverContent={props.popoverContent}
                          disableFocusableArrow={props.disableFocusableArrow}
                      />,
                      container,
                  )
                : null}
        </div>
    );
});

Popover.defaultProps = {
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
