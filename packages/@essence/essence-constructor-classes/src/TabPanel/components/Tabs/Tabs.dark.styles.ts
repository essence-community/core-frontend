import {IEssenceTheme} from "@essence-community/constructor-share/types";
import {StyleRules} from "@material-ui/core";
import {ClassNames} from "./Tabs.types";

export function tabsDarkTheme(theme: IEssenceTheme): StyleRules<ClassNames> {
    return {
        "center-hbox": {
            "&$root::before": {
                backgroundColor: "#42455c",
                bottom: 0,
                // eslint-disable-next-line prettier/prettier
                content: "\"\"",
                height: 2,
                left: 4,
                position: "absolute",
                right: 4,
            },
            marginLeft: 58,
            marginTop: 4,
        },
        "center-vbox": {
            "&$root::before": {
                backgroundColor: "#42455c",
                bottom: 0,
                // eslint-disable-next-line prettier/prettier
                content: "\"\"",
                height: 2,
                left: 4,
                position: "absolute",
                right: 4,
            },
            marginLeft: 58,
            marginTop: 4,
        },
        "left-hbox": {
            flexDirection: "column",
            width: 264,
        },
        "left-vbox": {
            flexDirection: "column",
            width: 36,
        },
        popoverButton: {
            "&$popoverButtonActive": {
                background: theme.palette.primary.main,
                borderColor: "#42455c",
                fill: theme.essence.palette.text.light,
            },
            "&:hover": {
                backgroundColor: theme.palette.primary.light,
            },
            backgroundColor: "#42455c",
            border: "2px solid transparent",
            borderBottom: "none",
            borderRadius: theme.spacing(1, 1, 0, 0),
            fill: theme.palette.primary.main,
            height: 32,
            margin: theme.spacing(0.5, 0.5, 0),
            minHeight: 32,
            width: 36,
            zIndex: 1,
        },
        popoverButtonActive: {},
        popoverButtonIcon: {
            color: theme.palette.common.white,
        },
        "right-hbox": {
            flexDirection: "column",
            width: 264,
        },
        "right-vbox": {
            flexDirection: "column",
            width: 36,
        },
        root: {},
    };
}
