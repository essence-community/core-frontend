import Form from "mobx-react-form";
import {IApplicationModel, IPageModel, IBuilderConfig} from "@essence-community/constructor-share/types";
import {IPopoverContext} from "@essence-community/constructor-share/context";

export interface IHanderOptions {
    applicationStore: IApplicationModel;
    pageStore: IPageModel;
    bc: IBuilderConfig;
    files?: File[];
    form?: typeof Form;
    popoverCtx: IPopoverContext;
}
export type Handler = Record<string, (options: IHanderOptions) => void>;
