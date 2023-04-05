import {makeStyles} from "@material-ui/core";
import {IEssenceTheme} from "@essence-community/constructor-share/types";

export const useStyles = makeStyles(
    (theme: IEssenceTheme) => ({
        icon: {
            minWidth: 0,
        },
        popoverWrapper: {
            "&$popoverWrapperDisabled": {
                pointerEvents: "none",
                visibility: "hidden",
            },
            "&$popoverWrapperOpen": {
                backgroundColor: theme.essence.palette.common.selectedRecord,
                visibility: "visible",
            },
            "&:hover": {
                backgroundColor: theme.essence.palette.common.selectedRecord,
            },
            alignItems: "center",
            cursor: "pointer",
            display: "flex",
            height: "100%",
            padding: theme.spacing(0, 0.5),
        },
        popoverWrapperDisabled: {},
        popoverWrapperOpen: {},
    }),
    {name: "EssenceGridHFIcon"},
);
