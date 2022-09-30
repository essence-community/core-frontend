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
        highlightFab: {
            ...theme.typography.body1,
            color: "red",
            position: "absolute",
            right: 8,
            top: 0,
        },
        open: {},
        // Save
        "uitype-5":
            theme.essence.layoutTheme === 2
                ? {
                      "&:hover": {
                          backgroundColor: theme.palette.primary.light,
                      },
                      backgroundColor: theme.palette.primary.light,
                      color: theme.palette.common.white,
                      minWidth: 42,
                  }
                : {},
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
            "&$open": {
                backgroundColor: theme.essence.layoutTheme === 2 ? theme.palette.primary.main : undefined,
                borderBottom: theme.essence.layoutTheme === 2 ? `1px solid ${theme.palette.common.white}` : undefined,
                borderColor: theme.palette.primary.main,
                borderRadius: "4px 4px 0 0",
                color: theme.essence.layoutTheme === 2 ? theme.palette.common.white : theme.palette.primary.main,
            },
            height: theme.essence.sizing.gridRowHeight,
            width: theme.essence.sizing.gridRowHeight,
        },
    }),
    {name: "IconButton"},
);
