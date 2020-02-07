import {IWithModelProps, IFieldProps} from "@essence-community/constructor-share";
import {InputProps} from "@material-ui/core/Input";

export interface IFieldTextareaContainerProps extends IWithModelProps, IFieldProps {
    inputProps: InputProps;
}
