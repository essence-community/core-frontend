// @flow
import * as React from "react";
import {withStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import {type ApplicationModelType} from "../../../Stores/ApplicationModel";
import styles from "./NotificationsTabsStyles";
import NotificationsTab from "./NotificationsTab";

export type ValueType = "all" | "info" | "error" | "warning" | "notification" | "debug";

type PropsType = {
    applicationStore: ApplicationModelType,
    classes?: Object,
    value: ValueType,
    onChangeTab: (value: ValueType) => void,
};

const ACTIONS_VIEW = 499;

const NotificationsTabs = ({applicationStore, classes = {}, value, onChangeTab}: PropsType) => (
    <Grid container spacing={0} className={classes.root}>
        <NotificationsTab classes={classes} value="all" selectedValue={value} onChangeTab={onChangeTab} label="Все" />
        <NotificationsTab
            classes={classes}
            value="info"
            selectedValue={value}
            onChangeTab={onChangeTab}
            label="Информация"
        />
        <NotificationsTab
            classes={classes}
            value="error"
            selectedValue={value}
            onChangeTab={onChangeTab}
            label="Ошибки"
        />
        <NotificationsTab
            classes={classes}
            value="warning"
            selectedValue={value}
            onChangeTab={onChangeTab}
            label="Предупреждения"
        />
        <NotificationsTab
            classes={classes}
            value="notification"
            selectedValue={value}
            onChangeTab={onChangeTab}
            label="Оповещения"
        />
        {applicationStore.caActions.indexOf(ACTIONS_VIEW) > -1 ? (
            <NotificationsTab
                classes={classes}
                value="debug"
                selectedValue={value}
                onChangeTab={onChangeTab}
                label="Разработка"
            />
        ) : null}
    </Grid>
);

export default withStyles(styles)(NotificationsTabs);
