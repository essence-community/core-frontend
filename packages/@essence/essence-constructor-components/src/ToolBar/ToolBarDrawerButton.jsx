// @flow
import * as React from "react";
import cn from "classnames";
import {ButtonBase, Drawer, Grid} from "@material-ui/core";
import {withStyles} from "@material-ui/core/styles";
import {Icon} from "@essence/essence-constructor-share/Icon";
import {SideResizer} from "@essence/essence-constructor-share/uicomponents";
import {styleTheme} from "../constants";
import {StyleToolBarLight} from "./StyleToolBarLight";
import {StyleToolBarDark} from "./StyleToolBarDark";

const styles = styleTheme === "light" ? StyleToolBarLight : StyleToolBarDark;

type Props = {
    classes?: {
        [$Keys<$Call<typeof styles>>]: string,
    },
    children?: any,
    iconfont: string,
    width?: number,
    anchor: "left" | "right",
    drawerClassName?: string,
    ModalProps?: Object,
    Badge?: React.ComponentType<any>,
};

type State = {
    drawerWidth: number,
    isDrawerOpen: boolean,
};

const MENU_GRID_WIDTH = 300;

class ToolBarDrawerButton extends React.Component<Props, State> {
    static defaultProps = {
        anchor: "left",
    };

    state = {
        drawerWidth: 0,
        isDrawerOpen: false,
    };

    openCloseDrawer = () => {
        this.setState({
            isDrawerOpen: !this.state.isDrawerOpen,
        });
    };

    handleResizeWidth = (value: number) => {
        this.setState({
            drawerWidth: value,
        });
    };

    renderSideResizer = () => {
        const {width, anchor} = this.props;

        return (
            <Grid item>
                <SideResizer
                    anchor={anchor}
                    minDrawerWidth={width || MENU_GRID_WIDTH}
                    maxDrawerWidth={window.innerWidth / 2}
                    onChangeWidth={this.handleResizeWidth}
                    point="px"
                />
            </Grid>
        );
    };

    render() {
        const {classes = {}, children, iconfont, width, anchor, ModalProps, Badge} = this.props;
        const {isDrawerOpen, drawerWidth} = this.state;
        const drawerClassName =
            this.props.drawerClassName ||
            (width === MENU_GRID_WIDTH ? classes.menuGridDrawer : classes.menuMarksDrawer);
        const button = (
            <ButtonBase classes={{root: classes.button}} onClick={this.openCloseDrawer} disableRipple tabIndex="-1">
                <Icon
                    iconfont={iconfont}
                    size="2x"
                    className={cn(classes.icon, {[classes.activeButton]: isDrawerOpen})}
                />
            </ButtonBase>
        );

        return (
            <React.Fragment>
                {Badge ? <Badge classes={{badge: classes.badgeRoot}}>{button}</Badge> : button}
                <Drawer
                    anchor={anchor}
                    open={isDrawerOpen}
                    onClose={this.openCloseDrawer}
                    classes={{paper: drawerClassName}}
                    BackdropProps={{invisible: true}}
                    ModalProps={ModalProps}
                    PaperProps={{
                        style: {
                            width: drawerWidth || width,
                        },
                    }}
                >
                    <Grid container spacing={0} className={classes.drawerBody} direction="row" alignItems="stretch">
                        {anchor === "right" ? this.renderSideResizer() : null}
                        <Grid item className={classes.drawerBodyChildren}>
                            {children}
                        </Grid>
                        {anchor === "left" ? this.renderSideResizer() : null}
                    </Grid>
                </Drawer>
            </React.Fragment>
        );
    }
}

export default withStyles(styles)(ToolBarDrawerButton);
