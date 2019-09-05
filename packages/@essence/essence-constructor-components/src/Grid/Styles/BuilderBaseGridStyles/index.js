// @flow
import {getThemeStyles} from "../../../Theme/utils";
import BuilderBaseGridStyles from "./BuilderBaseGridStyles";
import BuilderBaseGridStylesDark from "./BuilderBaseGridStylesDark";
import BuilderBaseGridStylesLight from "./BuilderBaseGridStylesLight";

export default getThemeStyles(
    {
        dark: BuilderBaseGridStylesDark,
        light: BuilderBaseGridStylesLight,
    },
    BuilderBaseGridStyles,
);
