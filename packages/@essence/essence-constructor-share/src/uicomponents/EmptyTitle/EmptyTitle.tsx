import * as React from "react";
import {Grid, Typography} from "@mui/material";
import {IBuilderConfig} from "../../types";
import {useStyles} from "./EmptyTitle.styles";

interface IEmptyTitleProps {
    title?: string | JSX.Element;
    filters?: IBuilderConfig[];
    hideactions?: boolean;
    slim?: boolean;
}

export const EmptyTitle: React.FC<IEmptyTitleProps> = ({title, filters, hideactions, slim}) => {
    const classes = useStyles();

    if ((filters && filters.length > 0) || !title) {
        return null;
    }

    return (
        <Grid container direction="row" wrap="nowrap" className={classes.titleContainer}>
            {hideactions ? null : (
                <Grid className={`${classes.titleButtons} ${slim ? classes.titleButtonsSlim : ""}`}>
                    &nbsp;
                </Grid>
            )}
            <Grid size="grow">
                <Typography variant="body2" noWrap classes={{
                    root: classes.titleTypography,
                }} data-qtip={title}>
                    {title}
                </Typography>
            </Grid>
        </Grid>
    );
};
