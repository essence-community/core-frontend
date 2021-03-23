import {makeStyles} from "@material-ui/core";
import {IEssenceTheme} from "@essence-community/constructor-share";
import {darkStyles} from "./TabPanelContainer.dark.styles";
import {lightStyles} from "./TabPanelContainer.light.styles";

export const useStyles = makeStyles(
    (theme: IEssenceTheme) => ({
        "center-hbox": {
            flexDirection: "column",
        },
        "center-vbox": {
            flexDirection: "column",
        },
        content: {
            paddingTop: 10,
        },
        contentHidden: {
            display: "none",
        },
        elevation: {},
        "left-hbox": {
            "& > $content": {
                width: "calc(100% - 256px)",
            },
            flexDirection: "row",
        },
        "left-vbox": {
            "& > $content": {
                width: "calc(100% - 36px)",
            },
            flexDirection: "row",
        },
        nestedTab: {
            "&$elevation": {
                borderRadius: theme.shape.borderRadius,
                boxShadow: theme.shadows[8],
                transition: theme.transitions.create("box-shadow"),
            },
            background: theme.palette.type === "dark" ? theme.palette.primary.main : undefined,
        },
        "right-hbox": {
            "& > $content": {
                width: "calc(100% - 256px)",
            },
            flexDirection: "row-reverse",
        },
        "right-vbox": {
            "& > $content": {
                width: "calc(100% - 36px)",
            },
            flexDirection: "row-reverse",
        },
        root: {},
        rootDefault: {
            display: "flex",
            flexWrap: "nowrap",
        },
        ...(theme.palette.type === "dark" ? darkStyles() : lightStyles(theme)),
    }),
    {
        name: "EssenceTabPanel",
    },
);
