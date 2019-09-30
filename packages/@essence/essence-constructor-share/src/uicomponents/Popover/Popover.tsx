import * as React from "react";
import {createPortal} from "react-dom";
import {noop, isFunction} from "../../utils/functions";
import {getAbsoluteOffsetFromGivenElement} from "../../utils/browser";
import {useIsOpen} from "./Popover.hooks";
import {IPopoverProps, IOffset} from "./Popover.types";
import {getOffsetContainer} from "./Popover.utils";
import {PopoverContent} from "./PopoverContent";

const STYLE_DEFAULT = {left: 0, top: 0};

export const Popover: React.FC<IPopoverProps> = React.memo((props) => {
    const rootRef = React.useRef<HTMLDivElement>();
    const popupRef = React.useRef<HTMLDivElement>();
    const [width, setWidth] = React.useState<number>(0);
    const [style, setStyle] = React.useState<IOffset>(STYLE_DEFAULT);
    let isMouseDownPopover = React.useMemo(() => false, []);

    const handleCalculateOffset = () => {
        const {container} = props;
        const {current: rootElement} = rootRef;
        const {left, top} = getAbsoluteOffsetFromGivenElement(rootElement, props.container);

        if (rootElement) {
            setStyle(
                getOffsetContainer({
                    anchorOrigin: props.anchorOrigin,
                    container,
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
    };

    const handleEntering = () => {
        handleCalculateOffset();
        props.onChangeOpen(true);
    };

    const handleExiting = () => {
        props.onChangeOpen(false);
    };

    const handleResize = React.useCallback(() => {
        if (props.hideOnResize) {
            // eslint-disable-next-line no-use-before-define, @typescript-eslint/no-use-before-define
            handleClose();
        } else {
            const {current} = rootRef;

            handleCalculateOffset();

            if (current) {
                setWidth(current.offsetWidth);
            }
        }
    }, []);

    const handleOutsideClick = React.useCallback((event: UIEvent) => {
        const {target} = event;
        const {current: rootEl} = rootRef;
        const {current: popupEl} = popupRef;

        if (target instanceof Node) {
            /*
             * При клике на лоадер окно считается что идет outside click.
             * если будут проблемы, нужно добавить проверку на pageStore.isLoading.
             */
            switch (true) {
                case isMouseDownPopover:
                case rootEl && rootEl.contains(target):
                case popupEl && popupEl.contains(target):
                    break;
                default:
                    // eslint-disable-next-line no-use-before-define, @typescript-eslint/no-use-before-define
                    handleClose();
                    props.onClickOutside();
            }

            isMouseDownPopover = false;
        }
    }, []);

    const [isOpen, handleOpen, handleClose] = useIsOpen({
        container: props.container,
        disableOutsideClose: props.disableOutsideClose,
        hideOnScroll: props.hideOnScroll,
        onChangeOpen: props.onChangeOpen,
        onOutsideClick: handleOutsideClick,
        onResize: handleResize,
        open: props.open,
        pageStore: props.pageStore,
        setStyle,
    });

    const handleMouseDownPopover = () => {
        if (isOpen) {
            isMouseDownPopover = true;
        }
    };

    const handleEscapeKeyDown = () => {
        if (!props.disableEscapeKeyDown && isOpen) {
            handleClose();
        }
    };

    React.useEffect(() => {
        const {current} = rootRef;

        if (current && (props.open || isOpen) && width !== current.offsetWidth) {
            setWidth(current.offsetWidth);
        }
    }, [props.open, isOpen]);

    return (
        <div ref={rootRef} onMouseDown={handleMouseDownPopover} onBlur={props.onBlur}>
            {isFunction(props.children)
                ? props.children({
                      onClose: handleClose,
                      onOpen: props.onOpen || handleOpen,
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
                          width={props.width || width}
                          onOpen={props.onOpen || handleOpen}
                          onEntering={handleEntering}
                          onExiting={handleExiting}
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
