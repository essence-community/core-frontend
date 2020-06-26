import {makeStyles} from "@material-ui/core";

export const useStyles = makeStyles(
    (theme) => ({
        item: {
            margin: theme.spacing(0.5, 0),
            padding: theme.spacing(0, 2),
        },
        linkIcon: {
            display: "none",
            left: 0,
            position: "absolute",
            top: 6,
            width: theme.spacing(2),
        },
        linkRoot: {
            "&:hover $linkIcon": {
                display: "block",
            },
            position: "relative",
        },
        root: {
            display: "flex",
            flexDirection: "column",
        },
    }),
    {name: "EssenceDocumentationContainer"},
);
