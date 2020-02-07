import {IEssenceTheme} from "@essence-community/constructor-share";
import {StyleRules} from "@material-ui/core";
import {TabPanelPosition} from "../../TabPanel.types";

export function tabLightStyles(theme: IEssenceTheme): StyleRules<"rootTheme" | TabPanelPosition> {
    return {
        "center-hbox": {
            "& $label": {
                transform: "skewX(-30deg)",
            },
            "&$active": {
                backgroundColor: "#fff0e1",
                borderRight: `2px solid ${theme.palette.secondary.main}`,
                borderTop: `2px solid ${theme.palette.secondary.main}`,
            },
            "&:hover": {
                background: "#e9ecf4",
            },
            borderRight: `1px solid ${theme.palette.secondary.main}`,
            borderTop: `1px solid ${theme.palette.secondary.main}`,
            borderTopRightRadius: 6,
            height: 35,
            marginRight: 15,
            minHeight: 35,
            transform: "skewX(30deg)",
        },
        "center-vbox": {
            "& $label": {
                transform: "skewX(-30deg)",
            },
            "&$active": {
                backgroundColor: "#fff0e1",
                borderRight: `2px solid ${theme.palette.secondary.main}`,
                borderTop: `2px solid ${theme.palette.secondary.main}`,
            },
            "&:hover": {
                background: "#e9ecf4",
            },
            borderRight: `1px solid ${theme.palette.secondary.main}`,
            borderTop: `1px solid ${theme.palette.secondary.main}`,
            borderTopRightRadius: 6,
            height: 35,
            marginRight: 15,
            minHeight: 35,
            transform: "skewX(30deg)",
        },
        "left-hbox": {
            "& $label": {
                textAlign: "end",
                transform: "skewX(30deg)",
            },
            "&$active": {
                borderLeft: `2px solid ${theme.palette.secondary.main}`,
                borderTop: `1px solid ${theme.palette.secondary.main}`,
            },
            "&:last-child": {
                "&$active": {
                    borderTop: `2px solid ${theme.palette.secondary.main}`,
                },
                borderTop: `1px solid ${theme.palette.secondary.main}`,
            },
            borderBottom: `1px solid ${theme.palette.secondary.main}`,
            borderLeft: `1px solid ${theme.palette.secondary.main}`,
            borderRight: "none",
            borderTop: "none",
            borderTopLeftRadius: 6,
            borderTopRightRadius: 0,
            marginLeft: 24,
            marginRight: -20,
            transform: "skewX(-30deg)",
        },
        "left-vbox": {},
        "right-hbox": {},
        "right-vbox": {},
        rootTheme: {},
    };
}
