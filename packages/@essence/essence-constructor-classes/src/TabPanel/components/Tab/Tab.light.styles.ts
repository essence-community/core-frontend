import {IEssenceTheme} from "@essence-community/constructor-share";
import {StyleRules} from "@material-ui/core";
import {TabPanelPosition} from "../../TabPanel.types";

// eslint-disable-next-line max-lines-per-function
export function tabLightStyles(theme: IEssenceTheme): StyleRules<"rootTheme" | TabPanelPosition> {
    return {
        "center-hbox": {
            "& $label": {
                transform: "skewX(-30deg)",
            },
            "&$active": {
                backgroundColor: theme.essence.palette.tab.active,
                borderRight: `2px solid ${theme.palette.secondary.main}`,
                borderTop: `2px solid ${theme.palette.secondary.main}`,
            },
            "&:not($disabled):hover": {
                background: theme.essence.palette.tab.hover,
            },
            borderRight: `1px solid ${theme.palette.secondary.main}`,
            borderTop: `1px solid ${theme.palette.secondary.main}`,
            borderTopRightRadius: 6,
            height: 35,
            marginRight: 15,
            minHeight: 35,
            minWidth: 70,
            transform: "skewX(30deg)",
        },
        "center-vbox": {
            "& $label": {
                transform: "skewX(-30deg)",
            },
            "&$active": {
                backgroundColor: theme.essence.palette.tab.active,
                borderRight: `2px solid ${theme.palette.secondary.main}`,
                borderTop: `2px solid ${theme.palette.secondary.main}`,
            },
            "&:not($disabled):hover": {
                background: theme.essence.palette.tab.hover,
            },
            borderRight: `1px solid ${theme.palette.secondary.main}`,
            borderTop: `1px solid ${theme.palette.secondary.main}`,
            borderTopRightRadius: 6,
            height: 35,
            marginRight: 15,
            minHeight: 35,
            minWidth: 70,
            transform: "skewX(30deg)",
        },
        "left-hbox": {
            "& $label": {
                alignItems: "center",
                display: "flex",
            },
            "&$active": {
                "& $label": {
                    backgroundColor: theme.essence.palette.tab.active,
                },
                "&:before": {
                    backgroundColor: theme.essence.palette.tab.active,
                    borderWidth: 2,
                },
                "&:not(:first-child):before": {
                    borderTop: `1px solid ${theme.palette.secondary.main}`,
                },
                borderWidth: 2,
            },
            "&:before": {
                borderLeft: `1px solid ${theme.palette.secondary.main}`,
                borderTopLeftRadius: 6,
                bottom: 0,
                // eslint-disable-next-line prettier/prettier
                content: "\"\"",
                left: 10,
                position: "absolute",
                right: 9,
                top: 0,
                transform: "skewX(-30deg)",
                zIndex: -1,
            },
            "&:first-child": {
                "&:before": {
                    borderTop: `1px solid ${theme.palette.secondary.main}`,
                },
            },
            "&:not($disabled):hover": {
                "& $label": {
                    backgroundColor: theme.essence.palette.tab.hover,
                },
                "&:before": {
                    backgroundColor: theme.essence.palette.tab.hover,
                },
            },
            alignItems: "stretch",
            borderBottom: `1px solid ${theme.palette.secondary.main}`,
            height: 36,
            justifyContent: "flex-end",
            minHeight: 36,
            minWidth: 70,
            padding: "2px 0 0 22px",
        },
        "left-vbox": {
            "& $label": {
                transform: "skewY(30deg) rotate(180deg)",
                writingMode: "vertical-rl",
            },
            "&$active": {
                backgroundColor: theme.essence.palette.tab.active,
                borderWidth: 2,
            },
            "&:not($disabled):hover": {
                backgroundColor: theme.essence.palette.tab.hover,
            },
            borderLeft: `1px solid ${theme.palette.secondary.main}`,
            borderTop: `1px solid ${theme.palette.secondary.main}`,
            borderTopLeftRadius: 6,
            justifyContent: "stretch",
            marginTop: 11,
            padding: "10px 0",
            transform: "skewY(-30deg)",
        },
        "right-hbox": {
            "& $label": {
                alignItems: "center",
                display: "flex",
            },
            "&$active": {
                "& $label": {
                    backgroundColor: theme.essence.palette.tab.active,
                },
                "&:before": {
                    backgroundColor: theme.essence.palette.tab.active,
                    borderWidth: 2,
                },
                borderWidth: 2,
            },
            "&:before": {
                borderRight: `1px solid ${theme.palette.secondary.main}`,
                borderTopRightRadius: 6,
                bottom: 0,
                // eslint-disable-next-line prettier/prettier
                content: "\"\"",
                left: 9,
                position: "absolute",
                right: 10,
                top: 0,
                transform: "skewX(30deg)",
                zIndex: -1,
            },
            "&:first-child": {
                "&:before": {
                    borderTop: `1px solid ${theme.palette.secondary.main}`,
                },
            },
            "&:not($disabled):hover": {
                "& $label": {
                    backgroundColor: theme.essence.palette.tab.hover,
                },
                "&:before": {
                    backgroundColor: theme.essence.palette.tab.hover,
                },
            },
            alignItems: "stretch",
            borderBottom: `1px solid ${theme.palette.secondary.main}`,
            height: 36,
            minHeight: 36,
            minWidth: 70,
            padding: "2px 22px 0 0",
        },
        "right-vbox": {
            "& $label": {
                transform: "skewY(-30deg)",
                writingMode: "vertical-rl",
            },
            "&$active": {
                backgroundColor: theme.essence.palette.tab.active,
                borderWidth: 2,
            },
            "&:not($disabled):hover": {
                backgroundColor: theme.essence.palette.tab.hover,
            },
            borderRight: `1px solid ${theme.palette.secondary.main}`,
            borderTop: `1px solid ${theme.palette.secondary.main}`,
            borderTopRightRadius: 6,
            justifyContent: "stretch",
            marginTop: 11,
            padding: "10px 0",
            transform: "skewY(30deg)",
        },
        rootTheme: {},
    };
}
