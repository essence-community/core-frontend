// @flow
import {getThemeStyles} from "../../../Theme/utils";
import ThemePanelWrapperStyles from "./ThemePanelWrapperStyles";
import ThemePanelWrapperStylesDark from "./ThemePanelWrapperStylesDark";
import ThemePanelWrapperStylesLight from "./ThemePanelWrapperStylesLight";

export default getThemeStyles(
    {
        dark: ThemePanelWrapperStylesDark,
        light: ThemePanelWrapperStylesLight,
    },
    ThemePanelWrapperStyles,
);
