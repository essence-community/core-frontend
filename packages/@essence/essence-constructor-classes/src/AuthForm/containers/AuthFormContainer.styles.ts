import {makeStyles} from "@material-ui/core";

export const useStyles = makeStyles(
    (theme) => ({
        form: {
            width: "calc(100% - 104px)",
        },
        paper: {
            alignItems: "center",
            backgroundColor: theme.palette.primary.main,
            display: "flex",
            flexDirection: "column",
            height: 308,
            justifyContent: "space-between",
            paddingBottom: 30,
            paddingTop: 15,
            width: 429,
        },
        typography: {
            color: theme.palette.common.white,
            display: "flex",
            fontSize: 30,
        },
    }),
    {name: "AuthFormContainer"},
);
