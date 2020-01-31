// @flow
import {getThemeStyles} from "../../Theme/utils";
import {BuilderFormPanelStylesDark} from "./BuilderFormPanelStylesDark";
import {BuilderFormPanelStylesLight} from "./BuilderFormPanelStylesLight";

export default getThemeStyles(
    {
        dark: BuilderFormPanelStylesDark,
        light: BuilderFormPanelStylesLight,
    },
    {
        content: {
            width: "100%",
        },
        root: {
            position: "relative",
        },
    },
);
