import * as React from "react";
import {FieldTextareaInput} from "../components/FieldTextareaInput";
import {IFieldTextareaContainerProps} from "./FieldTextareaContainer.types";

export const FieldTextareaContainer: React.FC<IFieldTextareaContainerProps> = (props) => {
    const {editing, bc, textField: TextField} = props;
    const [height, setHeight]: [number, React.Dispatch<React.SetStateAction<number | undefined>>] = React.useState(0);
    const handleChangeHeight = React.useCallback((newHeight: number) => {
        setHeight(newHeight);
    }, []);
    const InputProps = React.useMemo(
        () => ({
            ...props.InputProps,
            inputComponent: FieldTextareaInput,
        }),
        [props.InputProps],
    );
    const inputProps = React.useMemo(
        () => ({
            ...props.inputProps,
            bc,
            editing,
            height,
            onChangeHeight: handleChangeHeight,
        }),
        [bc, editing, handleChangeHeight, height, props.inputProps],
    );

    React.useEffect(() => {
        if (!editing) {
            setHeight(undefined);
        }
    }, [editing]);

    return (
        // @ts-ignore
        <TextField
            {...props}
            style={{height: "auto"}}
            InputProps={InputProps}
            // eslint-disable-next-line react/jsx-no-duplicate-props
            inputProps={inputProps}
            noQtip={Boolean(props.value)}
            multiline
        />
    );
};
