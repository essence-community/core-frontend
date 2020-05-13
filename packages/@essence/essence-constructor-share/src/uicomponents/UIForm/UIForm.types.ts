import {IForm} from "../../Form";
import {IPageModel, IRecord, IBuilderMode, IBuilderConfig} from "../../types";

interface IFormOptionsType {
    reset?: boolean;
    form: IForm;
    noClean?: boolean;
    noLoad?: boolean;
    resetFilter?: boolean;
}

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
    onSubmit: (values: IRecord, options: IFormOptionsType) => Promise<void> | void;
}
