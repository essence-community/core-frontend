import {IBuilderConfig} from "./Builder";
import {IPageModel} from "./PageModel";

export interface IModuleProps {
    bc: IBuilderConfig;
    pageStore: IPageModel;
    hidden?: boolean;
    disabled?: boolean;
    readOnly?: boolean;
    visible: boolean;
}
