// @flow
import {type GridColumnPropsType} from "./GridColumnTypes";

export const GridColumnBoolean = ({value}: GridColumnPropsType) => (value ? "Да" : "Нет");

export default GridColumnBoolean;
