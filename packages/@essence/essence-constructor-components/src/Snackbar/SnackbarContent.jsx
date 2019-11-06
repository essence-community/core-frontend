// @flow
import * as React from "react";
import cn from "classnames";
import {compose} from "recompose";
import {observer} from "mobx-react";
import {Grid, Grow, Paper, CircularProgress} from "@material-ui/core";
import {withStyles} from "@material-ui/core/styles";
import capitalize from "lodash/capitalize";
import {Icon} from "@essence/essence-constructor-share/Icon";
import ProgressBar from "../Components/ProgressBar/ProgressBar";
import type {ProgressModelType} from "../stores/ProgressModel/ProgressModel";
import {SnackbarContentDarkStyle} from "./Styles/SnackbarContentDarkStyle";
import SnackbarContentText from "./SnackbarContentText";

const styles = SnackbarContentDarkStyle;

const statusTitle = {
    block: "Блокировка",
    debug: "Отладка",
    error: "Ошибка",
    errorUpload: "Ошибка загрузки",
    info: "Информация",
    notification: "",
    progress: "Загрузка",
    unblock: "Снятие блокировки",
    uploaded: "Загружено",
    warning: "Предупреждение",
};

const statusIcon = {
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

type PropsType = {|
    classes?: Object,
    snackbar: {
        open: boolean,
        status: any,
        text: string,
        description: string,
        code: string,
        title: string,
        id: number | string,
        autoHidden: boolean,
        hiddenTimeout: number,
        type: "msg" | "progress",
        progressStore: ProgressModelType,
    },
    onClose: (snakebarId: number | string) => void,
    onSetCloseble: (snakebarId: number | string) => void,
|};

class SnackbarContent extends React.Component<PropsType> {
    static deaultProps = {
        autoHidden: false,
        hiddenTimeout: 20000,
        onClose: () => null,
    };

    timeout: TimeoutID;

    componentDidMount() {
        const {autoHidden, hiddenTimeout} = this.props.snackbar;

        if (autoHidden) {
            this.timeout = setTimeout(this.handleClickClose, hiddenTimeout);
        }
    }

    componentWillUnmount() {
        clearTimeout(this.timeout);
    }

    handleClickClose = () => {
        this.props.onSetCloseble(this.props.snackbar.id);
    };

    handleClose = () => {
        this.props.onClose(this.props.snackbar.id);
    };

    render() {
        const {snackbar, classes = {}} = this.props;
        const {code, status, text, description} = snackbar;
        const capitalizeStatus = capitalize(status);
        const title = snackbar.title ? `${statusTitle[status]} ${snackbar.title}` : statusTitle[status];

        return (
            <Grow in={snackbar.open} onExited={this.handleClose}>
                <Paper className={classes.paper} elevation={8}>
                    <Grid container className={classes.header}>
                        <Grid item className={cn(classes.title, classes[`title${capitalizeStatus}`])} data-qtip={title}>
                            {status === "progress" ? (
                                <CircularProgress className={classes.headerIcon} size={16} />
                            ) : (
                                <Icon
                                    iconfont={statusIcon[status]}
                                    className={cn(classes.headerIcon, classes[`titleIcon${capitalizeStatus}`])}
                                />
                            )}
                            {title}
                        </Grid>
                        <Grid item>
                            <Icon iconfont="times" className={classes.closeIcon} onClick={this.handleClickClose} />
                        </Grid>
                    </Grid>
                    <div className={cn(classes[`content${capitalizeStatus}`])}>
                        {snackbar.type === "msg" ? (
                            <SnackbarContentText text={text} title={title} description={description} code={code} />
                        ) : (
                            <ProgressBar
                                status={snackbar.status}
                                progressCount={snackbar.progressStore.progressCount}
                            />
                        )}
                    </div>
                </Paper>
            </Grow>
        );
    }
}

export default compose(
    withStyles(styles),
    observer,
)(SnackbarContent);
