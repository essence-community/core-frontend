import {makeStyles} from "@material-ui/core";

export const useStyles = makeStyles(
    (theme) => ({
        description: {
            ...theme.typography.caption,
            color: theme.palette.primary.main,
        },
        element: {
            borderBottom: `1px solid ${theme.palette.primary.main}`,
            padding: theme.spacing(1, 0),
        },
        root: {
            width: 220,
        },
        title: {
            ...theme.typography.body1,
            color: theme.palette.primary.main,
        },
    }),
    {name: "GuiEditorClassesContainer"},
);
