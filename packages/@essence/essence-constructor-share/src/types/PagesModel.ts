// eslint-disable-next-line import/named
import {IObservableArray, ObservableMap} from "mobx";
import {IPageModel, IApplicationModel} from ".";

export interface IPagesModel {
    pages: IObservableArray<IPageModel>;
    activePage: IPageModel | null;
    expansionRecords: ObservableMap<string, boolean>;
    applicationStore: IApplicationModel;
    loadActivePage(ckPage: string, autoset: boolean, isActiveRedirect: boolean): Promise<IPageModel>;
    reloadPageAction(ckPage: string): void;
    setPageAction(ckPage: string, isActiveRedirect: boolean): Promise<false | IPageModel>;
    removePageAction(ckPage: string): void;
    removePageOtherAction(ckPageLost: string): void;
    removeAllPagesAction(): void;
    removeAllPagesRightAction(ckPage: string): void;
    openCloseExpansionAction(ckId: string): void;
    restorePagesAction(cvLogin: string): void;
    movePages(dragIndex: number, hoverIndex: number): void;
}
