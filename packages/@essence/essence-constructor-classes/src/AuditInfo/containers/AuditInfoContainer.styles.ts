import {makeStyles} from "@material-ui/core";

export const useStyles = makeStyles(
    () => ({
        popover: {
            display: "flex",
            flexDirection: "column",
        },
    }),
    {name: "ClassesAuditInfoContainer"},
);
