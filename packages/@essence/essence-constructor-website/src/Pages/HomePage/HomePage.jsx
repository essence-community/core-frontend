/* eslint-disable jsx-a11y/href-no-hash */
// @flow
import * as React from "react";
import {withStyles} from "@material-ui/core/styles";
import {Grid} from "@material-ui/core";
import {WithT, withTranslation} from "@essence/essence-constructor-share/utils";
import homeLogo from "../../images/home_logo.png";
import styles from "./HomePageStyles";

type PropsType = WithT & {
    classes?: Object,
};

// eslint-disable-next-line id-length
const HomePage = ({classes = {}, t}: PropsType) => (
    <Grid container justify="center" alignItems="center" className={classes.root}>
        <Grid item>
            <img className={classes.homeLogo} src={homeLogo} alt={t("a54bed8bf1574dc185aaf1f74aa85148")} />
        </Grid>
    </Grid>
);

export default withTranslation("meta")(withStyles(styles)(HomePage));
