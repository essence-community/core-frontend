// @flow
import {type PageModelType} from "../PageModel";
import {type RecordsModelType} from "../RecordsModel";
import {type ApplicationModelType} from "../StoreTypes";

export type ConstructorType = {
    pageStore: PageModelType,
};

export interface GlobalRecordsModelInterface {
    +indentityDocTypeRecordsStore: RecordsModelType;
    constructor(options: ConstructorType): void;
    +loadAllStoresAction: (applicationStore: ApplicationModelType) => void;
    +clearAllStoresAction: () => void;
}

export type GlobalRecordsModelType = GlobalRecordsModelInterface;
