import * as React from "react";
import {useObserver} from "mobx-react-lite";
import keycode from "keycode";
import {IconButton, TextField} from "@material-ui/core";
import {Icon} from "@essence-community/constructor-share/Icon";
import {VAR_RECORD_PAGE_OBJECT_ID} from "@essence-community/constructor-share/constants";
import {isEmpty} from "@essence-community/constructor-share/utils";
import {IClassProps} from "@essence-community/constructor-share/types";
import {PopoverContext} from "@essence-community/constructor-share/context";
import {IField} from "@essence-community/constructor-share/Form";
import {useTextFieldProps, useFieldDisabled} from "@essence-community/constructor-share/hooks";
import {FieldComboModel} from "../store/FieldComboModel";
import {ISuggestion} from "../store/FieldComboModel.types";
import {useStyles} from "./FieldComboInput.styles";

interface IProps extends IClassProps {
    store: FieldComboModel;
    inputRef: React.RefObject<HTMLInputElement>;
    textFieldRef: React.RefObject<HTMLDivElement>;
    field: IField;
    onBlur: (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export const FieldComboInput: React.FC<IProps> = React.memo((props) => {
    const {store, textFieldRef, bc, disabled, field, readOnly} = props;
    const classes = useStyles(props);
    const popoverCtx = React.useContext(PopoverContext);
    const isDisabled = useFieldDisabled({disabled, form: field.form, readOnly});

    const handleInputClick = React.useCallback(() => {
        if (!popoverCtx.open) {
            store.handleRestoreSelected(field.value, "down");
            popoverCtx.onOpen();
        }
    }, [popoverCtx, store, field.value]);

    const handleChange = React.useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            const {value} = event.target;

            if (bc.allownew && value !== bc.allownew) {
                const sugValue = props.store.suggestions.find((sug: ISuggestion) => sug.label === value);
                const newValue = sugValue ? sugValue.value : `${bc.allownew}${value}`;

                store.handleChangeValue(value, !sugValue);
                field.onChange(newValue);
            } else if (isEmpty(value) || (bc.allownew && value === bc.allownew)) {
                field.onChange("");
            } else {
                store.handleChangeValue(value);
            }

            if (!popoverCtx.open) {
                store.handleRestoreSelected(field.value, "down");
                popoverCtx.onOpen();
            }
        },
        [bc.allownew, popoverCtx, props.store.suggestions, store, field],
    );

    const handleKeyDown = React.useCallback(
        (event: React.KeyboardEvent<HTMLInputElement>) => {
            // @ts-ignore
            const code = keycode(event);

            switch (code) {
                case "up":
                case "down":
                    event.preventDefault();
                    if (popoverCtx.open) {
                        store.handleChangeSelected(code);
                    } else {
                        popoverCtx.onOpen();
                        store.handleRestoreSelected(field.value, code);
                    }
                    break;
                case "esc":
                    popoverCtx.onClose();
                    break;
                case "enter":
                    if (store.highlightedValue && popoverCtx.open) {
                        event.preventDefault();
                        popoverCtx.onClose();
                        const sugValue: ISuggestion | undefined = store.suggestions[store.highlightedIndex];

                        if (sugValue) {
                            field.onChange(sugValue.isNew ? `${props.bc.allownew}${sugValue.value}` : sugValue.value);
                        }
                    }
                    break;
                case "tab":
                    popoverCtx.onClose();
                    break;
                default:
                // No need
            }
        },
        [field, popoverCtx, props.bc.allownew, store],
    );
    const handleButtonUp = React.useCallback(
        (event: React.SyntheticEvent) => {
            event.stopPropagation();
            popoverCtx.onClose();
        },
        [popoverCtx],
    );
    const handlFocusInput = React.useCallback(
        (event: React.FocusEvent) => {
            event.preventDefault();
            if (props.inputRef.current) {
                props.inputRef.current.focus();
            }
        },
        [props.inputRef],
    );

    const chevron = popoverCtx.open ? (
        <IconButton
            key={`${props.bc[VAR_RECORD_PAGE_OBJECT_ID]}-open`}
            color="secondary"
            disableRipple
            tabIndex={-1}
            className={classes.iconRoot}
            data-page-object={`${props.bc[VAR_RECORD_PAGE_OBJECT_ID]}-chevron-up`}
            onFocus={handlFocusInput}
            onClick={handleButtonUp}
            disabled={isDisabled}
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
            disabled={isDisabled}
        >
            <Icon iconfont="chevron-down" />
        </IconButton>
    );
    const textFieldProps = useTextFieldProps({bc, disabled, field, readOnly, tips: [chevron]});

    return useObserver(() => (
        <TextField
            {...textFieldProps}
            data-qtip={
                textFieldProps["data-qtip"] === String(field.value) ? store.inputValue : textFieldProps["data-qtip"]
            }
            ref={textFieldRef}
            value={store.inputValue}
            onClick={isDisabled ? undefined : handleInputClick}
            onChange={isDisabled ? undefined : handleChange}
            onKeyDown={isDisabled ? undefined : handleKeyDown}
        />
    ));
});
