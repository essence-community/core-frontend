import * as React from "react";
import {useObserver} from "mobx-react";
import cn from "clsx";
import {Grid, Grow, Paper, CircularProgress} from "@material-ui/core";
import {Icon} from "@essence-community/constructor-share/Icon";
import {useTranslation, toTranslateText} from "@essence-community/constructor-share/utils";
import {SnackbarContentText} from "@essence-community/constructor-share/uicomponents";
import {SnackbarStatus, ISnackbar} from "@essence-community/constructor-share/types";
import {ProgressBar} from "../ProgressBar";
import {useStyles} from "./SnackbarContent.styles";

const statusTitle: Record<SnackbarStatus, string> = {
    all: "",
    block: "static:cad7307902954c1b92b626e42da53aa3",
    debug: "static:4fdb2cdb2e5047048da10f9dbe83188d",
    error: "static:c80abfb5b59c400ca1f8f9e868e4c761",
    errorUpload: "static:cecc548fc7444813a3d00eb7bb067a3f",
    info: "static:627518f4034947aa9989507c5688cfff",
    notification: "static:ea8035aada054aa1838afbda9d0c39ae",
    progress: "static:ad39828554114893872302a0aaa031af",
    unblock: "static:d22b1f7a48b9402e9c0c17b508c5a906",
    uploaded: "",
    warning: "static:e6f8166771e04b849855254c5d926ff6",
};

const statusIcon: Record<SnackbarStatus, string> = {
    all: "",
    block: "lock",
    debug: "",
    error: "times-circle",
    errorUpload: "times-circle",
    info: "exclamation-triangle",
    notification: "",
    progress: "spinner",
    unblock: "unlock",
    uploaded: "check",
    warning: "exclamation-triangle",
};

interface ISnackbarContentProps {
    snackbar: ISnackbar;
    onClose(snakebarId: ISnackbar["id"]): void;
    onSetCloseble(snakebarId: ISnackbar["id"]): void;
}

export const SnackbarContent: React.FC<ISnackbarContentProps> = (props) => {
    const {onClose, snackbar, onSetCloseble} = props;
    const {code, status, text, description, title} = snackbar;
    const [trans] = useTranslation("meta");
    const classes = useStyles();

    const handleClickClose = React.useCallback(() => {
        onSetCloseble(snackbar.id);
    }, [onSetCloseble, snackbar.id]);

    React.useEffect(() => {
        if (snackbar.autoHidden) {
            const timeout = setTimeout(handleClickClose, snackbar.hiddenTimeout);

            return () => {
                clearTimeout(timeout);
            };
        }

        return undefined;
    }, [handleClickClose, snackbar.autoHidden, snackbar.hiddenTimeout]);

    const handleClose = () => {
        onClose(snackbar.id);
    };

    const getSnackbarTitle = () => {
        if (title) {
            return `${trans(statusTitle[status])} ${toTranslateText(trans, title)}`;
        }

        return trans(statusTitle[status]);
    };

    const titleTrans = getSnackbarTitle();

    return useObserver(() => (
        <Grow in={snackbar.open} onExited={handleClose}>
            <Paper className={classes.paper} elevation={8}>
                <Grid container className={classes.header}>
                    <Grid
                        item
                        className={cn(classes.title, classes[`title-${status}` as keyof typeof classes])}
                        data-qtip={titleTrans}
                    >
                        {status === "progress" ? (
                            <CircularProgress className={classes.headerIcon} size={16} />
                        ) : (
                            <Icon iconfont={statusIcon[status]} className={classes.headerIcon} />
                        )}
                        {titleTrans}
                    </Grid>
                    <Grid item>
                        <Icon iconfont="times" className={classes.closeIcon} onClick={handleClickClose} />
                    </Grid>
                </Grid>
                <div className={cn(classes.description, classes[`content-${status}` as keyof typeof classes])}>
                    {snackbar.type === "msg" ? (
                        <SnackbarContentText text={text} description={description} code={code} />
                    ) : (
                        <ProgressBar snackbar={snackbar} progressCount={snackbar.progressStore?.progressCount} />
                    )}
                </div>
            </Paper>
        </Grow>
    ));
};
