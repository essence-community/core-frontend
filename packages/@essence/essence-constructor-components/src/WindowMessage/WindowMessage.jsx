// @flow
import * as React from "react";
import {withStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Dialog from "@material-ui/core/Dialog/Dialog";
import Button from "@material-ui/core/Button";
import DialogContent from "@material-ui/core/DialogContent";
import {Icon} from "@essence/essence-constructor-share/Icon";
import Scrollbars from "../Components/Scrollbars/Scrollbars";
import {type PageModelType} from "../stores/PageModel";
import Popover from "../Popover/Popover";
import styles from "./WindowMessageStyle";

type StatusType = "warning" | "error" | "info";

const statusIcons = {
    error: "question-circle",
    info: "question-circle",
    warning: "question-circle",
};

type PropsType = {
    classes: {
        [$Keys<$Call<typeof styles, any>>]: string,
    },
    component?: React.Node,
    status: StatusType,
    open: boolean,
    title: string,
    children: string | React.Node,
    textAccept: string,
    textDecline: string,
    onAccept: (event: SyntheticEvent<HTMLButtonElement>) => void,
    onDecline: (event: SyntheticEvent<HTMLButtonElement>) => void,
    popover?: boolean,
    popoverNode?: React.Node,
    popoverProps?: Object,
    pageStore: PageModelType,
    hideBackdrop: boolean,
    ckPageObject: string,
    maxWidth?: "xs" | "sm" | "md",
    disableRestoreFocus?: boolean,
};

const anchorOrigin = {
    horizontal: "right",
    vertical: "center",
};

const transformOrigin = {
    horizontal: "left",
    vertical: "center",
};

const WindowMessage = ({
    children,
    textAccept,
    textDecline,
    onAccept,
    onDecline,
    status,
    open,
    classes,
    popover,
    popoverNode,
    popoverProps,
    pageStore,
    hideBackdrop,
    ckPageObject,
    maxWidth,
    disableRestoreFocus,
}: PropsType) => {
    const content = (
        <React.Fragment>
            <DialogContent className={classes.rootContent}>
                <Grid container alignItems="center" spacing={16} wrap="nowrap">
                    <Grid item>
                        <Icon iconfont={statusIcons[status]} size="2x" color="grey" />
                    </Grid>
                    <Grid item className={classes.content} xs zeroMinWidth>
                        <Scrollbars autoHeight autoHeightMax={180} pageStore={pageStore}>
                            {children}
                        </Scrollbars>
                    </Grid>
                </Grid>
            </DialogContent>
            <div className={classes.rootActions}>
                <Grid container justify="flex-end" spacing={8}>
                    <Grid item>
                        <Button
                            onClick={onAccept}
                            color="primary"
                            variant="contained"
                            disableRipple
                            disableFocusRipple
                            data-page-object={`${ckPageObject}-accept`}
                            autoFocus
                        >
                            {textAccept}
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button
                            onClick={onDecline}
                            color="secondary"
                            variant="contained"
                            disableRipple
                            disableFocusRipple
                            data-page-object={`${ckPageObject}-decline`}
                        >
                            {textDecline}
                        </Button>
                    </Grid>
                </Grid>
            </div>
        </React.Fragment>
    );

    if (popover) {
        return (
            <Popover
                open={open}
                width={250}
                popoverContent={content}
                anchorOrigin={anchorOrigin}
                transformOrigin={transformOrigin}
                container={pageStore.pageEl}
                disableRestoreFocus={disableRestoreFocus}
                hideBackdrop={hideBackdrop}
                disableEscapeKeyDown
                disableOutsideClose
                hideOnResize={false}
                {...popoverProps}
            >
                {popoverNode}
            </Popover>
        );
    }

    return (
        <Dialog
            open={open}
            container={pageStore.pageEl}
            maxWidth={maxWidth || "sm"}
            classes={{
                paper: classes.rootDialog,
                paperWidthMd: classes.rootDialogWidthMd,
                paperWidthSm: classes.rootDialogWidthSm,
            }}
            hideBackdrop={hideBackdrop}
            disableRestoreFocus={disableRestoreFocus}
        >
            {content}
        </Dialog>
    );
};

WindowMessage.defaultProps = {
    children: "Отменить?",
    hideBackdrop: true,
    status: "info",
    textAccept: "Да",
    textDecline: "Нет",
    title: "Подтверждение",
};

export default withStyles(styles)(WindowMessage);
