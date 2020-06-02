import {IBuilderConfig} from "@essence-community/constructor-share/types";
import {VAR_RECORD_PAGE_OBJECT_ID, VAR_RECORD_PARENT_ID} from "@essence-community/constructor-share/constants";

export function getGridColumns(gridBc: IBuilderConfig): IBuilderConfig[] {
    const {columns = [], detail} = gridBc;
    const gridColumns = columns.filter((column) => column.visible);

    if (detail && gridColumns.findIndex((col: IBuilderConfig) => col.datatype === "detail") === -1) {
        return [
            {
                [VAR_RECORD_PAGE_OBJECT_ID]: "detail",
                [VAR_RECORD_PARENT_ID]: gridBc[VAR_RECORD_PAGE_OBJECT_ID],
                datatype: "detail",
                type: "COLUMN",
            },
            ...gridColumns,
        ];
    }

    return gridColumns;
}
