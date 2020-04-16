import {makeStyles} from "@material-ui/core";
import {IEssenceTheme} from "@essence-community/constructor-share/types";

export const useStyles = makeStyles(
    (theme: IEssenceTheme) => ({
        btnContainer: {
            display: "flex",
            justifyContent: "center",
        },
        button: {
            "&:hover": {
                backgroundColor: theme.palette.primary.light,
                color: theme.palette.type === "light" ? theme.palette.common.white : theme.essence.palette.grey.light,
            },
            backgroundColor: theme.palette.primary.light,
            color: theme.palette.type === "light" ? theme.palette.common.white : theme.essence.palette.grey.light,
            float: "right",
            height: 36,
            marginTop: 30,
            width: 105,
        },
        panel: {
            background: theme.palette.primary.main,
            color: theme.palette.common.white,
            padding: 10,
            width: 455,
        },
        root: {
            flexGrow: 1,
        },
    }),
    {name: "StaticRedirectContainer"},
);
