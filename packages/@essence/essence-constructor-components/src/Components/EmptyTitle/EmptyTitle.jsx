// @flow
import * as React from "react";
import {Grid, Typography} from "@material-ui/core";
import {withStyles} from "@material-ui/core/styles";
import styles from "./EmptyTitleStyles";

type PropsType = {
    classes: Object,
    title?: string,
    filters: Array<Object>,
    hideactions?: boolean,
    slim?: boolean,
};

const EmptyTitle = ({classes, title, filters, hideactions, slim}: PropsType) => {
    if (filters.length > 0 || !title) {
        return null;
    }

    return (
        <Grid container direction="row" wrap="nowrap" className={classes.titleContainer}>
            {hideactions ? null : (
                <Grid item className={`${classes.titleButtons} ${slim ? classes.titleButtonsSlim : ""}`}>
                    &nbsp;
                </Grid>
            )}
            <Grid item xs zeroMinWidth>
                <Typography variant="body2" noWrap className={classes.titleTypography} data-qtip={title}>
                    {title}
                </Typography>
            </Grid>
        </Grid>
    );
};

EmptyTitle.defaultProps = {
    filters: [],
};

export default withStyles(styles)(EmptyTitle);
