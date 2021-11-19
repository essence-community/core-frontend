import {makeStyles} from "@material-ui/core";
import {IEssenceTheme} from "@essence-community/constructor-share/types";

export const useStyles = makeStyles(
    (theme: IEssenceTheme) => ({
        displayed: {},
        // Collector
        "uitype-8": {
            "& $displayed": {
                ...theme.typography.body2,
                textTransform: "none",
            },
            "&:hover, &:focus": {
                backgroundColor:
                    theme.essence.layoutTheme === 2
                        ? theme.palette.primary.light
                        : theme.essence.ui.modal.palette.background,
            },
            color: theme.essence.layoutTheme === 2 ? theme.essence.palette.text.light : undefined,
            fill: theme.essence.layoutTheme === 2 ? theme.essence.palette.text.light : undefined,
            justifyContent: "start",
            maxHeight: theme.essence.sizing.gridRowHeight,
        },
    }),
    {name: "ClassesButton"},
);
