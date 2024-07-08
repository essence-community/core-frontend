import * as React from "react";
import {IClassProps} from "@essence-community/constructor-share/types";
import {useField} from "@essence-community/constructor-share/Form";
import {
    useTextFieldProps,
    useFieldGetGlobal,
    useFieldSetGlobal,
    useDefaultValueQuery,
} from "@essence-community/constructor-share/hooks";
import {TextField} from "@material-ui/core";
import {getBigNumberInstance, isEmpty} from "@essence-community/constructor-share/utils";
import {DEFAULT_CLIPBOARD_PASTE_SEPARATE_REGEX} from "@essence-community/constructor-share/constants";
import {NumberFormat} from "../components/NumberFormat";

export const FieldNumericContainer: React.FC<IClassProps> = (props) => {
    const {bc, pageStore, disabled, readOnly} = props;
    const field = useField(props);
    const inputProps = useTextFieldProps({bc, disabled, field, readOnly});

    useFieldGetGlobal({bc, field, pageStore});
    useFieldSetGlobal({bc, field, pageStore});
    useDefaultValueQuery({bc, field, pageStore});

    const BigNumber = React.useMemo(() => {
        const {BigNumber} = getBigNumberInstance(bc);

        return BigNumber;
    }, [bc]);
    const onChangeValue = React.useCallback(
        (text: string) => {
            const typePaste = bc.collectionvalues || "object";
            const regSeparated = new RegExp(
                bc.clipboardpasteseparateregex || DEFAULT_CLIPBOARD_PASTE_SEPARATE_REGEX,
                "g",
            );

            switch (typePaste) {
                case "object":
                    const value = new BigNumber(text);

                    if (!value.isNaN()) {
                        field.onChange(value.toNumber());
                    }
                    break;
                case "array":
                case "objectandarray":
                    const arr = text
                        .split(regSeparated)
                        .filter((val) => !isEmpty(val))
                        .map((val) => new BigNumber(val))
                        .filter((val) => !val.isNaN())
                        .map((val) => val.toNumber());

                    field.onChange(typePaste === "objectandarray" && arr.length === 1 ? arr[0] : (arr as any));
                    break;
            }
        },
        [BigNumber, bc, field],
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

    return (
        <TextField
            {...inputProps}
            InputProps={{...inputProps.InputProps, inputComponent: NumberFormat}}
            // eslint-disable-next-line react/jsx-no-duplicate-props
            inputProps={{...inputProps.inputProps, bc: props.bc, onValueChange: field.onChange}}
            onPaste={onPaste}
            onDrop={onDrop}
        />
    );
};
