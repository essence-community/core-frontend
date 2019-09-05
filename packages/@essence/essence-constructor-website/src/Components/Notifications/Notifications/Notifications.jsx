// @flow
import * as React from "react";
import ButtonBase from "@material-ui/core/ButtonBase";
import {compose} from "recompose";
import Grid from "@material-ui/core/Grid";
import {inject, observer} from "mobx-react";
import {Scrollbars} from "@essence/essence-constructor-components";
import {Icon} from "@essence/essence-constructor-share/Icon";
import {withStyles} from "@material-ui/core/styles";
import NotificationsTabs from "../NotificationsTabs/NotificationsTabs";
import {type ApplicationModelType} from "../../../Stores/ApplicationModel";
import Notification from "./Notification";
import NotificationsReadButton from "./NotificationsReadButton";
import styles from "./NotificationsStyles";

type StoresPropsType = {
    applicationStore: ApplicationModelType,
};
type OwnPropsType = {
    classes: Object,
};
type PropsType = StoresPropsType & OwnPropsType;

const mapStoresToProps = (stores: Object): StoresPropsType => ({
    applicationStore: stores.applicationStore,
});

const SCROLLBARS_STYLE = {
    height: "calc(100% - 70px)",
};

class Notifications extends React.Component<PropsType> {
    render() {
        const {
            applicationStore: {snackbarStore},
            classes,
        } = this.props;

        return (
            <div className={classes.root}>
                <NotificationsTabs
                    applicationStore={this.props.applicationStore}
                    value={snackbarStore.activeStatus}
                    onChangeTab={snackbarStore.setStatusAction}
                />
                <Scrollbars style={SCROLLBARS_STYLE}>
                    {snackbarStore.snackbarsInStatus.map((snackbar) => (
                        <Notification
                            key={snackbar.id}
                            classes={{
                                clearButton: classes.clearButton,
                                dot: classes.dot,
                                notificationContent: classes.notificationContent,
                                notificationContentData: classes[`notificationContent-${snackbar.status}`],
                                notificationHeader: classes.notificationHeader,
                                notificationRoot: classes.notificationRoot,
                                pageName: classes.pageName,
                            }}
                            snackbar={snackbar}
                            snackbarStore={snackbarStore}
                        />
                    ))}
                </Scrollbars>
                <Grid container spacing={0} direction="row" wrap="nowrap" className={classes.bottomBar}>
                    <Grid item>
                        <ButtonBase
                            onClick={snackbarStore.deleteAllSnackbarAction}
                            classes={{
                                disabled: classes.disabledBtn,
                                root: classes.btn,
                            }}
                            disabled={!snackbarStore.snackbarsInStatus.length}
                            disableRipple
                            disableFocusRipple
                            data-qtip="Очистить все"
                            data-page-object={"snackbar-remove-all"}
                        >
                            <Icon iconfont="trash-o" iconfontname="fa" size="2x" />
                        </ButtonBase>
                    </Grid>
                    <Grid item>
                        <NotificationsReadButton
                            snackbarStore={snackbarStore}
                            classes={{
                                badge: classes.badge,
                                badgeDisabled: classes.badgeDisabled,
                                btn: classes.btn,
                                disabledBtn: classes.disabledBtn,
                            }}
                        />
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default compose(
    inject(mapStoresToProps),
    withStyles(styles),
    observer,
)(Notifications);
