// @flow
import * as React from "react";
import Grid from "@material-ui/core/Grid";
import {withStyles} from "@material-ui/core/styles";
import {SideResizer} from "@essence/essence-constructor-components";
import MenuGrid from "../MenuGrid/MenuGrid";
import styles from "./ReportsContentStyles";

type PropsType = {
    children: React.Node,
    classes: {
        [$Keys<$Call<typeof styles>>]: string,
    },
};
type StateType = {
    width: number,
};

const MENU_GRID_WIDTH = 300;

class ReportsContent extends React.Component<PropsType, StateType> {
    state = {
        width: MENU_GRID_WIDTH,
    };

    handleResizeWidth = (value: number) => {
        this.setState({
            width: value,
        });
    };

    render() {
        const {width} = this.state;
        const {classes} = this.props;

        return (
            <Grid container wrap="nowrap" className={classes.root}>
                <Grid item className={classes.menu} style={{width}} zeroMinWidth>
                    <MenuGrid />
                </Grid>
                <Grid item>
                    <SideResizer
                        anchor="left"
                        minDrawerWidth={MENU_GRID_WIDTH}
                        maxDrawerWidth={window.innerWidth / 2}
                        drawerWidth={width}
                        onChangeWidth={this.handleResizeWidth}
                    />
                </Grid>
                <Grid item xs className={classes.content}>
                    {this.props.children}
                </Grid>
            </Grid>
        );
    }
}

export default withStyles(styles)(ReportsContent);
