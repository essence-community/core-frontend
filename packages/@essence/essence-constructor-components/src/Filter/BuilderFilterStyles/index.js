import {getThemeStyles} from "../../Theme/utils";
import BuilderFilterStylesDark from "./BuilderFilterStylesDark";
import BuilderFilterStylesLight from "./BuilderFilterStylesLight";

export default getThemeStyles({
    dark: BuilderFilterStylesDark,
    light: BuilderFilterStylesLight,
});
