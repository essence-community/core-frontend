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
    reloadPageAction(pageId: string): void;
    setPageAction(pageId: string, isActiveRedirect: boolean): Promise<false | IPageModel>;
    removePageAction(pageId: string): void;
    removePageOtherAction(ckPageLost: string): void;
    removeAllPagesAction(): void;
    removeAllPagesRightAction(pageId: string): void;
    openCloseExpansionAction(ckId: string): void;
    restorePagesAction(login: string): void;
    movePages(dragIndex: number, hoverIndex: number): void;
}
