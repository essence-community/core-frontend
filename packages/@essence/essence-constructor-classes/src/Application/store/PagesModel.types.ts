import {IPageModel} from "@essence-community/constructor-share/types/PageModel";

export interface IStoreOpenPage {
    pageId: IPageModel["pageId"];
    initParamPage?: IPageModel["initParamPage"];
}
