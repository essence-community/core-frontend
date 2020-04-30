import {makeStyles} from "@material-ui/core";
import {IEssenceTheme} from "@essence-community/constructor-share/types";

export const useStyles = makeStyles(
    (theme: IEssenceTheme) => ({
        "align-center": {
            textAlign: "center",
        },
        "align-right": {
            textAlign: "right",
        },
        button: {},
        root: {
            "&$button": {
                border: "none",
            },
            "&:first-of-type": {
                border: "none",
            },
            "&:last-child": {
                borderRight: "none",
            },
            border: theme.palette.type === "light" ? "none" : undefined,
            borderBottom: "none",
            borderRight: theme.palette.type === "dark" ? `1px solid ${theme.essence.palette.grey.arrow}` : undefined,
            color: theme.palette.text.primary,
            fontSize: theme.typography.pxToRem(13),
            fontWeight: theme.typography.fontWeightRegular,
            overflow: "hidden",
            padding: 0,
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            width: theme.palette.type === "dark" ? "calc(100% - 1px)" : undefined,
        },
    }),
    {name: "ColumnContainer"},
);
