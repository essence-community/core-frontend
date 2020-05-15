import {
    VAR_RECORD_PARENT_ID,
    VAR_RECORD_MASTER_ID,
    VAR_RECORD_PAGE_OBJECT_ID,
    VAR_RECORD_OBJECT_ID,
    VAR_RECORD_DISPLAYED,
    VAR_RECORD_NAME,
} from "../../constants";
import {IBuilderConfig} from "../../types";

export function getDefaultWindowBc(bc: IBuilderConfig): IBuilderConfig {
    return {
        [VAR_RECORD_DISPLAYED]: "",
        [VAR_RECORD_MASTER_ID]: bc[VAR_RECORD_PAGE_OBJECT_ID],
        [VAR_RECORD_NAME]: `${bc[VAR_RECORD_NAME]}_gridwindow`,
        [VAR_RECORD_OBJECT_ID]: `${bc[VAR_RECORD_PAGE_OBJECT_ID]}_gridwindow`,
        [VAR_RECORD_PAGE_OBJECT_ID]: `${bc[VAR_RECORD_PAGE_OBJECT_ID]}_gridwindow`,
        [VAR_RECORD_PARENT_ID]: bc[VAR_RECORD_PAGE_OBJECT_ID],
        checkaddmore: bc.checkaddmore,
        ckwindow: "gridwindow",
        columns: bc.columns,
        detail: bc.detail,
        edittype: bc.edittype,
        stepnamenext: bc.stepnamenext,
        wintype: bc.wintype,
    };
}
