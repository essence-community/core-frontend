// @flow
import {getThemeStyles} from "../../Theme/utils";
import {BuilderIframeStylesLight} from "./BuilderIframeStylesLight";
import {BuilderIframeStyles} from "./BuilderIframeStyles";

export default getThemeStyles(
    {
        light: BuilderIframeStylesLight,
    },
    BuilderIframeStyles,
);
