// @flow
import React, {Component} from "react";
import InputMask from "react-input-mask";
import TextField from "../../TextField";
import {type TextFieldChildProps} from "../../BuilderFieldType";
import formatChars from "./formatChars.json";

type PropsType = TextFieldChildProps & {
    maskChar: ?string,
    onMouseDown?: () => void,
    beforeMaskedValueChange?: (newState: Object, oldState: Object, userInput: ?string, maskOptions: Object) => Object,
};

export class FieldMask extends Component<PropsType> {
    static defaultProps = {
        maskChar: "\u2000",
    };

    handleChange = (event: SyntheticEvent<HTMLInputElement>) => {
        const {onChange} = this.props;

        if (typeof onChange === "function") {
            onChange(event, event.currentTarget.value);
        }
    };

    render() {
        const {
            imask,
            field,
            disabled,
            value = field.value,
            maskChar,
            beforeMaskedValueChange,
            onMouseDown,
            onChange,
            ...otherProps
        } = this.props;

        if (!imask) {
            return <TextField {...this.props} onChange={onChange} />;
        }

        return (
            <InputMask
                mask={imask}
                maskChar={maskChar}
                value={value}
                onChange={this.handleChange}
                disabled={disabled}
                formatChars={formatChars}
                onMouseDown={onMouseDown}
                beforeMaskedValueChange={beforeMaskedValueChange}
            >
                {(inputProps: Object) => (
                    <TextField {...otherProps} maskInputProps={inputProps} field={field} disabled={disabled} />
                )}
            </InputMask>
        );
    }
}

export default FieldMask;
