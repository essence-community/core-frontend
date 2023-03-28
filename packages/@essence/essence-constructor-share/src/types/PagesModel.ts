// eslint-disable-next-line import/named
import {IObservableArray, ObservableMap} from "mobx";
import {IGlobalRecordsModel} from "./GlobalRecordsModel";
import {IPageModel, IApplicationModel} from ".";

export interface IPagesModel {
    pages: IObservableArray<IPageModel>;
    visiblePages: IPageModel[];
    activePage: IPageModel | null;
    expansionRecords: ObservableMap<string, boolean>;
    applicationStore: IApplicationModel;
    globalRecordsStore: IGlobalRecordsModel;
    loadActivePage(pageId: string, autoset: boolean, isActiveRedirect: boolean): Promise<IPageModel>;
    reloadPageAction(pageId: string | IPageModel): void;
    setPageAction(
        pageId: string | IPageModel,
        isActiveRedirect: boolean,
        initParams?: Record<string, any>,
    ): Promise<false | IPageModel>;
    removePageAction(pageId: string | IPageModel): void;
    removePageOtherAction(ckPageLost: string | IPageModel): void;
    removeAllPagesAction(): void;
    removeAllPagesRightAction(pageId: string | IPageModel): void;
    openCloseExpansionAction(ckId: string | IPageModel): void;
    restorePagesAction(login: string): void;
    movePages(dragIndex: number, hoverIndex: number): void;
}
