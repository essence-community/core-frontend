import {IBuilderConfig} from "./Builder";
import {IPageModel} from "./PageModel";
import {IWindowModel} from "./WindowModel";

/**
 * Props for base class
 */
export interface IClassProps {
    bc: IBuilderConfig;
    pageStore: IPageModel;
    hidden?: boolean;
    disabled?: boolean;
    readOnly?: boolean;
    visible: boolean;
}

export interface IWindowClassProps extends IClassProps {
    store: IWindowModel;
}
