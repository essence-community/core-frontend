import {getThemeStyles} from "../../../Theme/utils";
import BuilderPanelEditingButtonsStyles from "./BuilderPanelEditingButtonsStyles";
import BuilderPanelEditingButtonsStylesDark from "./BuilderPanelEditingButtonsStylesDark";
import BuilderPanelEditingButtonsStylesLight from "./BuilderPanelEditingButtonsStylesLight";

export default getThemeStyles(
    {
        dark: BuilderPanelEditingButtonsStylesDark,
        light: BuilderPanelEditingButtonsStylesLight,
    },
    BuilderPanelEditingButtonsStyles,
);
