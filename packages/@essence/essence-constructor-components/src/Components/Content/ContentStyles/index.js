// @flow
import {getThemeStyles} from "../../../Theme/utils";
import ContentStyles from "./ContentStyles";
import ContentStylesDark from "./ContentStylesDark";
import ContentStylesLight from "./ContentStylesLight";

export default getThemeStyles(
    {
        dark: ContentStylesDark,
        light: ContentStylesLight,
    },
    ContentStyles,
);
