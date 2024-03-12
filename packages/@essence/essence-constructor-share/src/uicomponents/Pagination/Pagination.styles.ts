import {makeStyles} from "@material-ui/core/styles";
import {IEssenceTheme} from "../../types";

export const useStyles = makeStyles(
    (theme: IEssenceTheme) => ({
        buttonRoot: {
            color: theme.palette.primary.main,
            fill: theme.palette.primary.main,
            height: theme.essence.sizing.gridRowHeight,
            width: theme.essence.sizing.gridRowHeight,
        },
        comboBox: {
            "& .MuiInput-input": {
                color: theme.palette.primary.main,
                fill: theme.palette.primary.main,
            },
            display: "flex",
            width: 70,
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
    }),
    {name: "EssencePagination"},
);
