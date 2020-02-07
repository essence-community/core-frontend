import {IEssenceTheme} from "@essence-community/constructor-share";
import {StyleRules} from "@material-ui/core";
import {TabPanelPosition} from "../../TabPanel.types";

export function tabDarkStyles(theme: IEssenceTheme): StyleRules<"rootTheme" | TabPanelPosition> {
    return {
        "center-hbox": {
            "&$rootTheme": {
                borderBottom: "none",
            },
            borderRadius: theme.spacing(1, 1, 0, 0),
            height: 32,
            margin: theme.spacing(0.5, 0.5, 0),
            minHeight: 32,
        },
        "center-vbox": {
            "&$rootTheme": {
                borderBottom: "none",
            },
            borderRadius: theme.spacing(1, 1, 0, 0),
            height: 32,
            margin: theme.spacing(0.5, 0.25, 0),
            minHeight: 32,
        },
        "left-hbox": {
            "&$rootTheme": {
                borderRight: "none",
            },
            borderRadius: theme.spacing(0.5, 0, 0, 0.5),
            justifyContent: "flex-end",
            margin: theme.spacing(0.25, 0),
            paddingRight: theme.spacing(0.5),
        },
        "left-vbox": {
            "& $label": {
                writingMode: "vertical-rl",
            },
            "&$rootTheme": {
                borderRight: "none",
            },
            borderRadius: theme.spacing(0.5, 0, 0, 0.5),
            margin: theme.spacing(0.25, 0),
        },
        "right-hbox": {
            "&$rootTheme": {
                borderLeft: "none",
            },
            borderRadius: theme.spacing(0, 0.5, 0.5, 0),
            margin: theme.spacing(0.25, 0),
            paddingLeft: theme.spacing(0.5),
        },
        "right-vbox": {
            "& $label": {
                writingMode: "vertical-rl",
            },
            "&$rootTheme": {
                borderLeft: "none",
            },
            borderRadius: theme.spacing(0, 0.5, 0.5, 0),
            margin: theme.spacing(0.25, 0),
        },
        rootTheme: {
            "& $label": {
                color: theme.palette.common.white,
            },
            "&$active": {
                backgroundColor: theme.palette.primary.main,
                borderColor: "#42455c",
                zIndex: 1,
            },
            "&:hover": {
                backgroundColor: theme.palette.primary.light,
            },
            backgroundColor: "#42455c",
            border: "2px solid transparent",
        },
    };
}
