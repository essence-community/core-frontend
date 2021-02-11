import {makeStyles} from "@material-ui/core";
import {IEssenceTheme} from "@essence-community/constructor-share/types";

export const useStyles = makeStyles(
    (theme: IEssenceTheme) => ({
        eyeButton: {
            "&:focus": {
                color: theme.essence.palette.icon.secondary,
            },
            "&:hover": {
                color: theme.palette.primary.light,
            },
            height: theme.essence.sizing.gridRowHeight,
            width: theme.essence.sizing.gridRowHeight,
        },
    }),
    {name: "EssenceFieldFileContainer"},
);
