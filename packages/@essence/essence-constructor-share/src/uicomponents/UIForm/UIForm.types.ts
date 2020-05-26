import {IPageModel, IRecord, IBuilderMode, IBuilderConfig, IFormOptions} from "../../types";

export interface IUIFormProps {
    pageStore: IPageModel;
    editing?: boolean;
    bc?: IBuilderConfig;
    initialValues?: IRecord;
    placement?: string;
    noForm?: boolean;
    mode?: IBuilderMode;
    submitOnChange?: boolean;
    className?: string;
    style?: React.CSSProperties;
    onSubmit: (values: IRecord, options: IFormOptions) => Promise<void> | void;
}
