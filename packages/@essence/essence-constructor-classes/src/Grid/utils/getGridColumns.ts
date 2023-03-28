import {IBuilderConfig} from "@essence-community/constructor-share/types";
import {VAR_RECORD_PAGE_OBJECT_ID, VAR_RECORD_PARENT_ID} from "@essence-community/constructor-share/constants";

export function getGridColumns(gridBc: IBuilderConfig): IBuilderConfig[] {
    const {columns = [], detail} = gridBc;
    const gridColumns = columns;

    if (detail && detail.length && gridColumns.findIndex((col: IBuilderConfig) => col.datatype === "detail") === -1) {
        return [
            {
                [VAR_RECORD_PAGE_OBJECT_ID]: "detail",
                [VAR_RECORD_PARENT_ID]: gridBc[VAR_RECORD_PAGE_OBJECT_ID],
                datatype: "detail",
                hidden: detail[0].hidden,
                hiddenrules: detail[0].hiddenrules,
                type: "COLUMN",
                visible: detail[0].visible,
                visibleable: detail[0].visibleable,
                visiblerule: detail[0].visiblerule,
            },
            ...gridColumns,
        ];
    }

    return gridColumns;
}
