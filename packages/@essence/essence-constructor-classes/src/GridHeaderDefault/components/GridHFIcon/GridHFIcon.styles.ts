import {makeStyles} from "@material-ui/core";
import {IEssenceTheme} from "@essence-community/constructor-share/types";

export const useStyles = makeStyles(
    (theme: IEssenceTheme) => ({
        popoverWrapper: {
            "&$popoverWrapperDisabled": {
                pointerEvents: "none",
                visibility: "hidden",
            },
            "&$popoverWrapperFilled": {
                backgroundColor: theme.essence.palette.common.selectedRecord,
                visibility: "visible",
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
        popoverWrapperFilled: {},
        popoverWrapperOpen: {},
    }),
    {name: "EssenceGridHFIcon"},
);
