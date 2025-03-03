/* eslint-disable max-statements */
/* eslint-disable max-lines-per-function */
import * as React from "react";
import {useObserver} from "mobx-react";
import keycode from "keycode";
import {IconButton, TextField} from "@material-ui/core";
import {Icon} from "@essence-community/constructor-share/Icon";
import {
    DEFAULT_CLIPBOARD_PASTE_SEPARATE_REGEX,
    VAR_RECORD_PAGE_OBJECT_ID,
} from "@essence-community/constructor-share/constants";
import {isEmpty, toHtmlEscape, toString} from "@essence-community/constructor-share/utils";
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
    focused?: boolean;
    setFocused?: (focused: boolean) => void;
}

export const FieldComboInput: React.FC<IProps> = (props) => {
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

            if (bc.allownew) {
                const sugValue = store.suggestions.find((sug: ISuggestion) => sug.label === value);
                const newValue = sugValue ? sugValue.value : `${bc.allownew}${value}`;

                store.handleChangeValue(value, !sugValue);
                field.onChange(newValue);
            } else if (isEmpty(value)) {
                field.onClear();
                store.handleChangeValue(value);
            } else {
                store.handleChangeValue(value);
            }

            if (!popoverCtx.open) {
                store.handleRestoreSelected(field.value, "down");
                popoverCtx.onOpen();
            }
        },
        [bc.allownew, popoverCtx, store, field],
    );

    const handleKeyDown = React.useCallback(
        (event: React.KeyboardEvent<HTMLInputElement>) => {
            const code = keycode(event as any);

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

    const onChangeValue = React.useCallback(
        (text: string) => {
            const typePaste = bc.collectionvalues || "object";
            const regSeparated = new RegExp(
                bc.clipboardpasteseparateregex || DEFAULT_CLIPBOARD_PASTE_SEPARATE_REGEX,
                "g",
            );
            const fieldValue = bc.clipboardpastefield || "value";
            let value = undefined;

            switch (typePaste) {
                case "object":
                    if (fieldValue === "value") {
                        value = text;
                    } else if (fieldValue === "display") {
                        value = store.suggestions.find((val) => val.label === text)?.value;
                    } else {
                        value =
                            store.suggestions.find((record) => toString(record.value) === text)?.value ||
                            store.suggestions.find((val) => val.label === text)?.value;
                    }
                    break;
                case "array":
                case "objectandarray":
                    const arr = text.split(regSeparated).filter((val) => !isEmpty(val));

                    if (fieldValue === "value") {
                        value = arr as any;
                    } else if (fieldValue === "display") {
                        value = store.suggestions.filter((val) => arr.indexOf(val.label) > -1).map((val) => val.value);
                    } else {
                        value = store.suggestions
                            .filter((record) => arr.indexOf(toString(record.value)) > -1)
                            .map((val) => val.value);
                        if ((value as any[]).length === 0) {
                            value = store.suggestions
                                .filter((val) => arr.indexOf(val.label) > -1)
                                .map((val) => val.value);
                        }
                    }
                    value = typePaste === "objectandarray" && value.length === 1 ? value[0] : (value as any);
                    break;
            }
            if (isEmpty(value) && Array.isArray(value)) {
                field.onClear();
            } else if (isEmpty(value)) {
                store.handleChangeValue(value);
                field.onClear();
            } else if (bc.allownew && !Array.isArray(value)) {
                const sugValue = store.suggestions.find((sug: ISuggestion) => sug.label === value);
                const newValue = sugValue ? sugValue.value : `${bc.allownew}${value}`;

                store.handleChangeValue(value, !sugValue);
                field.onChange(newValue);
            } else if (!Array.isArray(value)) {
                store.handleChangeValue(value);
                field.onChange(value);
            } else {
                field.onChange(value);
            }
        },
        [bc, field, store],
    );

    const onPaste = React.useCallback(
        (event: React.ClipboardEvent<HTMLInputElement>) => {
            if (!bc.clipboardpasteenabled) {
                return;
            }
            event.stopPropagation();
            event.preventDefault();
            onChangeValue(event.clipboardData.getData("text"));
        },
        [bc.clipboardpasteenabled, onChangeValue],
    );

    const onDrop = React.useCallback(
        (event: React.DragEvent<HTMLInputElement>) => {
            if (!bc.clipboardpasteenabled) {
                return;
            }
            event.stopPropagation();
            event.preventDefault();
            onChangeValue(event.dataTransfer.getData("text"));
        },
        [bc.clipboardpasteenabled, onChangeValue],
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
                props.focused
                    ? ""
                    : textFieldProps["data-qtip"] === String(field.value)
                    ? toHtmlEscape(store.inputValue)
                    : textFieldProps["data-qtip"]
            }
            ref={textFieldRef}
            value={toHtmlEscape(store.inputValue)}
            onClick={isDisabled ? undefined : handleInputClick}
            onChange={isDisabled ? undefined : handleChange}
            onKeyDown={isDisabled ? undefined : handleKeyDown}
            onFocus={() => props.setFocused(true)}
            onBlur={(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
                if (props?.onBlur) {
                    props?.onBlur(e);
                }
                props.setFocused(false);
            }}
            onPaste={onPaste}
            onDrop={onDrop}
        />
    ));
};
