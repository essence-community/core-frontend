import {IBuilderConfig, FieldValue, IPageModel} from "../../types";
import {parseMemoize} from "../../utils";
import {VAR_RECORD_MASTER_ID} from "../../constants";

interface IIsDisabledProps {
    bc: IBuilderConfig;
    disabled?: boolean;
    pageStore: IPageModel;
    getValue: (key: string) => FieldValue;
}

export function isDisabled({bc, disabled, getValue, pageStore}: IIsDisabledProps): boolean {
    const {reqsel, disabledrules, disabledemptymaster, type} = bc;
    const masterId = bc[VAR_RECORD_MASTER_ID];

    if (disabledrules) {
        return Boolean(parseMemoize(disabledrules).runer({get: getValue}));
    }

    if (reqsel === "true" && masterId) {
        const masterStore = pageStore.stores.get(masterId);

        if (masterStore) {
            if (masterStore.bc && masterStore.bc.collectionvalues === "array" && type === "IFIELD") {
                return masterStore.selectedEntries ? masterStore.selectedEntries.length === 0 : false;
            }

            if (typeof masterStore.selectedRecord !== "undefined") {
                const recordId = masterStore.selectedRecord?.[masterStore.recordId];

                return typeof recordId == "string" && recordId.indexOf("auto-") === 0;
            }

            if (masterStore.recordsStore) {
                const recordId = masterStore.recordsStore.selectedRecord?.[masterStore.recordId];

                return typeof recordId == "string" && recordId.indexOf("auto-") === 0;
            }
        }
    }

    if (disabledemptymaster === "true" && masterId) {
        const masterStore = pageStore.stores.get(masterId);

        if (masterStore && masterStore.recordsStore) {
            return masterStore.recordsStore.records.length === 0;
        }
    }

    return Boolean(disabled);
}
