import * as React from "react";
import {Backdrop, Modal, Grow, Paper} from "@mui/material";
import {FocusableArrow} from "../FocusableArrow";
import {ANIMATION_TIMEOUT} from "../../constants";
import {isFunction} from "../../utils/functions";
import {useStyles} from "./PopoverContent.styles";
import {IPopoverContentProps} from "./Popover.types";

export const PopoverContent: React.FC<IPopoverContentProps> = React.forwardRef<HTMLDivElement, IPopoverContentProps>(
    function PopoverContent(props: IPopoverContentProps, ref) {
        const classes = useStyles(props);
        const style: React.CSSProperties = {
            bottom: "auto",
            position: "absolute",
            right: "auto",
            ...props.styleOffset,
        };
        const content = React.useMemo(
            () => (
                <Paper className={props.paperClassName} sx={{width: props.width}}>
                    {isFunction(props.popoverContent)
                        ? props.popoverContent({
                              height: props.styleOffset.height,
                              onCalculateOffset: props.onCalculateOffset,
                              onClose: props.onClose,
                              onOpen: props.onOpen,
                              open: props.open,
                              position: props.styleOffset.bottom ? "top" : "bottom",
                          })
                        : props.popoverContent}
                </Paper>
            ),
            [props],
        );

        return (
            <React.Fragment>
                {props.hideBackdrop ? null : <Backdrop open className={classes.popoverBackdrop} />}

                <Modal
                    open
                    className={classes.popoverRoot}
                    style={style}
                    data-page-object={props.dataPageObjectPopover}
                    hideBackdrop
                    container={props.container}
                    disableRestoreFocus
                    disableAutoFocus
                    disableEnforceFocus
                    closeAfterTransition
                    disableEscapeKeyDown={props.disableEscapeKeyDown}
                    onKeyDown={props.onKeyDown}
                >
                    <div ref={ref}>
                        <React.Suspense fallback={null}>
                            <Grow appear in onEntering={props.onEntering} timeout={ANIMATION_TIMEOUT}>
                                {props.disableFocusableArrow ? (
                                    content
                                ) : (
                                    <div>
                                        <FocusableArrow
                                            tabFocusable={props.tabFocusable}
                                            focusableMount={props.focusableMount}
                                            restoreFocusedElement={props.restoreFocusedElement}
                                        >
                                            {content}
                                        </FocusableArrow>
                                    </div>
                                )}
                            </Grow>
                        </React.Suspense>
                    </div>
                </Modal>
            </React.Fragment>
        );
    },
);
