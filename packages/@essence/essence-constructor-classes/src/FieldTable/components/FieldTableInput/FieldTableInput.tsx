import * as React from "react";
import {IconButton, TextField} from "@material-ui/core";
import {useTextFieldProps, useFieldDisabled} from "@essence-community/constructor-share/hooks";
import {IField} from "@essence-community/constructor-share/Form";
import {IBuilderConfig} from "@essence-community/constructor-share/types";
import {VAR_RECORD_PAGE_OBJECT_ID} from "@essence-community/constructor-share/constants";
import {Icon} from "@essence-community/constructor-share/Icon";
import {PopoverContext} from "@essence-community/constructor-share/context";
import {observer} from "mobx-react";
import {useTranslation} from "@essence-community/constructor-share/utils";
import {IFieldTableModel} from "../../stores/FieldTableModel/FieldTableModel.types";
import {getDisplayText} from "../../utils";
import {useStyles} from "./FieldTableInput.styles";

interface IFieldTableInputProps {
    bc: IBuilderConfig;
    disabled?: boolean;
    readOnly?: boolean;
    field: IField;
    store: IFieldTableModel;
}

export const FieldTableInput: React.FC<IFieldTableInputProps> = observer((props) => {
    const {bc, disabled, field, store, readOnly} = props;
    const classes = useStyles();
    const [trans] = useTranslation("meta");
    const {onOpen} = React.useContext(PopoverContext);
    const inputRef = React.useRef<HTMLInputElement>(null);
    const isDisabled = useFieldDisabled({disabled, form: field.form, readOnly});
    const displayValue = getDisplayText(store, trans);
    const popoverContext = React.useContext(PopoverContext);

    React.useEffect(() => {
        field.setDefaultCopyValueFn(() => displayValue);
    }, [store, field, displayValue]);

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

    return (
        <TextField
            {...textFieldProps}
            ref={inputRef}
            value={displayValue}
            inputProps={{
                ...textFieldProps.inputProps,
                ...(popoverContext.open ? {readOnly: true} : undefined),
                onClick: isDisabled ? undefined : onOpen,
            }}
            data-qtip={textFieldProps["data-qtip"] === field.value ? displayValue : textFieldProps["data-qtip"]}
        />
    );
});
