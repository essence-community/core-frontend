import {IEssenceTheme} from "@essence-community/constructor-share/types";
import {StyleRules} from "@material-ui/core";
import {ClassNames} from "./Tabs.types";

export function tabsDarkTheme(theme: IEssenceTheme): StyleRules<ClassNames> {
    return {
        "center-hbox": {
            "&$root::before": {
                bottom: 0,
                height: 2,
                left: 4,
                right: 4,
            },
            marginLeft: 58,
            marginTop: 4,
        },
        "center-vbox": {
            "&$root::before": {
                bottom: 0,
                height: 2,
                left: 4,
                right: 4,
            },
            marginLeft: 58,
            marginTop: 4,
        },
        "left-hbox": {
            "&$root::before": {
                bottom: 4,
                right: 0,
                top: 4,
                width: 2,
            },
            flexDirection: "column",
            width: 264,
        },
        "left-vbox": {
            "&$root::before": {
                bottom: 4,
                right: 0,
                top: 4,
                width: 2,
            },
            flexDirection: "column",
            width: 36,
        },
        popoverButton: {
            "&:hover": {
                backgroundColor: theme.palette.primary.light,
            },
            backgroundColor: "#42455c",
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
            "&$root::before": {
                bottom: 4,
                left: 0,
                top: 4,
                width: 2,
            },
            flexDirection: "column",
            width: 264,
        },
        "right-vbox": {
            "&$root::before": {
                bottom: 4,
                left: 0,
                top: 4,
                width: 2,
            },
            flexDirection: "column",
            width: 36,
        },
        root: {
            "&::before": {
                backgroundColor: "#42455c",
                bottom: 0,
                // eslint-disable-next-line prettier/prettier
                content: "\"\"",
                position: "absolute",
            },
        },
    };
}
