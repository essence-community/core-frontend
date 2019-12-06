import {makeStyles} from "@material-ui/core/styles";

export const useStyles = makeStyles(
    (theme) => ({
        buttonRoot: {
            color: theme.palette.primary.main,
            // @ts-ignore
            height: theme.sizing.gridRowHeight,
            // @ts-ignore
            width: theme.sizing.gridRowHeight,
        },
        disabledButton: {
            // @ts-ignore
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
