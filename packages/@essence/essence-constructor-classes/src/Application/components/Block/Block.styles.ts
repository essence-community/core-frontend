import {makeStyles} from "@material-ui/core";
import {IEssenceTheme} from "@essence-community/constructor-share/types";

export const useStyles = makeStyles(
    (theme: IEssenceTheme) => ({
        grid: {
            height: "100%",
            width: "100%",
        },
        paper: {
            background: theme.palette.common.white,
            padding: "10px 5px",
        },
        root: {
            background: theme.essence.palette.grey.shadow,
            height: "100%",
            left: 0,
            position: "fixed",
            top: 0,
            width: "100%",
            zIndex: theme.zIndex.snackbar,
        },
    }),
    {name: "ApplicationBlock"},
);
