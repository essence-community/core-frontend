import {IEssenceTheme} from "@essence-community/constructor-share/types";
import {StyleRules} from "@material-ui/core";
import {ClassNames} from "./Tabs.types";

export function tabsLightTheme(theme: IEssenceTheme): StyleRules<ClassNames> {
    return {
        "center-hbox": {
            marginTop: 4,
        },
        "center-vbox": {
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
                "&:after": {
                    backgroundColor: "#fff0e1",
                },
                "&:before": {
                    backgroundColor: "#fff0e1",
                },
            },
            "&$popoverButtonOpen": {
                "&:hover": {
                    borderBottomColor: "transparent",
                    borderRadius: "3px 3px 0 0",
                },
            },
            "&:after": {
                bottom: 0,
                // eslint-disable-next-line quotes
                content: '""',
                left: 8,
                position: "absolute",
                right: 0,
                top: 2,
                zIndex: -1,
            },
            "&:before": {
                borderLeft: `1px solid ${theme.palette.secondary.main}`,
                borderTop: `1px solid ${theme.palette.secondary.main}`,
                borderTopLeftRadius: 6,
                bottom: 0,
                // eslint-disable-next-line quotes
                content: '""',
                left: -5,
                position: "absolute",
                right: 10,
                top: 0,
                transform: "skewX(-30deg)",
                zIndex: -1,
            },
            "&:hover": {
                "&:after": {
                    backgroundColor: "#e9ecf4",
                },
                "&:before": {
                    backgroundColor: "#e9ecf4",
                },
                background: "none",
            },
            borderRight: `1px solid ${theme.palette.secondary.main}`,
            color: theme.palette.primary.main,
            height: 36,
            position: "relative",
            width: 36,
        },
        popoverButtonActive: {},
        popoverButtonIcon: {},
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
