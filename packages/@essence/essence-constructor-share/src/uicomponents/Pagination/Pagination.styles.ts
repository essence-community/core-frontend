import {makeStyles} from "@material-ui/core/styles";
import {IEssenceTheme} from "../../types";

export const useStyles = makeStyles(
    (theme: IEssenceTheme) => ({
        buttonRoot: {
            color: theme.palette.primary.main,
            height: theme.essence.sizing.gridRowHeight,
            width: theme.essence.sizing.gridRowHeight,
        },
        disabledButton: {
            color: theme.essence.palette.grey.arrow,
        },
        root: {
            display: "flex",
        },
        rootRange: {
            display: "flex",
            overflow: "hidden",
        },
        typoRoot: {
            alignItems: "center",
            display: "flex",
            fontSize: 16,
            margin: "0 5px",
        },
        typoRootRange: {
            cursor: "pointer",
            textDecoration: "underline",
        },
        typoRootRangeSelect: {
            color: theme.essence.palette.common.selectedMenu,
        },
    }),
    {name: "EssencePagination"},
);
