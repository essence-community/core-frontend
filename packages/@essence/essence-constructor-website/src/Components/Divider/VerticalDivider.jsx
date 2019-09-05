// @flow
import * as React from "react";
import {withStyles} from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";

const styles = (theme: any) => ({
    divider: {
        backgroundColor: theme.palette.common.white,
        height: 26,
        width: 1,
    },
});

type PropsType = {
    classes?: Object,
};

export const VerticalDivider = ({classes = {}}: PropsType) => <Divider className={classes.divider} />;

export default withStyles(styles)(VerticalDivider);
