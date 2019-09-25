// @flow
import * as React from "react";
import {withStyles} from "@material-ui/core/styles";
import {observer} from "mobx-react";
import SnackbarContent from "./SnackbarContent";

const styles = (theme) => ({
    root: {
        bottom: 0,
        maxHeight: `calc(100vh - ${theme.sizing.appbarHeight + theme.spacing(2)}px)`,
        overflowY: "auto",
        paddingBottom: theme.spacing(2),
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        position: "fixed",
        right: theme.spacing(2),
        width: 442,
        zIndex: theme.zIndex.snackbar,
    },
});

type PropsType = {
    snackbars: Array<Object>,
    onClose: (snakebarId: number | string) => void,
    onSetCloseble: (snakebarId: number | string) => void,
    classes: Object,
};

export const BaseSnackbar = ({snackbars, classes = {}, onClose, onSetCloseble}: PropsType) => (
    <div className={classes.root}>
        {snackbars.map((snackbar) => (
            <SnackbarContent key={snackbar.id} snackbar={snackbar} onClose={onClose} onSetCloseble={onSetCloseble} />
        ))}
    </div>
);

export const Snackbar = withStyles(styles)(BaseSnackbar);

export const SnackbarMobx = withStyles(styles)(observer(BaseSnackbar));

export default Snackbar;
