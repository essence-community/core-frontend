import * as React from "react";
import {Typography, Box, Grid} from "@material-ui/core";
import {PromoBlockImage} from "../PromoBlockImage";
import schemeBackground from "../../assets/scheme_background.svg";
import scheme1 from "../../assets/scheme_1.svg";
import scheme2 from "../../assets/scheme_2.svg";
import scheme3 from "../../assets/scheme_3.svg";
import scheme4 from "../../assets/scheme_4.svg";
import scheme5 from "../../assets/scheme_5.svg";
import scheme6 from "../../assets/scheme_6.svg";
import scheme7 from "../../assets/scheme_7.svg";
import scheme8 from "../../assets/scheme_8.svg";
import logo from "../../assets/logo.svg";
import {useStyles} from "./PromoHeader.styles";

export const PromoHeader: React.FC = () => {
    const classes = useStyles();

    return (
        <Box minHeight="calc(50vw + 32px)" position="relative" display="flex" paddingX={2} overflow="hidden">
            <Grid container alignItems="center">
                <Grid item sm={6} className={classes.content}>
                    <Box paddingBottom={6}>
                        <PromoBlockImage data={[logo, "10rem", "4rem"]} position="relative" />
                    </Box>
                    <Typography variant="h5" color="textSecondary">
                        Технологическая платформа с открытым кодом для построения гибких корпоративных приложений
                    </Typography>
                </Grid>
                <PromoBlockImage root data={[schemeBackground, "50vw", "30vw", void 0, "20%"]} className={classes.img}>
                    <PromoBlockImage data={[scheme1, "20%", "20%", "46%", "32%"]} />
                    <PromoBlockImage data={[scheme2, "15%", "15%", "64%", "8%"]} />
                    <PromoBlockImage data={[scheme3, "15%", "15%", "87%", "30%"]} />
                    <PromoBlockImage data={[scheme4, "40%", "40%", "11%", "48%"]} />
                    <PromoBlockImage data={[scheme5, "10%", "10%", "50%", "50%"]} />
                    <PromoBlockImage data={[scheme6, "10%", "10%", "38%", "41%"]} />
                    <PromoBlockImage data={[scheme7, "15%", "15%", "76%", "18%"]} />
                    <PromoBlockImage data={[scheme8, "15%", "15%", "51%", "-3%"]} />
                </PromoBlockImage>
            </Grid>
        </Box>
    );
};
