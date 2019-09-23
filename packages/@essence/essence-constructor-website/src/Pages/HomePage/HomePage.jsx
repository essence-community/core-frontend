/* eslint-disable jsx-a11y/href-no-hash */
// @flow
import * as React from "react";
import {withStyles} from "@material-ui/core/styles";
import {Grid} from "@material-ui/core";
import homeLogo from "../../images/home_logo.png";
import styles from "./HomePageStyles";

type PropsType = {
    classes?: Object,
};

const HomePage = ({classes = {}}: PropsType) => (
    <Grid container justify="center" alignItems="center" className={classes.root}>
        <Grid item>
            <img className={classes.homeLogo} src={homeLogo} alt="Главная страница" />
        </Grid>
    </Grid>
);

export default withStyles(styles)(HomePage);
