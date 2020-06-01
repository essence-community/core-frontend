import {IBuilderConfig, IPageModel} from "../types";
import {VAR_RECORD_MASTER_ID} from "../constants";
import {getMasterObject} from "../utils";

interface ICheckAutoloadPropsType {
    bc: IBuilderConfig;
    pageStore: IPageModel;
}

export function checkAutoload({bc, pageStore}: ICheckAutoloadPropsType) {
    if (bc.datatype === "tree" || bc.datatype === "grid") {
        return false;
    }

    if (bc.autoload && (!bc[VAR_RECORD_MASTER_ID] || !bc.reqsel)) {
        return true;
    }

    if (bc[VAR_RECORD_MASTER_ID] && pageStore) {
        const masterValues = getMasterObject(bc[VAR_RECORD_MASTER_ID], pageStore, bc.getmastervalue);

        return masterValues ? Object.keys(masterValues).length > 0 : false;
    }

    return false;
}
