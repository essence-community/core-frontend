import * as React from "react";
import {useObserver} from "mobx-react-lite";
import {Grid, Paper, Typography} from "@material-ui/core";
import {useTranslation} from "@essence-community/constructor-share/utils";
import {IApplicationModel} from "@essence-community/constructor-share/types";
import {useStyles} from "./Block.styles";

interface IBlockProps {
    applicationStore: IApplicationModel;
}

export const Block: React.FC<IBlockProps> = ({applicationStore}) => {
    const classes = useStyles();
    const [trans] = useTranslation("meta");

    return useObserver(() => {
        return applicationStore.isBlock ? (
            <div className={classes.root}>
                <Grid
                    container
                    className={classes.grid}
                    spacing={2}
                    alignItems="center"
                    direction="row"
                    justify="center"
                >
                    <Grid item>
                        <Paper className={classes.paper} elevation={8}>
                            {trans("static:e6f8166771e04b849855254c5d926ff6")}
                            <Typography variant="body2" color="inherit">
                                {applicationStore.blockText}
                            </Typography>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        ) : null;
    });
};
