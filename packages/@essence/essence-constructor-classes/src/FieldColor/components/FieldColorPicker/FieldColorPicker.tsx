import * as React from "react";
import {Popover} from "@essence-community/constructor-share/uicomponents";
import {IPageModel, FieldValue, IBuilderConfig} from "@essence-community/constructor-share/types";
import {
    IPopoverAnchorOrigin,
    IPopoverTransfromOrigin,
} from "@essence-community/constructor-share/uicomponents/Popover/Popover.types";
import {FieldColorPickerInput} from "../FieldColorPickerInput";
import {FieldColorContent} from "../FieldColorContent";
import {useStyles} from "./FieldColorPicker.styles";

const POPOVER_ANCHOR_ORIGIN: IPopoverAnchorOrigin = {
    horizontal: "center",
    vertical: "bottom",
};

const POPOVER_TRANSFORM_ORIGIN: IPopoverTransfromOrigin = {
    horizontal: "center",
    vertical: "top",
};

interface IFieldColorPickerProps {
    value: FieldValue;
    pageStore: IPageModel;
    disabled?: boolean;
    bc: IBuilderConfig;
    onChange: (value: FieldValue) => void;
}

export const FieldColorPicker: React.FC<IFieldColorPickerProps> = (props) => {
    const {disabled, pageStore, onChange, bc} = props;
    const classes = useStyles();
    const [color, setColor] = React.useState<string | undefined>(bc.defaultvalue);

    const handleResetColor = React.useCallback(() => {
        if (typeof props.value === "string") {
            setColor(props.value);
        } else {
            setColor(bc.defaultvalue);
        }
    }, [bc.defaultvalue, props.value]);

    React.useEffect(() => {
        handleResetColor();
    }, [handleResetColor]);

    return (
        <div className={classes.colorPicker}>
            <div className={classes.colorPickerContainer}>
                <Popover
                    popoverContent={<FieldColorContent color={color} onChangeState={setColor} onChange={onChange} />}
                    pageStore={pageStore}
                    container={pageStore.pageEl}
                    hideBackdrop
                    hideOnResize
                    hideOnScroll
                    width="auto"
                    anchorOrigin={POPOVER_ANCHOR_ORIGIN}
                    transformOrigin={POPOVER_TRANSFORM_ORIGIN}
                    onClickOutside={handleResetColor}
                >
                    <FieldColorPickerInput color={color} disabled={disabled} className={classes.color} />
                </Popover>
            </div>
        </div>
    );
};
