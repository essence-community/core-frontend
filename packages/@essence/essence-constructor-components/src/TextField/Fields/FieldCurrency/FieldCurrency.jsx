// @flow
import * as React from "react";
import {type TextFieldChildProps} from "../../BuilderFieldType";
import TextField from "../../TextField";
import NumberFormatCustom from "./NumberFormatCustom";

class FieldCurrency extends React.Component<TextFieldChildProps> {
    handleChange = (value: mixed) => {
        this.props.onChange(null, value);
    };

    render() {
        const {bc, InputProps, inputProps: {tabIndex} = {}} = this.props;

        return (
            <TextField
                {...this.props}
                InputProps={{...InputProps, inputComponent: NumberFormatCustom}}
                // eslint-disable-next-line react/jsx-no-duplicate-props
                inputProps={{bc, tabIndex}}
                onChange={this.handleChange}
            />
        );
    }
}

export default FieldCurrency;
