import {makeStyles} from "@material-ui/core";

export const useStyles = makeStyles(
    (theme) => ({
        form: {
            display: "flex",
            flexDirection: theme.palette.type === "dark" ? "row" : "column",
        },
    }),
    {name: "UIForm"},
);
