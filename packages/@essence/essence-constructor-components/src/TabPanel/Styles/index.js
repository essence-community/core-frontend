// @flow
import {getThemeStyles} from "../../Theme/utils";
import {StyleTabPanelDark} from "./StyleTabPanelDark";
import {StyleTabPanelLight} from "./StyleTabPanelLight";

export default getThemeStyles(
    {
        dark: StyleTabPanelDark,
        light: StyleTabPanelLight,
    },
    () => ({
        flexGrow: {
            flexGrow: "1",
        },
        listTabs: {
            display: "flex",
            flexDirection: "column-reverse",
        },
        tabsContainer: {
            outline: "none",
        },
    }),
);
