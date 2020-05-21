import * as React from "react";
import {IClassProps} from "@essence-community/constructor-share/types";
import {useField} from "@essence-community/constructor-share/Form";
import {useTextFieldProps, useFieldSetGlobal, useFieldGetGlobal} from "@essence-community/constructor-share/hooks";
import {TextFieldMask} from "@essence-community/constructor-share/uicomponents";
import {TextField} from "@material-ui/core";
import {FieldTextSmartMask} from "../components/FieldTextSmartMask";

export const FieldTextContainer: React.FC<IClassProps> = (props) => {
    const {bc, pageStore} = props;
    const field = useField({
        bc,
        disabled: props.disabled,
        hidden: props.hidden,
        pageStore,
    });
    const inputProps = useTextFieldProps({bc: props.bc, disabled: props.disabled, field});
    const handleChange = React.useCallback(
        (event: React.SyntheticEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            field.onChange(event.currentTarget.value);
        },
        [field],
    );

    useFieldSetGlobal({bc, field, pageStore});
    useFieldGetGlobal({bc, field, pageStore});

    if (bc.imask) {
        return bc.imask.indexOf("!") === 0 ? (
            <FieldTextSmartMask
                textFieldProps={inputProps}
                imask={bc.imask}
                onChange={handleChange}
                disabled={props.disabled}
                field={field}
                pageStore={props.pageStore}
            />
        ) : (
            <TextFieldMask textFieldProps={inputProps} imask={bc.imask} onChange={handleChange} />
        );
    }

    return <TextField {...inputProps} onChange={handleChange} />;
};
