import { IBuilderConfig } from "./Builder";
import { IPageModel } from "./PageModel";

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
