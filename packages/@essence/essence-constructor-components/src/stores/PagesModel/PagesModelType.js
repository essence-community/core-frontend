// @flow
import {type ApplicationModelType} from "../StoreTypes";
import {type RoutesModelType} from "../RoutesModel";
import {type PageModelType} from "../PageModel";
import {type CkIdType} from "../../BuilderType";

export type PagesModelPropsType = {
    applicationStore: ApplicationModelType,
    routesStore: RoutesModelType,
    history: History,
};

export interface PagesModelInterface {
    constructor(props: PagesModelPropsType): void;
    +pages: Array<PageModelType>;
    +activePage: ?PageModelType;
    +globalPageStore: PageModelType;
    +expansionRecords: Map<CkIdType, boolean>;
    +globalRecordsStore: any;
    +setPageAction: (pageId: string) => void;
    +removePageAction: (pageId: string) => void;
    +removeAllPagesAction: () => void;
    +openCloseExpansionAction: (ckId: string) => void;
    +reloadPageAction: (ckId: string) => void;
    +removePageOtherAction: (ckPageLost: string) => void;
    +removeAllPagesRightAction: (ckId: string) => void;
}

export type PagesModelType = PagesModelInterface;
