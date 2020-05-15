import React from "react";
import InputMask, {Props as InputMaskProps} from "react-input-mask";
import {TextField, TextFieldProps} from "@material-ui/core";
import {ITextFieldExtendProps} from "../../hooks/useTextFieldProps";
import {formatChars} from "./maskConfig";

export interface ITextFieldMaskProps {
    maskChar?: string;
    imask: string;
    textFieldProps: ITextFieldExtendProps & TextFieldProps;
    onChange: InputMaskProps["onChange"];
    beforeMaskedValueChange?: InputMaskProps["beforeMaskedValueChange"];
}

export const TextFieldMask: React.FC<ITextFieldMaskProps> = (props) => {
    const {maskChar = "\u2000", imask, textFieldProps, beforeMaskedValueChange, onChange} = props;

    return (
        <InputMask
            mask={imask}
            maskChar={maskChar}
            value={typeof textFieldProps.value === "string" ? textFieldProps.value : ""}
            onChange={onChange}
            formatChars={formatChars}
            beforeMaskedValueChange={beforeMaskedValueChange}
            disabled={textFieldProps.disabled}
        >
            {(inputProps: TextFieldProps) => <TextField {...textFieldProps} {...inputProps} variant="standard" />}
        </InputMask>
    );
};
