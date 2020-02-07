import {makeStyles} from "@material-ui/core";
import {IEssenceTheme} from "@essence-community/constructor-share/types";
import {tabDarkStyles} from "./Tab.dark.styles";
import {tabLightStyles} from "./Tab.light.styles";

export const useStyles = makeStyles(
    (theme: IEssenceTheme) => ({
        active: {},
        label: {
            color: theme.palette.text.secondary,
            fontSize: 13,
            fontWeight: "bold",
            overflow: "hidden",
            padding: theme.spacing(0, 1),
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
        },
        root: {
            alignItems: "center",
            cursor: "pointer",
            display: "flex",
            height: 36,
            minHeight: 36,
            minWidth: 70,
        },
        ...(theme.palette.type === "light" ? tabLightStyles(theme) : tabDarkStyles(theme)),
    }),
    {
        name: "EssenceTabPanelTab",
    },
);
