import TextFieldStyle from "../../TextField/BuilderFieldStyle";
import {getThemeStyles} from "../../Theme/utils";
import {BuilderFilePanelStylesDark} from "./BuilderFilePanelStylesDark";
import {BuilderFilePanelStylesLight} from "./BuilderFilePanelStylesLight";

export default getThemeStyles(
    {
        dark: BuilderFilePanelStylesDark,
        light: BuilderFilePanelStylesLight,
    },
    TextFieldStyle,
);
