import * as React from "react";
import {IWithModelProps, IFieldProps} from "@essence-community/constructor-share";
import {InputProps} from "@material-ui/core/Input";

export interface IFieldCheckboxContainerProps extends IWithModelProps, IFieldProps {
    inputProps: InputProps;
    InputLabelProps?: Record<string, any>;
    label?: string | React.ReactNode;
    error?: boolean;
}
