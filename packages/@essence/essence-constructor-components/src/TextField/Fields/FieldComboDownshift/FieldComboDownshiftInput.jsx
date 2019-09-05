// @flow
import * as React from "react";
import {observer} from "mobx-react";
import keycode from "keycode";
import {ComboFieldModel} from "../../../stores/ComboFieldModel";
import TextField from "../../TextField";

type PropsType = {
    errorText?: string,
    inputValue?: string | number,
    InputProps: Object,
    getInputProps: Function,
    disabled?: boolean,
    error?: boolean,
    InputLabelProps?: Object,
    fullWidth?: boolean,
    fieldId?: string,
    store: ComboFieldModel,
    bc: Object,
    field: Object,
    tabIndex: string,
    style?: Object,
    setHighlightedIndex: (index?: number) => void,
    inputRef: (node: ?HTMLInputElement) => void,
    onBlur?: (event: SyntheticEvent<HTMLInputElement>) => void,
    onChange: (selectedItem: string) => void,
    toggleMenu: () => void,
    selectItem: (item: mixed, otherStateToSet?: Object, cb?: Function) => void,
};

class FieldComboDownshiftInput extends React.Component<PropsType> {
    handleClick = () => {
        const {disabled, toggleMenu} = this.props;

        !disabled && toggleMenu();
    };

    handleChange = (event: SyntheticEvent<HTMLInputElement>) => {
        const {value} = event.currentTarget;
        const {bc} = this.props;

        this.props.setHighlightedIndex(bc.allownew === "true" ? undefined : 0);
        this.props.store.changeStringItemAction(value);

        if (bc.allownew === "true") {
            this.props.onChange(value);
        }
    };

    handleKeyDown = (event: SyntheticKeyboardEvent<HTMLInputElement>) => {
        const {bc} = this.props;

        if (keycode(event) === "enter" && bc.allownew === "true") {
            this.props.selectItem(event.currentTarget.value);
        }
    };

    render() {
        const {
            error,
            onBlur,
            getInputProps,
            InputProps,
            disabled,
            InputLabelProps,
            errorText,
            fullWidth,
            fieldId,
            store,
            bc,
            field,
            inputRef,
            tabIndex,
        } = this.props;
        const {displayText} = store;

        return (
            <TextField
                InputProps={{
                    ...InputProps,
                    ...getInputProps({
                        onBlur,
                        onChange: this.handleChange,
                        onClick: this.handleClick,
                        onKeyDown: this.handleKeyDown,
                    }),
                    id: fieldId,
                    value: displayText,
                }}
                // eslint-disable-next-line
                inputProps={{tabIndex}}
                InputLabelProps={InputLabelProps}
                fullWidth={fullWidth}
                disabled={disabled}
                error={error}
                errorText={errorText}
                bc={bc}
                field={field}
                value={displayText}
                inputRef={inputRef}
            />
        );
    }
}

export default observer(FieldComboDownshiftInput);
