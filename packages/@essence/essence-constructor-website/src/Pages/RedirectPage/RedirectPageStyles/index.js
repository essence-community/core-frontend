// @flow
import {getThemeStyles} from "@essence/essence-constructor-components";
import RedirectPageStylesDark from "./RedirectPageStylesDark";
import RedirectPageStylesLight from "./RedirectPageStylesLight";

export default getThemeStyles({
    dark: RedirectPageStylesDark,
    light: RedirectPageStylesLight,
});
