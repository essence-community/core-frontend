/* eslint-disable no-unused-vars */
import {makeStyles} from "@material-ui/core";
import {IEssenceTheme} from "@essence-community/constructor-share";

export const useStyles = makeStyles(
    (theme: IEssenceTheme) => ({
        clickIcon: {
            cursor: "pointer",
        },
        collapse: {
            marginLeft: 5,
        },
        headerWidget: {
            backgroundColor: theme.essence.palette.grey.light,
        },
        icon: {
            color: theme.essence.codeTheme === "dark" ? theme.palette.text.primary : theme.palette.primary.main,
            fill: theme.essence.codeTheme === "dark" ? theme.palette.text.primary : theme.palette.primary.main,
        },
        label: {
            color: theme.essence.codeTheme === "light" ? theme.palette.primary.main : theme.palette.text.primary,
            fontSize: 13,
            fontWeight: "bold",
            overflow: "hidden",
            padding: theme.spacing(0, 1),
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
        },
        moveIcon: {
            cursor: "move",
        },
        root: {
            height: "inherit",
            width: "inherit",
        },
    }),
    {
        name: "Widget",
    },
);
