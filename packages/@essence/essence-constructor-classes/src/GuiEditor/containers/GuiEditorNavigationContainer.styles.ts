import {makeStyles} from "@material-ui/core";

export const useStyles = makeStyles(
    (theme) => ({
        menu: {
            backgroundColor: theme.palette.primary.main,
            borderRadius: theme.spacing(1),
            boxShadow: theme.shadows[8],
            color: theme.palette.common.white,
        },
        paper: {
            backgroundColor: theme.palette.common.white,
            border: `1px solid ${theme.palette.primary.main}`,
            borderRadius: theme.spacing(1),
            left: 58,
            maxHeight: "50vh",
            maxWidth: 320,
            overflow: "auto",
            padding: theme.spacing(2),
            position: "absolute",
            top: 0,
            zIndex: theme.zIndex.drawer,
        },
        root: {
            position: "relative",
            width: 42,
        },
    }),
    {name: "GuiEditorNavigationContainer"},
);
