// @flow
import {getThemeStyles} from "../../../Theme/utils";
import {InlineButtonsStylesLight} from "./InlineButtonsStylesLight";
import {InlineButtonsStylesDark} from "./InlineButtonsStylesDark";

export default getThemeStyles({
    dark: InlineButtonsStylesDark,
    light: InlineButtonsStylesLight,
});
