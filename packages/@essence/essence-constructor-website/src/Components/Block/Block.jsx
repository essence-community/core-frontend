// @flow
import * as React from "react";
import {withStyles} from "@material-ui/core/styles";
import {observer} from "mobx-react";
import {Grid, Paper, Typography} from "@material-ui/core";

const styles = (theme) => ({
    grid: {
        height: "100%",
        width: "100%",
    },
    paper: {
        background: theme.palette.common.white,
        padding: "10px 5px",
    },
    root: {
        background: theme.palette.grey.shadow,
        height: "100%",
        left: 0,
        position: "fixed",
        top: 0,
        width: "100%",
        zIndex: theme.zIndex.snackbar,
    },
});

type PropsType = {
    classes: Object,
    applicationStore: Object,
};

const BaseBlock = ({applicationStore, classes = {}}: PropsType) =>
    applicationStore.isBlock ? (
        <div className={classes.root}>
            <Grid container className={classes.grid} spacing={2} alignItems="center" direction="row" justify="center">
                <Grid item>
                    <Paper className={classes.paper} elevation={8}>
                        Предупреждение
                        <Typography variant="body2" color="inherit">
                            {applicationStore.blockText}
                        </Typography>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    ) : null;

export const Block = withStyles(styles)(observer(BaseBlock));
