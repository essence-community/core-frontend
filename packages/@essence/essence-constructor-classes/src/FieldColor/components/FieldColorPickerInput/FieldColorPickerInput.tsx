import * as React from "react";
import {PopoverContext} from "@essence-community/constructor-share/context";

interface IFieldColorPickerInputProps {
    disabled?: boolean;
    className: string;
    color?: string;
}

export const FieldColorPickerInput: React.FC<IFieldColorPickerInputProps> = (props) => {
    const popoverCtx = React.useContext(PopoverContext);
    const style = {
        background: props.color,
        cursor: props.disabled ? "not-allowed" : "pointer",
    };

    return <div className={props.className} style={style} onClick={popoverCtx.onOpen} />;
};
