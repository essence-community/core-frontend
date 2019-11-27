/*
 * Import isEmptyLodash from "lodash/isEmpty";
 * import {isEmpty} from "../utils";
 * import {getMasterData, getMasterObject} from "../models/RecordsModel/RecordsModelUtils";
 */
import {IBuilderConfig, IPageModel, IRecordsModel} from "../types";

interface ICheckAutoloadPropsType {
    bc: IBuilderConfig;
    pageStore: IPageModel;
    recordsStore?: IRecordsModel;
}

export function checkAutoload({bc, recordsStore}: ICheckAutoloadPropsType) {
    if (!recordsStore || bc.datatype === "tree" || bc.datatype === "grid") {
        return false;
    }

    if (bc.autoload === "true" && (!bc.ckMaster || bc.reqsel !== "true")) {
        return true;
    }

    /*
     * If (!isEmpty(bc.ckMaster) && pageStore) {
     *     return !isEmptyLodash(
     *         getMasterData(getMasterObject(bc.ckMaster, pageStore), bc.idproperty || "ck_id", pageStore.globalValues),
     *     );
     * }
     */

    return false;
}
