import {makeStyles} from "@essence-community/constructor-share";

export const useStyles = makeStyles(
    () => ({
        root: {
            overflow: "hidden",
            padding: "0 12px",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
        },
    }),
    {name: "ColumnTextContainer"},
);
