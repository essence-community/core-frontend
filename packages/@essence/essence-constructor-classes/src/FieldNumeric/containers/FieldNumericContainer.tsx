import * as React from "react";
import {IClassProps} from "@essence-community/constructor-share/types";
import {useField} from "@essence-community/constructor-share/Form";
import {useTextFieldProps} from "@essence-community/constructor-share/hooks";
import {TextField} from "@material-ui/core";
import {NumberFormat} from "../components/NumberFormat";

export const FieldNumericContainer: React.FC<IClassProps> = (props) => {
    const field = useField({
        bc: props.bc,
        pageStore: props.pageStore,
    });
    const inputProps = useTextFieldProps({bc: props.bc, disabled: props.disabled, field});

    return (
        <TextField
            {...inputProps}
            InputProps={{...inputProps.InputProps, inputComponent: NumberFormat}}
            // eslint-disable-next-line react/jsx-no-duplicate-props
            inputProps={{...inputProps.inputProps, bc: props.bc, onValueChange: field.onChange}}
        />
    );
};
