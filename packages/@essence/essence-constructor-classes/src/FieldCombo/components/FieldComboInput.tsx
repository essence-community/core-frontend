import * as React from "react";
import {useObserver} from "mobx-react-lite";
import keycode from "keycode";
import {IconButton, InputAdornment} from "@material-ui/core";
import {IBuilderConfig, Icon, IFieldProps} from "@essence-community/constructor-share";
import {VAR_RECORD_PAGE_OBJECT_ID} from "@essence-community/constructor-share/constants";
import {IEssenceTextFieldProps} from "@essence-community/constructor-share/types";
import {FieldComboModel} from "../store/FieldComboModel";
import {ISuggestion} from "../store/FieldComboModel.types";
import {useStyles} from "./FieldComboInput.styles";

interface IProps extends IFieldProps {
    textField: React.ComponentType<IEssenceTextFieldProps>;
    open: boolean;
    store: FieldComboModel;
    bc: IBuilderConfig;
    inputRef: React.RefObject<HTMLInputElement>;
    textFieldRef: React.RefObject<HTMLDivElement>;
    onChange: (event: React.ChangeEvent<HTMLInputElement> | null, value: string) => void;
    onClose: (event: React.SyntheticEvent) => void;
    onOpen: (event: React.SyntheticEvent) => void;
    onBlur: (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export const FieldComboInput: React.FC<IProps> = React.memo((props) => {
    const classes = useStyles(props);
    const {textField: TextField, onClose, onOpen, open, store, onChange, textFieldRef, ...otherProps} = props;
    const handleInputClick = (event: React.SyntheticEvent) => {
        if (!props.open) {
            props.store.handleRestoreSelected(props.value, "down");
            onOpen(event);
        }
    };
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {value} = event.target;

        if (props.bc.allownew) {
            const sugValue = props.store.suggestions.find((sug: ISuggestion) => sug.label === value);
            const newValue = sugValue ? sugValue.value : `${props.bc.allownew}${value}`;

            props.store.handleChangeValue(value, !sugValue);
            props.onChange(event, newValue);
        } else {
            props.store.handleChangeValue(value);
        }

        if (!props.open) {
            props.store.handleRestoreSelected(props.value, "down");
            onOpen(event);
        }
    };
    const handleKeyDown = React.useCallback(
        (event: React.KeyboardEvent<HTMLInputElement>) => {
            // @ts-ignore
            const code = keycode(event);

            switch (code) {
                case "up":
                case "down":
                    event.preventDefault();
                    if (open) {
                        store.handleChangeSelected(code);
                    } else {
                        onOpen(event);
                        store.handleRestoreSelected(props.value, code);
                    }
                    break;
                case "esc":
                    onClose(event);
                    break;
                case "enter":
                    if (store.highlightedValue && open) {
                        event.preventDefault();
                        onClose(event);
                        const sugValue: ISuggestion | undefined = store.suggestions[store.highlightedIndex];

                        if (sugValue) {
                            onChange(null, sugValue.isNew ? `${props.bc.allownew}${sugValue.value}` : sugValue.value);
                        }
                    }
                    break;
                case "tab":
                    onClose(event);
                    break;
                default:
                // No need
            }
        },
        [onChange, onClose, onOpen, open, props.bc.allownew, props.value, store],
    );
    const handleButtonUp = (event: React.SyntheticEvent) => {
        event.stopPropagation();
        onClose(event);
    };
    const handlFocusInput = (event: React.FocusEvent) => {
        event.preventDefault();
        if (props.inputRef.current) {
            props.inputRef.current.focus();
        }
    };

    const chevron = open ? (
        <IconButton
            key={`${props.bc[VAR_RECORD_PAGE_OBJECT_ID]}-open`}
            color="secondary"
            disableRipple
            tabIndex={-1}
            className={classes.iconRoot}
            data-page-object={`${props.bc[VAR_RECORD_PAGE_OBJECT_ID]}-chevron-up`}
            onFocus={handlFocusInput}
            onClick={handleButtonUp}
            disabled={props.disabled}
        >
            <Icon iconfont="chevron-up" />
        </IconButton>
    ) : (
        <IconButton
            key={`${props.bc[VAR_RECORD_PAGE_OBJECT_ID]}-close`}
            color="secondary"
            disableRipple
            tabIndex={-1}
            className={classes.iconRoot}
            data-page-object={`${props.bc[VAR_RECORD_PAGE_OBJECT_ID]}-chevron-down`}
            onFocus={handlFocusInput}
            disabled={props.disabled}
        >
            <Icon iconfont="chevron-down" />
        </IconButton>
    );
    const tips = [...props.tips, chevron];

    return useObserver(() => (
        <TextField
            {...otherProps}
            ref={textFieldRef}
            InputProps={{
                ...otherProps.InputProps,
                endAdornment: <InputAdornment position="end">{tips}</InputAdornment>,
            }}
            tips={tips}
            value={props.store.inputValue}
            onClick={props.disabled ? undefined : handleInputClick}
            onChange={props.disabled ? undefined : handleChange}
            onKeyDown={props.disabled ? undefined : handleKeyDown}
        />
    ));
});
