import {Icon, ISnackbar, ISnackbarModel} from "@essence/essence-constructor-share";
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
    errorUpload: "Неуспешно";
    progress: "Загрузка";
    uploaded: "Успешно";
    [key: string]: string;
}
const statuses: IFileStatus = {
    errorUpload: "Неуспешно",
    progress: "Загрузка",
    uploaded: "Успешно",
};

export const Notification: React.FC<INotificationProps> = (props) => {
    const {snackbarStore, snackbar} = props;
    const classes = useStyles(props);

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
                <Grid item data-qtip={snackbar.createdAt} style={{paddingRight: 10}}>
                    {snackbar.createdAt}
                </Grid>
                {snackbar.status && statuses[snackbar.status] ? (
                    <Grid item data-qtip={snackbar.createdAt} style={{paddingRight: 10}}>
                        {statuses[snackbar.status]}
                    </Grid>
                ) : null}
                <Grid item className={classes.pageName} data-qtip={snackbar.pageName}>
                    {snackbar.pageName}
                </Grid>
                <Grid item>
                    <ButtonBase
                        onClick={handleDelete}
                        className={classes.clearButton}
                        disableRipple
                        data-qtip="Удалить"
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
