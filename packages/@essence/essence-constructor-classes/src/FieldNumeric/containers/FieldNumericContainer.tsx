import * as React from "react";
import {IClassProps} from "@essence-community/constructor-share/types";
import {useField} from "@essence-community/constructor-share/Form";
import {
    useTextFieldProps,
    useFieldGetGlobal,
    useFieldSetGlobal,
    useDefaultValueQuery,
} from "@essence-community/constructor-share/hooks";
import {TextField} from "@material-ui/core";
import {NumberFormat} from "../components/NumberFormat";

export const FieldNumericContainer: React.FC<IClassProps> = (props) => {
    const {bc, pageStore, disabled, readOnly} = props;
    const field = useField(props);
    const inputProps = useTextFieldProps({bc, disabled, field, readOnly});

    useFieldGetGlobal({bc, field, pageStore});
    useFieldSetGlobal({bc, field, pageStore});
    useDefaultValueQuery({bc, field, pageStore});

    return (
        <TextField
            {...inputProps}
            InputProps={{...inputProps.InputProps, inputComponent: NumberFormat}}
            // eslint-disable-next-line react/jsx-no-duplicate-props
            inputProps={{...inputProps.inputProps, bc: props.bc, onValueChange: field.onChange}}
        />
    );
};
