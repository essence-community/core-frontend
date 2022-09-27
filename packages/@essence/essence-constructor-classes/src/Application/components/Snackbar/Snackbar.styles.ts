import {makeStyles} from "@material-ui/core";
import {IEssenceTheme} from "@essence-community/constructor-share/types";

export const useStyles = makeStyles(
    (theme: IEssenceTheme) => ({
        root: {
            bottom: 0,
            maxHeight: `calc(100vh - ${theme.spacing(2)}px)`,
            overflowY: "auto",
            paddingBottom: theme.spacing(2),
            paddingLeft: theme.spacing(2),
            paddingRight: theme.spacing(2),
            position: "fixed",
            right: theme.spacing(2),
            width: 442,
            zIndex: theme.zIndex.snackbar,
        },
    }),
    {name: "EssenceSnackbar"},
);
