import {action, makeObservable} from "mobx";
import {
    VAR_RECORD_PAGE_OBJECT_ID,
    VAR_RECORD_QUERY_ID,
    VAR_SETTING_SMART_MASK_QUERY,
    VAR_RECORD_PARENT_ID,
} from "../../constants";
import {IRecordsModel, IGlobalRecordsModel, IPageModel, IApplicationModel} from "../../types";
import {RecordsModel} from "../RecordsModel";
import {settingsStore} from "../SettingsModel";

interface IGlobalRecordsModelProps {
    pageStore: IPageModel | null;
    applicationStore: IApplicationModel | null;
}

export class GlobalRecordsModel implements IGlobalRecordsModel {
    indentityDocTypeRecordsStore: IRecordsModel;

    constructor(props: IGlobalRecordsModelProps) {
        this.indentityDocTypeRecordsStore = new RecordsModel(
            {
                [VAR_RECORD_PAGE_OBJECT_ID]: settingsStore.settings[VAR_SETTING_SMART_MASK_QUERY],
                [VAR_RECORD_PARENT_ID]: "root",
                [VAR_RECORD_QUERY_ID]: settingsStore.settings[VAR_SETTING_SMART_MASK_QUERY],
                type: "NONE",
            },
            props,
        );
        makeObservable(this);
    }

    // Make promise all for parallel
    loadAllStoresAction = action("loadAllStoresAction", async () => {
        if (settingsStore.settings[VAR_SETTING_SMART_MASK_QUERY]) {
            await this.indentityDocTypeRecordsStore.loadRecordsAction();
        }
    });

    clearAllStoresAction = action("clearAllStoresAction", () => {
        if (settingsStore.settings[VAR_SETTING_SMART_MASK_QUERY]) {
            this.indentityDocTypeRecordsStore.clearRecordsAction();
        }
    });
}
