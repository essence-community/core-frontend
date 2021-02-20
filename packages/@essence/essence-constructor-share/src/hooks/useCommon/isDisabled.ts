import {IBuilderConfig, FieldValue, IPageModel} from "../../types";
import {parseMemoize} from "../../utils";
import {VAR_RECORD_MASTER_ID} from "../../constants";

interface IIsDisabledProps {
    bc: IBuilderConfig;
    pageStore: IPageModel;
    getValue: (key: string) => FieldValue;
}

function isDisabledMaster(pageStore: IPageModel, bc: IBuilderConfig): boolean {
    const masterId = bc[VAR_RECORD_MASTER_ID];

    if (bc.reqsel && masterId) {
        const masterStore = pageStore.stores.get(masterId);

        if (masterStore) {
            if (masterStore.bc && masterStore.bc.collectionvalues === "array" && bc.type === "IFIELD") {
                return masterStore.selectedEntries ? masterStore.selectedEntries.length === 0 : false;
            }

            if (typeof masterStore.selectedRecord !== "undefined") {
                const recordId = masterStore.selectedRecord?.[masterStore.recordId];

                return !masterStore.selectedRecord || (typeof recordId == "string" && recordId.indexOf("auto-") === 0);
            }

            if (masterStore.recordsStore) {
                const recordId = masterStore.recordsStore.selectedRecord?.[masterStore.recordId];

                return (
                    (masterStore.bc.selmode === "MULTI" || masterStore.bc.collectionvalues === "array"
                        ? masterStore.recordsStore.selectedRecords.size === 0
                        : !masterStore.recordsStore.selectedRecord) ||
                    (typeof recordId == "string" && recordId.indexOf("auto-") === 0)
                );
            }
        }
    }

    return false;
}

export function isDisabled({bc, getValue, pageStore}: IIsDisabledProps): boolean {
    const {disabled = false, disabledrules, disabledemptymaster} = bc;
    const masterId = bc[VAR_RECORD_MASTER_ID];

    if (isDisabledMaster(pageStore, bc)) {
        return true;
    }

    if (disabledrules) {
        return Boolean(parseMemoize(disabledrules).runer({get: getValue}));
    }

    if (disabledemptymaster && masterId) {
        const masterStore = pageStore.stores.get(masterId);

        if (masterStore && masterStore.recordsStore) {
            return masterStore.recordsStore.records.length === 0;
        }
    }

    return disabled;
}
