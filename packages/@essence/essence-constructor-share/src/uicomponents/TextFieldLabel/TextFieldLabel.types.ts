import {IBuilderConfig, TText} from "../../types";

export interface ITextFieldLabelProps {
    bc: IBuilderConfig;
    error?: boolean;
    info?: string | TText;
    isRequired: boolean;
    paddingRight?: number;
}
