// @flow
import {getThemeStyles} from "@essence-community/constructor-components";
import RedirectPageStylesDark from "./RedirectPageStylesDark";
import RedirectPageStylesLight from "./RedirectPageStylesLight";

export default getThemeStyles({
    dark: RedirectPageStylesDark,
    light: RedirectPageStylesLight,
});
