import {getThemeStyles} from "../../Theme/utils";
import BuilderWindowStyles from "./BuilderWindowStyles";
import BuilderWindowStylesDark from "./BuilderWindowStylesDark";
import BuilderWindowStylesLight from "./BuilderWindowStylesLight";

export default getThemeStyles(
    {
        dark: BuilderWindowStylesDark,
        light: BuilderWindowStylesLight,
    },
    BuilderWindowStyles,
);
