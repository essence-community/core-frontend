import * as React from "react";
import {IconButton, TextField} from "@material-ui/core";
import {useTextFieldProps, useFieldDisabled} from "@essence-community/constructor-share/hooks";
import {IField} from "@essence-community/constructor-share/Form";
import {IBuilderConfig} from "@essence-community/constructor-share/types";
import {
    DEFAULT_CLIPBOARD_PASTE_SEPARATE_REGEX,
    VAR_RECORD_PAGE_OBJECT_ID,
} from "@essence-community/constructor-share/constants";
import {Icon} from "@essence-community/constructor-share/Icon";
import {PopoverContext} from "@essence-community/constructor-share/context";
import {observer} from "mobx-react";
import {deepFind, useTranslation, toString, isEmpty} from "@essence-community/constructor-share/utils";
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
                        value = store.recordsStore.recordsAll.map(store.getLabel).find((val) => val === text);
                    } else {
                        value =
                            store.recordsStore.recordsAll.find(
                                (record) => toString(deepFind(record, store.valueField)[1]) === text,
                            ) || store.recordsStore.recordsAll.map(store.getLabel).find((val) => val === text);
                    }
                    break;
                case "array":
                case "objectandarray":
                    const arr = text.split(regSeparated).filter((val) => !isEmpty(val));

                    if (fieldValue === "value") {
                        value = arr as any;
                    } else if (fieldValue === "display") {
                        value = store.recordsStore.recordsAll
                            .map(store.getLabel)
                            .filter((val) => arr.indexOf(val) > -1);
                    } else {
                        value = store.recordsStore.recordsAll.filter(
                            (record) => arr.indexOf(toString(deepFind(record, store.valueField)[1])) > -1,
                        );
                        if ((value as any[]).length === 0) {
                            value = store.recordsStore.recordsAll
                                .map(store.getLabel)
                                .filter((val) => arr.indexOf(val) > -1);
                        }
                    }
                    value = typePaste === "objectandarray" && value.length === 1 ? value[0] : (value as any);
                    break;
            }

            if (isEmpty(value)) {
                field.onClear();
            } else {
                field.onChange(value);
            }
        },
        [bc, field, store],
    );

    const onPaste = React.useCallback(
        (event: React.ClipboardEvent<HTMLInputElement>) => {
            event.stopPropagation();
            event.preventDefault();
            onChangeValue(event.clipboardData.getData("text"));
        },
        [onChangeValue],
    );

    const onDrop = React.useCallback(
        (event: React.DragEvent<HTMLInputElement>) => {
            event.stopPropagation();
            event.preventDefault();
            onChangeValue(event.dataTransfer.getData("text"));
        },
        [onChangeValue],
    );

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
            onPaste={onPaste}
            onDrop={onDrop}
        />
    );
});
