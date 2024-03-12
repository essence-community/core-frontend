import {IBuilderConfig} from "./Builder";
import {IPageModel} from "./PageModel";

/**
 * Props for base class
 */
export interface IClassProps<BC = IBuilderConfig> extends Record<string, any> {
    bc: BC;
    pageStore: IPageModel;
    hidden?: boolean;
    disabled?: boolean;
    readOnly?: boolean;
    visible: boolean;
    elevation?: number;
}
