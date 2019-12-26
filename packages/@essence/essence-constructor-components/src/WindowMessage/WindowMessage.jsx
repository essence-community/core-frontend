// @flow
import * as React from "react";
import {withStyles} from "@material-ui/core/styles";
import {Grid, Dialog, Button, DialogContent} from "@material-ui/core";
import {compose} from "recompose";
import {withTranslation, WithT} from "@essence/essence-constructor-share/utils";
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

// eslint-disable-next-line max-lines-per-function
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
    // eslint-disable-next-line id-length
    t,
}: PropsType & WithT) => {
    const content = (
        <React.Fragment>
            <DialogContent className={classes.rootContent}>
                <Grid container alignItems="center" spacing={2} wrap="nowrap">
                    <Grid item>
                        <Icon iconfont={statusIcons[status]} size="2x" color="grey" />
                    </Grid>
                    <Grid item className={classes.content} xs zeroMinWidth>
                        <Scrollbars autoHeight autoHeightMax={180} pageStore={pageStore}>
                            {typeof children === "string" ? t(children) : children}
                        </Scrollbars>
                    </Grid>
                </Grid>
            </DialogContent>
            <div className={classes.rootActions}>
                <Grid container justify="flex-end" spacing={1}>
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
                            {t(textAccept)}
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
                            {t(textDecline)}
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
            style={{position: "absolute"}}
            hideBackdrop={hideBackdrop}
            disableRestoreFocus={disableRestoreFocus}
        >
            {content}
        </Dialog>
    );
};

WindowMessage.defaultProps = {
    children: "static:9b475e25ae8a40b0b158543b84ba8c08",
    hideBackdrop: true,
    status: "info",
    textAccept: "static:dacf7ab025c344cb81b700cfcc50e403",
    textDecline: "static:f0e9877df106481eb257c2c04f8eb039",
    title: "static:ec238e2ccc1842d780b140a4bbedfdaf",
};

export default compose(withTranslation("meta"), withStyles(styles))(WindowMessage);
