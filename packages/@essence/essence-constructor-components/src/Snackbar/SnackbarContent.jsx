// @flow
import * as React from "react";
import cn from "classnames";
import {compose} from "recompose";
import {observer} from "mobx-react";
import {Grid, Grow, Paper, CircularProgress} from "@material-ui/core";
import {withStyles} from "@material-ui/core/styles";
import capitalize from "lodash/capitalize";
import {Icon} from "@essence-community/constructor-share/Icon";
import {withTranslation, WithT} from "@essence-community/constructor-share/utils";
import ProgressBar from "../Components/ProgressBar/ProgressBar";
import type {ProgressModelType} from "../stores/ProgressModel/ProgressModel";
import {SnackbarContentDarkStyle} from "./Styles/SnackbarContentDarkStyle";
import SnackbarContentText from "./SnackbarContentText";

const styles = SnackbarContentDarkStyle;

const statusTitle = {
    block: "static:cad7307902954c1b92b626e42da53aa3",
    debug: "static:4fdb2cdb2e5047048da10f9dbe83188d",
    error: "static:c80abfb5b59c400ca1f8f9e868e4c761",
    errorUpload: "static:cecc548fc7444813a3d00eb7bb067a3f",
    info: "static:627518f4034947aa9989507c5688cfff",
    notification: "",
    progress: "static:ad39828554114893872302a0aaa031af",
    unblock: "static:d22b1f7a48b9402e9c0c17b508c5a906",
    uploaded: "static:179cc83540e94b87a8d8aff919552f22",
    warning: "static:e6f8166771e04b849855254c5d926ff6",
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

type PropsType = WithT & {|
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
        // eslint-disable-next-line id-length
        const {snackbar, classes = {}, t} = this.props;
        const {code, status, text, description} = snackbar;
        const capitalizeStatus = capitalize(status);
        const title = snackbar.title ? `${t(statusTitle[status])} ${t(snackbar.title)}` : t(statusTitle[status]);

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
                    <div className={cn(classes.description, classes[`content${capitalizeStatus}`])}>
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

export default compose(withTranslation("meta"), withStyles(styles), observer)(SnackbarContent);
