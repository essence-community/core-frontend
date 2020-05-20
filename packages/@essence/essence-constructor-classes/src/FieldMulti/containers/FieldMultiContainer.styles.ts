import {makeStyles} from "@material-ui/core";

export const useStyles = makeStyles(
    (theme) => ({
        content: {
            width: "100%",
        },
        paper: {
            backgroundColor: theme.palette.primary.main,
            overflow: "visible",
            padding: theme.spacing(1),
            width: 600,
        },
    }),
    {name: "EssenceFieldMultiContainer"},
);
