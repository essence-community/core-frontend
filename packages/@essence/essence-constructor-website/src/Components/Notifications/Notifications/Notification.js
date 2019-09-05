// @flow
import * as React from "react";
import {observer} from "mobx-react";
import ButtonBase from "@material-ui/core/ButtonBase";
import cn from "classnames";
import Grid from "@material-ui/core/Grid";
import {SnackbarContentText} from "@essence/essence-constructor-components";
import {Icon} from "@essence/essence-constructor-share/Icon";

type PropsType = {|
    classes: {
        notificationContent: string,
        notificationContentData: string,
        notificationHeader: string,
        notificationRoot: string,
        dot: string,
        clearButton: string,
        pageName: string,
    },
    snackbar: Object,
    snackbarStore: Object,
|};

const statuses = {
    errorUpload: "Неуспешно",
    progress: "Загрузка",
    uploaded: "Успешно",
};

class Notification extends React.Component<PropsType> {
    handleDelete = () => {
        const {snackbarStore, snackbar} = this.props;

        snackbarStore.deleteSnackbarAction(snackbar.id);
    };

    handleRead = () => {
        const {snackbarStore, snackbar} = this.props;

        snackbarStore.readSnackbarAction(snackbar.id);
    };

    render() {
        const {classes = {}, snackbar} = this.props;

        return (
            <div
                className={classes.notificationRoot}
                onMouseEnter={snackbar.read === false ? this.handleRead : undefined}
            >
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
                            onClick={this.handleDelete}
                            className={classes.clearButton}
                            disableRipple
                            disableFocusRipple
                            data-qtip="Удалить"
                            data-page-object={`snackbar-remove-${snackbar.id}`}
                        >
                            <Icon iconfont="times" iconfontname="fa" size="1x" />
                        </ButtonBase>
                    </Grid>
                </Grid>
                <div className={cn(classes.notificationContent, classes.notificationContentData)}>
                    <SnackbarContentText
                        text={snackbar.text}
                        title={snackbar.title}
                        description={snackbar.description}
                        code={snackbar.code}
                    />
                </div>
            </div>
        );
    }
}

export default observer(Notification);
