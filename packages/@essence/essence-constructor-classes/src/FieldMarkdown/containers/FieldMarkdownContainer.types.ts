import {IFieldProps} from "@essence-community/constructor-share/types";
import {InputProps} from "@material-ui/core";

export interface IFieldMarkdownContainerProps extends IFieldProps {
    inputProps: InputProps;
    className?: string;
}
