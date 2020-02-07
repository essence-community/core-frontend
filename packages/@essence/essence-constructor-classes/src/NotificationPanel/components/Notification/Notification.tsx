import {Icon, ISnackbar, ISnackbarModel} from "@essence-community/constructor-share";
import {useTranslation} from "@essence-community/constructor-share/utils";
import {ButtonBase, Grid} from "@material-ui/core";
import cn from "classnames";
import {useObserver} from "mobx-react-lite";
import * as React from "react";
import {SnackbarContentText} from "../SnackbarContentText/SnackbarContentText";
import {useStyles} from "./Notification.styles";

interface INotificationProps {
    snackbar: ISnackbar;
    snackbarStore: ISnackbarModel;
}
interface IFileStatus {
    errorUpload: string;
    progress: string;
    uploaded: string;
    [key: string]: string;
}
const statusesRead = (trans: any): IFileStatus => {
    return {
        errorUpload: trans("static:73de7f460cc04bc8a068429d66e684ce"),
        progress: trans("static:ad39828554114893872302a0aaa031af"),
        uploaded: trans("static:5454b0c6f64b41daab8deb88f948a4f1"),
    };
};

export const Notification: React.FC<INotificationProps> = (props) => {
    const {snackbarStore, snackbar} = props;
    const classes = useStyles(props);
    const [trans] = useTranslation("meta");
    const statuses = statusesRead(trans);
    const handleDelete = () => {
        snackbarStore.deleteSnackbarAction(snackbar.id);
    };

    const handleRead = () => {
        snackbarStore.readSnackbarAction(snackbar.id);
    };

    return useObserver(() => (
        <div className={classes.notificationRoot} onMouseEnter={snackbar.read === false ? handleRead : undefined}>
            {snackbar.read === false ? <span className={classes.dot} /> : null}
            <Grid container wrap="nowrap" justify="space-between" className={classes.notificationHeader}>
                <Grid item data-qtip={snackbar.createdAt} className={classes.notificationHeaderInfo}>
                    {snackbar.createdAt}
                </Grid>
                {snackbar.status && statuses[snackbar.status] ? (
                    <Grid item data-qtip={statuses[snackbar.status]} className={classes.notificationHeaderInfo}>
                        {statuses[snackbar.status]}
                    </Grid>
                ) : null}
                <Grid item className={classes.pageName} data-qtip={trans(snackbar.pageName)}>
                    {trans(snackbar.pageName)}
                </Grid>
                <Grid item>
                    <ButtonBase
                        onClick={handleDelete}
                        className={classes.clearButton}
                        disableRipple
                        data-qtip={trans("static:f7e324760ede4c88b4f11f0af26c9e97")}
                        data-page-object={`snackbar-remove-${snackbar.id}`}
                    >
                        <Icon iconfont="times" iconfontname="fa" size="1x" />
                    </ButtonBase>
                </Grid>
            </Grid>
            <div className={cn(classes.notificationContent, snackbar.status)}>
                <SnackbarContentText
                    text={snackbar.text}
                    title={snackbar.title}
                    description={snackbar.description}
                    code={snackbar.code}
                />
            </div>
        </div>
    ));
};
