import * as React from "react";
import ReactNumberFormat, {NumberFormatValues} from "react-number-format";
import {InputBaseComponentProps} from "@material-ui/core";

interface INumberFormatProps extends InputBaseComponentProps {
    inputRef: React.RefObject<HTMLInputElement>;
    defaultValue: string;
    onValueChange: (value: string) => void;
}

export const NumberFormat: React.FC<INumberFormatProps> = (props) => {
    const {onValueChange, inputRef, ...inputProps} = props;

    const handleChange = ({value}: NumberFormatValues) => {
        onValueChange(value);
    };

    const handleIsAllowed = ({value}: NumberFormatValues) => {
        const [, decimal] = value.split(".");

        if (decimal && decimal.length > 0) {
            return false;
        }

        return true;
    };

    return (
        <ReactNumberFormat
            {...inputProps}
            getInputRef={inputRef}
            onValueChange={handleChange}
            isNumericString
            allowNegative={false}
            isAllowed={handleIsAllowed}
            decimalSeparator="."
        />
    );
};
