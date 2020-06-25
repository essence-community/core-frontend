import {IRecord} from "@essence-community/constructor-share/types";
import {isEmpty} from "@essence-community/constructor-share/utils";
import {VALUE_SELF_ROOT} from "@essence-community/constructor-share/constants";
import {IGridModel} from "../stores/GridModel/GridModel.types";
import {GRID_ROW_HEIGHT} from "../constants";
import {getGridCkId} from "./getGridCkId";
import {getAllVisibleGridRecords} from "./getAllVisibleGridRecords";

export async function gridScrollToRecordAction(params: IRecord, gridStore: IGridModel) {
    const ckId = getGridCkId(params, gridStore.bc.getglobal) || gridStore.recordsStore.selectedRecordId;

    if (!isEmpty(ckId)) {
        if (ckId !== gridStore.recordsStore.selectedRecordId) {
            await gridStore.recordsStore.setSelectionAction(ckId);
        }

        gridStore.expandSelectedAction();

        const allVisibleRecords = getAllVisibleGridRecords(gridStore);
        const recordIndex = allVisibleRecords.findIndex((rec) => rec[gridStore.recordsStore.recordId] === ckId);

        if (recordIndex !== -1) {
            const tableContent = gridStore.refs.get("table-content");

            // Check visible row. If selected row is not visible then scroll to them
            if (tableContent instanceof HTMLDivElement && tableContent.parentNode instanceof HTMLDivElement) {
                const isRootNode =
                    gridStore.bc.type === "TREEGRID" && !gridStore.recordsStore.expansionRecords.get(VALUE_SELF_ROOT);
                const scrollTop = recordIndex * GRID_ROW_HEIGHT + (isRootNode ? GRID_ROW_HEIGHT : 0);
                const maxScroll = scrollTop - tableContent.parentNode.offsetHeight;

                if (scrollTop < tableContent.parentNode?.scrollTop || maxScroll > tableContent.parentNode.scrollTop) {
                    tableContent.parentNode.scrollTop = scrollTop;
                }
            }
        }
    }
}
