import {makeStyles} from "@material-ui/core";

export const useStyles = makeStyles(
    () => ({
        root: {
            overflow: "hidden",
            padding: "0 12px",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
        },
    }),
    {name: "ColumnTreeContainer"},
);
