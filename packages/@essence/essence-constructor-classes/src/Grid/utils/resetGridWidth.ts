import {VAR_RECORD_PAGE_OBJECT_ID} from "@essence-community/constructor-share/constants";
import {WIDTH_MAP} from "../constants";
import {setWidthForZeroWidthCol, updatePercentColumnsWidth} from "../stores/GridModel/actions";
import {IGridModel} from "../stores/GridModel/GridModel.types";

export function resetGridWidth(gridStore: IGridModel) {
    const columnsWithZeroWidth: string[] = [];

    gridStore.columnsWidth.clear();
    gridStore.gridColumns.forEach(({[VAR_RECORD_PAGE_OBJECT_ID]: ckPageObject, width, datatype}) => {
        const colWidth = width || (datatype && WIDTH_MAP[datatype]);

        if (colWidth) {
            gridStore.columnsWidth.set(ckPageObject, colWidth);
        } else if (columnsWithZeroWidth.indexOf(ckPageObject) === -1) {
            columnsWithZeroWidth.push(ckPageObject);
        }
    });

    if (columnsWithZeroWidth.length > 0) {
        setWidthForZeroWidthCol(gridStore, columnsWithZeroWidth);
    } else {
        updatePercentColumnsWidth(gridStore, "");
    }
}
