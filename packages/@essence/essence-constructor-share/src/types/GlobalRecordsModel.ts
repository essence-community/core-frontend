import {IRecordsModel} from "./RecordsModel";

export interface IGlobalRecordsModel {
    indentityDocTypeRecordsStore: IRecordsModel;
    loadAllStoresAction: () => void;
    clearAllStoresAction: () => void;
}
