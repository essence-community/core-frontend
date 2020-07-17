import * as React from "react";
import {Grid, useTheme} from "@material-ui/core";
import {FormContext} from "@essence-community/constructor-share/context";
import cn from "clsx";
import {useObserver} from "mobx-react";
import {IClassProps} from "@essence-community/constructor-share/types";
import {VAR_RECORD_PAGE_OBJECT_ID} from "@essence-community/constructor-share/constants";
import {useStyles} from "./PanelWrapper.styles";

export interface IPanelWrapperProps extends IClassProps {
    actionsBar: React.ReactElement;
}
export const PanelWrapper: React.FC<IPanelWrapperProps> = (props) => {
    const {children, bc, actionsBar} = props;
    const form = React.useContext(FormContext);
    const classes = useStyles();
    const theme = useTheme();
    const isDarkTheme = theme.palette.type === "dark";

    return useObserver(() => (
        <Grid
            container
            spacing={0}
            direction={isDarkTheme ? "row" : "column"}
            wrap="nowrap"
            className={cn({[classes.panelEditing]: form.editing})}
            data-page-object={bc[VAR_RECORD_PAGE_OBJECT_ID]}
        >
            <Grid item className={classes.actionsBar}>
                {actionsBar}
            </Grid>
            <Grid item xs zeroMinWidth className={cn({[classes.contentEditing]: form.editing})}>
                {children}
            </Grid>
        </Grid>
    ));
};
