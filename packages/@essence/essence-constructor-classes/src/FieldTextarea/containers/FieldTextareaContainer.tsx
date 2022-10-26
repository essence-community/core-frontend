import * as React from "react";
import {IClassProps} from "@essence-community/constructor-share/types";
import {useField} from "@essence-community/constructor-share/Form";
import {
    useTextFieldProps,
    useFieldGetGlobal,
    useFieldSetGlobal,
    useDefaultValueQuery,
} from "@essence-community/constructor-share/hooks";
import {reaction} from "mobx";
import {FormContext} from "@essence-community/constructor-share/context";
import {TextField} from "@material-ui/core";
import {FieldTextareaInput} from "../components/FieldTextareaInput";

export const FieldTextareaContainer: React.FC<IClassProps> = (props) => {
    const {bc, disabled, readOnly, pageStore} = props;
    const field = useField(props);
    const form = React.useContext(FormContext);
    const [height, setHeight] = React.useState<number | undefined>(undefined);
    const handleChangeHeight = React.useCallback((newHeight: number) => {
        setHeight(newHeight);
    }, []);
    const textFieldProps = useTextFieldProps({bc, disabled, field, readOnly});
    const InputProps = React.useMemo(
        () => ({
            ...textFieldProps.InputProps,
            inputComponent: FieldTextareaInput,
        }),
        [textFieldProps.InputProps],
    );
    const inputProps = React.useMemo(
        () => ({
            ...textFieldProps.inputProps,
            bc,
            height,
            onChangeHeight: handleChangeHeight,
        }),
        [bc, handleChangeHeight, height, textFieldProps.inputProps],
    );
    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        field.onChange(event.currentTarget.value);
    };

    useFieldGetGlobal({bc, field, pageStore});
    useFieldSetGlobal({bc, field, pageStore});
    useDefaultValueQuery({bc, field, pageStore});
    React.useEffect(() => {
        return reaction(
            () => form.editing,
            (editing) => {
                if (!editing) {
                    setHeight(undefined);
                }
            },
            {fireImmediately: true},
        );
    }, [form.editing]);

    return (
        <TextField
            {...textFieldProps}
            style={{height: "auto"}}
            InputProps={InputProps}
            inputProps={inputProps}
            onChange={handleChange}
            value={
                typeof textFieldProps.value === "object" || Array.isArray(textFieldProps.value)
                    ? JSON.stringify(textFieldProps.value)
                    : textFieldProps.value
            }
            multiline
        />
    );
};
