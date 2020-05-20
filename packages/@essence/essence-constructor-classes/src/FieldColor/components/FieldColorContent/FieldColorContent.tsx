import * as React from "react";
import keycode from "keycode";
import {SketchPicker, ColorResult} from "react-color";
import {FieldValue} from "@essence-community/constructor-share/types";
import {PopoverContext} from "@essence-community/constructor-share/context";
import {colors} from "../../constants";

interface IFieldColorContentProps {
    color?: string;
    onChangeState(value: string): void;
    onChange(value: FieldValue): void;
}

export const FieldColorContent: React.FC<IFieldColorContentProps> = (props) => {
    const popoverCtx = React.useContext(PopoverContext);
    const {onChange, color, onChangeState} = props;

    const handleKeyDown = (event: React.SyntheticEvent<HTMLDivElement>) => {
        const code = keycode(event as any);

        if (code === "enter") {
            onChange(color);
            popoverCtx.onClose();
        }
    };

    const handleChange = (colorResult: ColorResult) => {
        onChangeState(colorResult.hex);
    };

    return (
        <div onKeyDown={handleKeyDown} tabIndex={1}>
            <SketchPicker presetColors={colors} onChange={handleChange} color={color} />
        </div>
    );
};
