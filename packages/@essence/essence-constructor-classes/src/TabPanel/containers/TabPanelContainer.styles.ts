import {makeStyles} from "@material-ui/core";
import {IEssenceTheme} from "@essence-community/constructor-share";

export const useStyles = makeStyles(
    (theme: IEssenceTheme) => ({
        content: {},
        contentHidden: {
            display: "none",
        },
        elevation: {},
        nestedTab: {
            "&$elevation": {
                borderRadius: theme.shape.borderRadius,
                boxShadow: theme.shadows[8],
                transition: theme.transitions.create("box-shadow"),
            },
            background: theme.palette.type === "dark" ? theme.palette.primary.main : undefined,
        },
        root: {
            display: "flex",
            flexWrap: "nowrap",
        },
        "root-center-hbox": {
            flexDirection: "column",
        },
        "root-center-vbox": {
            flexDirection: "column",
        },
        "root-left-hbox": {
            "& > $content": {
                width: "calc(100% - 256px)",
            },
            flexDirection: "row",
        },
        "root-left-vbox": {
            "& > $content": {
                width: "calc(100% - 36px)",
            },
            flexDirection: "row",
        },
        "root-right-hbox": {
            "& > $content": {
                width: "calc(100% - 256px)",
            },
            flexDirection: "row-reverse",
        },
        "root-right-vbox": {
            "& > $content": {
                width: "calc(100% - 36px)",
            },
            flexDirection: "row-reverse",
        },
    }),
    {
        name: "EssenceTabPanel",
    },
);
