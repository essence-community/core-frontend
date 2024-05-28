import {IApplicationModel, IPageModel, IBuilderConfig} from "@essence-community/constructor-share/types";
import {IPopoverContext, IWindowContext} from "@essence-community/constructor-share/context";
import {IForm} from "@essence-community/constructor-share/Form";

export interface IHanderOptions {
    applicationStore: IApplicationModel;
    pageStore: IPageModel;
    bc: IBuilderConfig;
    files?: File[];
    form?: IForm;
    popoverCtx?: IPopoverContext;
    windowCtx?: IWindowContext;
}
export type Handler = Record<string, (options: IHanderOptions) => void>;
