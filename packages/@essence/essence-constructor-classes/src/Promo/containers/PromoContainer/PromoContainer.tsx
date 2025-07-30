import * as React from "react";
import {IClassProps, Scrollbars} from "@essence-community/constructor-share";
import {Grid, Box} from "@mui/material";
import {PromoInfo} from "../../components/PromoInfo";
import {PromoHeader} from "../../components/PromoHeader";
import {PromoIntegration} from "../../components/PromoIntegration";
import {PromoExamples} from "../../components/PromoExamples";
import {useStyles} from "./PromoContainer.styles";

export const PromoContainer: React.FC<IClassProps> = (props) => {
    const classes = useStyles();

    return (
        <Scrollbars hideTracksWhenNotNeeded>
            <Box className={classes.root}>
                <Grid container direction="column" spacing={0} alignItems="center">
                    <Grid className={classes.maxWidth}>
                        <PromoHeader />
                    </Grid>
                    <Grid container justifyContent="center" className={classes.darkLine}>
                        <div className={classes.maxWidth}>
                            <PromoInfo />
                        </div>
                    </Grid>
                    <Grid className={classes.maxWidth}>
                        <PromoExamples {...props} />
                    </Grid>
                    <Grid container justifyContent="center" className={classes.darkLine}>
                        <div className={classes.maxWidth}>
                            <PromoIntegration />
                        </div>
                    </Grid>
                </Grid>
            </Box>
        </Scrollbars>
    );
};
