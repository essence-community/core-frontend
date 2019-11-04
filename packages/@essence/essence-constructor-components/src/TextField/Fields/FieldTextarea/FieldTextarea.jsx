// @flow
import * as React from "react";
import TextField from "../../TextField";
import type {TextFieldChildProps} from "../../BuilderFieldType";
import FieldTextareaInput from "./FieldTextareaInput";

type FieldTextareaState = {
    height?: number,
};

class FieldTextarea extends React.Component<TextFieldChildProps, FieldTextareaState> {
    state = {
        height: undefined,
    };

    componentDidUpdate(prevProps: TextFieldChildProps) {
        if (prevProps.editing && !this.props.editing) {
            this.setState({height: undefined});
        }
    }

    handleChangeHeight = (height: number) => {
        return this.setState({height});
    };

    render() {
        const {value, editing, bc} = this.props;
        const {height} = this.state;

        return (
            <TextField
                {...this.props}
                style={{height: "auto"}}
                InputProps={{
                    ...this.props.InputProps,
                    inputComponent: FieldTextareaInput,
                }}
                // eslint-disable-next-line react/jsx-no-duplicate-props
                inputProps={{
                    ...this.props.inputProps,
                    bc,
                    editing,
                    height,
                    onChangeHeight: this.handleChangeHeight,
                }}
                noQtip
                value={value}
                multiline
            />
        );
    }
}
export default FieldTextarea;
