// @flow
import {action, reaction} from "mobx";
import {RecordsModel, type RecordsModelType} from "../RecordsModel";
import {type ApplicationModelType} from "../StoreTypes";
import {type GlobalRecordsModelInterface, type ConstructorType} from "./GlobalRecordsModelType";

const INDENTITY_DOC_TYPES_BC = {
    ckPageObject: "dIdentityDocType",
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
                            ckQuery: settings.smartMaskQuery,
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
