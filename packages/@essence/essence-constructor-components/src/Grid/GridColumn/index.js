// @flow
import GridColumnCheckbox from "./GridColumnCheckbox";
import GridColumnIcon from "./GridColumnIcon";
import GridColumnBoolean from "./GridColumnBoolean";
import GridColumnDate from "./GridColumnDate";
import GridColumnText from "./GridColumnText";
import GridColumnDetailSchevron from "./GridColumnDetailSchevron";
import GridColumnTree from "./GridColumnTree";
import {type ColumnsMapType} from "./GridColumnTypes";

export const BaseGridColumn = GridColumnText;

export const columnsMap: ColumnsMapType = {
    boolean: GridColumnBoolean,
    checkbox: GridColumnCheckbox,
    date: GridColumnDate,
    detail: GridColumnDetailSchevron,
    icon: GridColumnIcon,
    tree: GridColumnTree,
};
