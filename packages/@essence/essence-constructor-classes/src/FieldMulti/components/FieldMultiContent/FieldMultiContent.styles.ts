import {makeStyles} from "@material-ui/core";

export const useStyles = makeStyles(
    () => ({
        progressWrapper: {
            alignItems: "center",
            bottom: 0,
            display: "flex",
            justifyContent: "center",
            left: 0,
            position: "absolute",
            right: 0,
            top: 0,
            zIndex: 1,
        },
        wrapper: {
            position: "relative",
        },
    }),
    {
        name: "EssenceFieldMultiContent",
    },
);
