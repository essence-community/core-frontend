import {makeStyles} from "@material-ui/core";

export const useStyles = makeStyles(
    () => ({
        root: {
            alignItems: "center",
            display: "flex",
            justifyContent: "center",
            zIndex: 1600,
        },
    }),
    {name: "EssencePageLoader"},
);
