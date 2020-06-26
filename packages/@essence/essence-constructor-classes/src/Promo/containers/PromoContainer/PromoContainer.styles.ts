import {makeStyles} from "@material-ui/core";

export const useStyles = makeStyles(
    (theme) => ({
        darkLine: {
            backgroundColor: theme.palette.primary.main,
            color: "rgb(243,249,255)",
            fill: "#90D0CB",
        },
        maxWidth: {
            maxWidth: 1024,
            width: "100%",
        },
        root: {
            backgroundColor: "rgb(243,249,255)",
        },
    }),
    {name: "EssencePromoContainer"},
);
