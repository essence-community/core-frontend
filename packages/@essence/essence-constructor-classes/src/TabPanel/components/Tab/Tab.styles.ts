import {makeStyles} from "@material-ui/core";
import {IEssenceTheme} from "@essence-community/constructor-share/types";
import {tabDarkStyles} from "./Tab.dark.styles";
import {tabLightStyles} from "./Tab.light.styles";

export const useStyles = makeStyles(
    (theme: IEssenceTheme) => ({
        active: {},
        hidden: {},
        label: {
            color: theme.palette.text.primary,
            fontSize: 13,
            fontWeight: "bold",
            overflow: "hidden",
            padding: theme.spacing(0, 1),
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
        },
        root: {
            "&$active": {
                opacity: 1,
            },
            "&$hidden": {
                display: "none",
            },
            alignItems: "center",
            cursor: "pointer",
            display: "flex",
            opacity: 0.7,
            position: "relative",
        },
        ...(theme.palette.type === "light" ? tabLightStyles(theme) : tabDarkStyles(theme)),
    }),
    {
        name: "EssenceTabPanelTab",
    },
);
