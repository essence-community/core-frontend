// @flow
import React from "react";
import {Grid} from "@material-ui/core";
import {withStyles} from "@material-ui/core/styles";
import {ToolBar, ToolBarDrawerButton} from "@essence-community/constructor-components";
import {styleTheme} from "../constants";
import VerticalDivider from "./Divider/VerticalDivider";
import AppInfo from "./AppInfo/AppInfo";
import MenuAuth from "./MenuAuth/MenuAuth";

const styles = (theme: any) => ({
    profilePopup: {
        backgroundColor: theme.palette.common.white,
        height: "auto",
        marginTop: theme.sizing.appbarHeight,
        padding: theme.spacing(2),
        width: 350,
    },
});

type PropsType = {
    classes?: Object,
};

const postfix = styleTheme === "light" ? "" : "-o";

const PROFILE_MODAL_PROPS = {
    keepMounted: true,
};

const AppBarAuth = ({classes = {}}: PropsType) => (
    <ToolBar>
        <Grid container alignItems="center">
            <Grid item xs>
                &nbsp;
            </Grid>
            <Grid item>
                <ToolBarDrawerButton
                    drawerClassName={classes.profilePopup}
                    iconfont={`user${postfix}`}
                    anchor="right"
                    ModalProps={PROFILE_MODAL_PROPS}
                >
                    <MenuAuth />
                </ToolBarDrawerButton>
            </Grid>
            <Grid item>
                <VerticalDivider />
            </Grid>
            <Grid item>
                <AppInfo />
            </Grid>
        </Grid>
    </ToolBar>
);

export default withStyles(styles)(AppBarAuth);
