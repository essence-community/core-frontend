interface ICheckAutoloadPropsType {
    bc: any;
    pageStore: any;
    recordsStore?: any;
}

export function checkAutoload({bc, recordsStore}: ICheckAutoloadPropsType) {
    if (!recordsStore || bc.datatype === "tree" || bc.datatype === "grid") {
        return false;
    }

    if (bc.autoload === "true" && (!bc.ckMaster || bc.reqsel !== "true")) {
        return true;
    }

    /*
     * If (!isEmpty(bc.ckMaster)) {
     *     return !isEmptyLodash(
     *         getMasterData(getMasterObject(bc.ckMaster, pageStore), bc.idproperty || "ck_id", pageStore.globalValues),
     *     );
     * }
     */

    return false;
}
