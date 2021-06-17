import {makeStyles} from "@material-ui/core";

export const useStyles = makeStyles(
    (theme) => ({
        hovered: {
            outline: `2px solid ${theme.palette.primary.light}`,
        },
    }),
    {name: "GuiEditorElementContainer"},
);
