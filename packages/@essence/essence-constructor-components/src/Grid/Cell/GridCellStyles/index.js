// @flow
import {getThemeStyles} from "../../../Theme/utils";
import {GridCellStyles} from "./GridCellStyles";
import {GridCellStylesDark} from "./GridCellStylesDark";
import {GridCellStylesLight} from "./GridCellStylesLight";

export default getThemeStyles(
    {
        dark: GridCellStylesDark,
        light: GridCellStylesLight,
    },
    GridCellStyles,
);
