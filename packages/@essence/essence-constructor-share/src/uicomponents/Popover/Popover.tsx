import * as React from "react";
import {createPortal} from "react-dom";
import {noop, isFunction} from "../../utils/functions";
import {getAbsoluteOffsetFromGivenElement} from "../../utils/browser";
import {IPopoverProps, IOffset} from "./Popover.types";
import {getOffsetContainer} from "./Popover.utils";
import {PopoverContent} from "./PopoverContent";

const STYLE_DEFAULT = {left: 0, top: 0};

// eslint-disable-next-line max-lines-per-function
export const Popover: React.FC<IPopoverProps> = React.memo((props) => {
    const {onChangeOpen, onClickOutside} = props;
    const rootRef = React.useRef<HTMLDivElement>();
    const popupRef = React.useRef<HTMLDivElement>();
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
        const {left, top} = getAbsoluteOffsetFromGivenElement(rootElement, props.container);

        if (rootElement) {
            setStyle(
                getOffsetContainer({
                    anchorOrigin: props.anchorOrigin,
                    container: props.container,
                    left,
                    popupEl: popupRef.current,
                    rootEl: rootElement,
                    top,
                    transformOrigin: props.transformOrigin,
                }),
            );
        } else {
            setStyle({left, top});
        }
    }, [props.anchorOrigin, props.container, props.transformOrigin]);

    const handleEntering = () => {
        handleCalculateOffset();
    };

    const handleResize = React.useCallback(() => {
        if (props.hideOnResize) {
            handleClose();
        } else {
            const {current} = rootRef;

            handleCalculateOffset();

            if (current) {
                setWidth(current.offsetWidth);
            }
        }
    }, [handleCalculateOffset, handleClose, props.hideOnResize]);

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
            if (props.container && !props.disableOutsideClose) {
                props.container.addEventListener("mousedown", handleOutsideClick);
            }

            if (props.pageStore && props.hideOnScroll) {
                props.pageStore.addScrollEvent(handleClose);
            }

            window.addEventListener("resize", handleResize);
        }

        return () => {
            if (isOpen) {
                if (props.container && !props.disableOutsideClose) {
                    props.container.removeEventListener("mousedown", handleOutsideClick);
                }

                if (props.pageStore && props.hideOnScroll) {
                    props.pageStore.removeScrollEvent(handleClose);
                }

                window.removeEventListener("resize", handleResize);
            }
        };
    }, [
        handleClose,
        handleOutsideClick,
        handleResize,
        isOpen,
        props.container,
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
                      onClose: handleClose,
                      onOpen: handleOpen,
                      open: isOpen,
                      position: style.bottom ? "top" : "bottom",
                  })
                : props.children}
            {isOpen && props.container
                ? createPortal(
                      <PopoverContent
                          ref={popupRef}
                          styleOffset={style}
                          open={isOpen}
                          hideBackdrop={props.hideBackdrop}
                          dataPageObjectPopover={props.dataPageObjectPopover}
                          container={props.container}
                          disableEscapeKeyDown={props.disableEscapeKeyDown}
                          tabFocusable={props.tabFocusable}
                          focusableMount={props.focusableMount}
                          restoreFocusedElement={props.restoreFocusedElement}
                          width={width}
                          onOpen={handleOpen}
                          onEntering={handleEntering}
                          onClose={handleClose}
                          onEscapeKeyDown={handleEscapeKeyDown}
                          paperClassName={props.paperClassName}
                          popoverContent={props.popoverContent}
                      />,
                      props.container,
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
