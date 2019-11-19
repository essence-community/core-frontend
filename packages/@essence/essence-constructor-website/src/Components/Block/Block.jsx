// @flow
import * as React from "react";
import {withStyles} from "@material-ui/core/styles";
import {observer} from "mobx-react";
import {Grid, Paper, Typography} from "@material-ui/core";
import {WithT, withTranslation} from "@essence/essence-constructor-share/utils";

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

type PropsType = WithT & {
    classes: Object,
    applicationStore: Object,
};

// eslint-disable-next-line id-length
const BaseBlock = ({applicationStore, classes = {}, t}: PropsType) =>
    applicationStore.isBlock ? (
        <div className={classes.root}>
            <Grid container className={classes.grid} spacing={2} alignItems="center" direction="row" justify="center">
                <Grid item>
                    <Paper className={classes.paper} elevation={8}>
                        {t("e6f8166771e04b849855254c5d926ff6")}
                        <Typography variant="body2" color="inherit">
                            {applicationStore.blockText}
                        </Typography>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    ) : null;

export const Block = withTranslation("meta")(withStyles(styles)(observer(BaseBlock)));
