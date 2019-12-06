import {getThemeStyles} from "../../Theme/utils";
import {StyleRoadMapBase} from "./StyleRoadMapBase";
import {StyleRoadMapDark} from "./StyleRoadMapDark";
import {StyleRoadMapLight} from "./StyleRoadMapLight";

export default getThemeStyles(
    {
        dark: StyleRoadMapDark,
        light: StyleRoadMapLight,
    },
    StyleRoadMapBase,
);
