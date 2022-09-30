import {makeStyles} from "@material-ui/core";
import {IEssenceTheme} from "@essence-community/constructor-share/types";

export const useStyles = makeStyles(
    (theme: IEssenceTheme) => ({
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
