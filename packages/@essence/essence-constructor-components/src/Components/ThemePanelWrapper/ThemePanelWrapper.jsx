// @flow
import * as React from "react";
import cn from "classnames";
import {withStyles} from "@material-ui/core/styles";
import {Grid} from "@material-ui/core";
import {wrapperPanelDirection} from "../../constants";
import styles from "./ThemePanelWrapperStyles";

type PropsType = {
    actionsBar: React.Node,
    children: React.Node,
    classes: {
        [$Keys<$Call<typeof styles, any>>]: string,
    },
    editing?: boolean,
    topPanel?: boolean,
    childRef?: Function,
    dataPageObject?: string,
    classNameRoot?: string,
};

const ThemePanelWrapper = ({
    actionsBar,
    children,
    classes,
    editing,
    topPanel,
    childRef,
    classNameRoot,
    dataPageObject,
}: PropsType) => (
    <Grid
        container
        spacing={0}
        direction={wrapperPanelDirection}
        wrap="nowrap"
        className={cn(classNameRoot, {[classes.panelEditing]: editing})}
        data-page-object={dataPageObject}
    >
        <Grid item className={classes.actionsBar}>
            {actionsBar}
        </Grid>
        <Grid
            item
            xs
            zeroMinWidth
            className={cn({[classes.contentEditing]: editing, [classes.topPanel]: topPanel})}
            ref={childRef}
        >
            {children}
        </Grid>
    </Grid>
);

export default withStyles(styles)(ThemePanelWrapper);
