import {makeStyles} from "@material-ui/core";
import {IEssenceTheme} from "@essence-community/constructor-share/types";

export const useStyles = makeStyles(
    (theme: IEssenceTheme) => ({
        content: {
            display: "flex",
            position: "relative",
        },
        menu: {
            backgroundColor: theme.palette.primary.main,
            width: 300,
        },
        root: {
            height: "100%",
        },
    }),
    {name: "StaticReportsContainer"},
);
