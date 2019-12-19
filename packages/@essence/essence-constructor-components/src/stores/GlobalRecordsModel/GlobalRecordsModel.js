// @flow
import {action, reaction} from "mobx";
import {VAR_RECORD_PAGE_OBJECT_ID, VAR_RECORD_QUERY_ID} from "@essence/essence-constructor-share/constants";
import {RecordsModel, type RecordsModelType} from "../RecordsModel";
import {type ApplicationModelType} from "../StoreTypes";
import {type GlobalRecordsModelInterface, type ConstructorType} from "./GlobalRecordsModelType";

const INDENTITY_DOC_TYPES_BC = {
    [VAR_RECORD_PAGE_OBJECT_ID]: "dIdentityDocType",
};

export class GlobalRecordsModel implements GlobalRecordsModelInterface {
    indentityDocTypeRecordsStore: RecordsModelType;

    disposers = [];

    constructor({pageStore}: ConstructorType) {
        this.disposers.push(
            reaction(
                () => pageStore.applicationStore.settingsStore.settings,
                (settings) => {
                    this.indentityDocTypeRecordsStore = new RecordsModel(
                        {
                            ...INDENTITY_DOC_TYPES_BC,
                            [VAR_RECORD_QUERY_ID]: settings.smartMaskQuery,
                        },
                        pageStore,
                    );
                },
            ),
        );
    }

    loadAllStoresAction = action("loadAllStoresAction", (applicationStore: ApplicationModelType) => {
        const {settingsStore} = applicationStore;

        if (settingsStore.settings.smartMaskQuery) {
            this.indentityDocTypeRecordsStore.loadRecordsAction();
        }
    });

    clearAllStoresAction = action("clearAllStoresAction", () => {
        this.indentityDocTypeRecordsStore.clearRecordsAction();
    });

    removeListeners = () => {
        this.disposers.forEach((disposer) => disposer());
        this.disposers = [];
    };
}
