// @flow
import * as React from "react";
import {withStyles} from "@material-ui/core/styles";
import {Toolbar as MaterialToolBar} from "@material-ui/core";
import {styleTheme} from "../constants";
import {StyleToolBarLight} from "./StyleToolBarLight";
import {StyleToolBarDark} from "./StyleToolBarDark";

const styles = styleTheme === "light" ? StyleToolBarLight : StyleToolBarDark;

type Props = {
    classes?: {
        [$Keys<$Call<typeof styles>>]: string,
    },
    children?: any,
};
class ToolBar extends React.Component<Props> {
    render() {
        const {classes = {}, children} = this.props;

        return <MaterialToolBar classes={{root: classes.toolbar}}>{children}</MaterialToolBar>;
    }
}

export default withStyles(styles)(ToolBar);
