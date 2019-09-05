import {getThemeStyles} from "../../../Theme/utils";
import {BaseGridRowStyles} from "./BaseGridRowStyles";
import {BaseGridRowStylesDark} from "./BaseGridRowStylesDark";
import {BaseGridRowStylesLight} from "./BaseGridRowStylesLight";

export default getThemeStyles(
    {
        dark: BaseGridRowStylesDark,
        light: BaseGridRowStylesLight,
    },
    BaseGridRowStyles,
);
