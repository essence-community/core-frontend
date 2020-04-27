import {makeStyles} from "@material-ui/core";
import {IEssenceTheme} from "@essence-community/constructor-share/types";

export const useStyles = makeStyles(
    (theme: IEssenceTheme) => ({
        // Collector
        "uitype-8": {
            "&:hover, &:focus": {
                backgroundColor:
                    theme.palette.type === "dark"
                        ? theme.palette.primary.light
                        : theme.essence.ui.modal.palette.background,
            },
            color: theme.palette.type === "dark" ? theme.essence.palette.text.light : undefined,
            fill: theme.palette.type === "dark" ? theme.essence.palette.text.light : undefined,
            justifyContent: "start",
        },
    }),
    {name: "ClassesButton"},
);
