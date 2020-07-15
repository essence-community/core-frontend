import * as React from "react";
import {PopoverContext} from "@essence-community/constructor-share/context";
import {IBuilderConfig} from "@essence-community/constructor-share/types";
import {useTextFieldProps, useFieldDisabled} from "@essence-community/constructor-share/hooks";
import {IconButton, TextField} from "@material-ui/core";
import {Icon} from "@essence-community/constructor-share/Icon";
import {IField} from "@essence-community/constructor-share/Form";
import {VAR_RECORD_PAGE_OBJECT_ID} from "@essence-community/constructor-share/constants";
import {useObserver} from "mobx-react";
import {IFieldMultiModel} from "../../stores/FieldMultiModel";
import {useStyles} from "./FieldMultiInput.styles";

interface IFieldMultiInputProps {
    bc: IBuilderConfig;
    disabled?: boolean;
    readOnly?: boolean;
    field: IField;
    store: IFieldMultiModel;
}

export const FieldMultiInput: React.FC<IFieldMultiInputProps> = (props) => {
    const {bc, disabled, field, store, readOnly} = props;
    const classes = useStyles();
    const {onOpen} = React.useContext(PopoverContext);
    const inputRef = React.useRef<HTMLInputElement>(null);
    const isDisabled = useFieldDisabled({disabled, form: field.form, readOnly});

    const handleFocusButton = React.useCallback(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []);

    const textFieldProps = useTextFieldProps({
        bc,
        disabled,
        field,
        readOnly,
        tips: [
            <IconButton
                key="search"
                disabled={isDisabled}
                color="secondary"
                className={classes.search}
                data-page-object={`${bc[VAR_RECORD_PAGE_OBJECT_ID]}-search`}
                tabIndex={-1}
                onClick={isDisabled ? undefined : onOpen}
                onFocus={handleFocusButton}
            >
                <Icon iconfont="search" size="xs" />
            </IconButton>,
        ],
    });

    return useObserver(() => (
        <TextField
            {...textFieldProps}
            ref={inputRef}
            value={store.displayText}
            inputProps={{...textFieldProps.inputProps, onClick: isDisabled ? undefined : onOpen}}
            data-qtip={textFieldProps["data-qtip"] === field.value ? store.displayText : textFieldProps["data-qtip"]}
        />
    ));
};
