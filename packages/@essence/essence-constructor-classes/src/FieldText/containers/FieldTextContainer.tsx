import * as React from "react";
import {IClassProps} from "@essence-community/constructor-share/types";
import {useField} from "@essence-community/constructor-share/Form";
import {useTextFieldProps} from "@essence-community/constructor-share/hooks";
import {TextField} from "@material-ui/core";

export const FieldTextContainer: React.FC<IClassProps> = (props) => {
    const field = useField({
        bc: props.bc,
        pageStore: props.pageStore,
    });
    const inputProps = useTextFieldProps({bc: props.bc, disabled: props.disabled, field});
    const onChange = React.useCallback(
        (event: React.SyntheticEvent<HTMLInputElement>) => {
            field.onChange(event.currentTarget.value);
        },
        [field],
    );

    return (
        <TextField
            {...inputProps}
            InputProps={{...inputProps.InputProps}}
            // eslint-disable-next-line react/jsx-no-duplicate-props
            inputProps={{...inputProps.inputProps, onChange}}
        />
    );
};
