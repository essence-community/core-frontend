// @flow
import * as React from "react";
import {withStyles} from "@material-ui/core/styles";
import {Grid} from "@material-ui/core";
import {ToolBar, ToolBarDrawerButton} from "@essence-community/constructor-components";
import {styleTheme} from "../constants";
import MenuGrid from "./MenuGrid/MenuGrid";
import AppBarTabs from "./AppBarTabs/AppBarTabs";
import MenuFavorits from "./MenuFavorits/MenuFavorits";
import Notifications from "./Notifications";
import MenuProfile from "./MenuProfile/MenuProfile";
import AppInfo from "./AppInfo/AppInfo";
import VerticalDivider from "./Divider/VerticalDivider";
import NotificationsBadge from "./NotificationsBadge";

const postfix = styleTheme === "light" ? "" : "-o";
const styles = (theme: any) => ({
    content: {
        "@global": {
            ".popover-constructor-material": {
                marginTop: -theme.sizing.appbarHeight,
            },
        },
    },
    notificationRoot: {
        backgroundColor: theme.palette.common.white,
        boxShadow: "-4px 0px 3px 0 rgba(0, 0, 0, 0.3)",
        height: `calc(100vh - ${theme.sizing.appbarHeight}px)`,
        marginTop: theme.sizing.appbarHeight,
        width: 500,
    },
    profilePopup: {
        backgroundColor: theme.palette.common.white,
        height: "auto",
        marginTop: theme.sizing.appbarHeight,
        padding: theme.spacing(2),
        width: 350,
    },
    root: {
        height: "100%",
    },
});

type Props = {
    classes: {
        [$Keys<$Call<typeof styles>>]: string,
    },
    children: React.Node,
};

type State = {
    tabValue: string,
};

const MENU_GRID_WIDTH = 300;
const NOTIFICATION_GRID_WIDTH = 490;
const PROFILE_MODAL_PROPS = {
    keepMounted: true,
};

class AppBar extends React.Component<Props, State> {
    state = {
        tabValue: "1",
    };

    handleTabChange = (event: any, tabValue: string) => {
        this.setState({
            tabValue,
        });
    };

    render() {
        const {classes, children} = this.props;

        return (
            <Grid container direction="column" className={classes.root} wrap="nowrap">
                <Grid item>
                    <ToolBar>
                        <ToolBarDrawerButton iconfont={`star${postfix}`} width={MENU_GRID_WIDTH}>
                            <MenuFavorits />
                        </ToolBarDrawerButton>
                        <VerticalDivider />
                        <ToolBarDrawerButton iconfont="bars" width={MENU_GRID_WIDTH}>
                            <MenuGrid />
                        </ToolBarDrawerButton>
                        <AppBarTabs />
                        <ToolBarDrawerButton
                            iconfont={`bell${postfix}`}
                            anchor="right"
                            drawerClassName={classes.notificationRoot}
                            width={NOTIFICATION_GRID_WIDTH}
                            Badge={NotificationsBadge}
                        >
                            <Notifications />
                        </ToolBarDrawerButton>
                        <VerticalDivider />
                        <ToolBarDrawerButton
                            drawerClassName={classes.profilePopup}
                            iconfont={`user${postfix}`}
                            anchor="right"
                            ModalProps={PROFILE_MODAL_PROPS}
                            width={MENU_GRID_WIDTH}
                        >
                            <MenuProfile />
                        </ToolBarDrawerButton>
                        <VerticalDivider />
                        <AppInfo />
                    </ToolBar>
                </Grid>
                <Grid item xs className={classes.content}>
                    {children}
                </Grid>
            </Grid>
        );
    }
}

export default withStyles(styles)(AppBar);
