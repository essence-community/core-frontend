import {makeStyles} from "@material-ui/core";

export const useStyles = makeStyles(
    (theme) => ({
        warning: {
            color: theme.palette.error.main,
            fontSize: "2rem",
            textAlign: "center",
        },
    }),
    {name: "EssenceGridWarning"},
);
