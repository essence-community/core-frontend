import {makeStyles} from "@material-ui/core/styles";

export const useStyles = makeStyles(
    (theme) => ({
        buttonRoot: {
            color: theme.palette.primary.main,
            height: theme.sizing.gridRowHeight,
            width: theme.sizing.gridRowHeight,
        },
        disabledButton: {
            color: theme.palette.grey.arrow,
        },
        root: {
            display: "flex",
        },
        typoRoot: {
            alignItems: "center",
            display: "flex",
            fontSize: 16,
            margin: "0 5px",
        },
    }),
    {name: "EssencePagination"},
);
