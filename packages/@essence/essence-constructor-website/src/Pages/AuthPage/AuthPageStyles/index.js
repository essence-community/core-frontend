// @flow
import {getThemeStyles} from "@essence-community/constructor-components";
import AuthPageStyles from "./AuthPageStyles";
import AuthPageStylesDark from "./AuthPageStylesDark";
import AuthPageStylesLight from "./AuthPageStylesLight";

export default getThemeStyles(
    {
        dark: AuthPageStylesDark,
        light: AuthPageStylesLight,
    },
    AuthPageStyles,
);
