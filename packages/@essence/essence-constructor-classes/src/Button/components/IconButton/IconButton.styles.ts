import {makeStyles} from "@material-ui/core";
import {IEssenceTheme} from "@essence-community/constructor-share/types";

export const useStyles = makeStyles(
    (theme: IEssenceTheme) => ({
        highlight: {
            ...theme.typography.body1,
            color: "red",
            position: "absolute",
            right: 0,
            top: -5,
        },
        // Save
        "uitype-5": {
            "&:hover": {
                backgroundColor: theme.palette.primary.light,
            },
            backgroundColor: theme.palette.primary.light,
            color: theme.palette.common.white,
            minWidth: 42,
        },
        // Cancel
        "uitype-6": {
            "&:hover": {
                backgroundColor: theme.palette.common.white,
            },
            backgroundColor: theme.palette.common.white,
            color: theme.palette.primary.main,
            minWidth: 42,
        },
        // Grid button
        "uitype-7": {
            height: theme.essence.sizing.gridRowHeight,
            width: theme.essence.sizing.gridRowHeight,
        },
    }),
    {name: "IconButton"},
);
