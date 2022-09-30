import {makeStyles} from "@material-ui/core";
import {IEssenceTheme} from "@essence-community/constructor-share";
import {tabsLightTheme} from "./Tabs.light.styles";
import {tabsDarkTheme} from "./Tabs.dark.styles";

export const useStyles = makeStyles(
    (theme: IEssenceTheme) => ({
        grow: {
            flexGrow: 1,
        },
        popoverButtonOpen: {},
        rootDefault: {
            display: "flex",
            flexDirection: "row",
            flexWrap: "nowrap",
            outline: "none",
            position: "relative",
        },
        ...(theme.essence.layoutTheme === 1 ? tabsLightTheme(theme) : tabsDarkTheme(theme)),
    }),
    {
        name: "EssenceTabPanelTabs",
    },
);
