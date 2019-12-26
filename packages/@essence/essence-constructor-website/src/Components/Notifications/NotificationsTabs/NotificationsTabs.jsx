// @flow
import * as React from "react";
import {withStyles} from "@material-ui/core/styles";
import {Grid} from "@material-ui/core";
import {WithT, withTranslation} from "@essence/essence-constructor-share/utils";
import {type ApplicationModelType} from "../../../Stores/ApplicationModel";
import styles from "./NotificationsTabsStyles";
import NotificationsTab from "./NotificationsTab";

export type ValueType = "all" | "info" | "error" | "warning" | "notification" | "debug";

type PropsType = WithT & {
    applicationStore: ApplicationModelType,
    classes?: Object,
    value: ValueType,
    onChangeTab: (value: ValueType) => void,
};

const ACTIONS_VIEW = 499;

// eslint-disable-next-line id-length
const NotificationsTabs = ({applicationStore, classes = {}, value, onChangeTab, t}: PropsType) => (
    <Grid container spacing={0} className={classes.root}>
        <NotificationsTab
            classes={classes}
            value="all"
            selectedValue={value}
            onChangeTab={onChangeTab}
            label={t("static:bfecce4e8b9844afab513efa5ea53353")}
        />
        <NotificationsTab
            classes={classes}
            value="info"
            selectedValue={value}
            onChangeTab={onChangeTab}
            label={t("static:627518f4034947aa9989507c5688cfff")}
        />
        <NotificationsTab
            classes={classes}
            value="error"
            selectedValue={value}
            onChangeTab={onChangeTab}
            label={t("static:7185a3b731b14e1ea8fb86056b571fe5")}
        />
        <NotificationsTab
            classes={classes}
            value="warning"
            selectedValue={value}
            onChangeTab={onChangeTab}
            label={t("static:10666aec26534e179b22f681700f22b7")}
        />
        <NotificationsTab
            classes={classes}
            value="notification"
            selectedValue={value}
            onChangeTab={onChangeTab}
            label={t("static:880a932500234fa2b2f22a4b36bd6cd8")}
        />
        {applicationStore.actions.indexOf(ACTIONS_VIEW) > -1 ? (
            <NotificationsTab
                classes={classes}
                value="debug"
                selectedValue={value}
                onChangeTab={onChangeTab}
                label={t("static:1650aebec6b348f094680ba725441ef0")}
            />
        ) : null}
    </Grid>
);

export default withTranslation("meta")(withStyles(styles)(NotificationsTabs));
