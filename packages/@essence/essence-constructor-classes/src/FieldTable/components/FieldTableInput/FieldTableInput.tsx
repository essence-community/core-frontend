import * as React from "react";
import {IconButton, TextField} from "@material-ui/core";
import {useTextFieldProps} from "@essence-community/constructor-share/hooks";
import {IField} from "@essence-community/constructor-share/Form";
import {IBuilderConfig} from "@essence-community/constructor-share/types";
import {VAR_RECORD_PAGE_OBJECT_ID} from "@essence-community/constructor-share/constants";
import {Icon} from "@essence-community/constructor-share/Icon";
import {PopoverContext} from "@essence-community/constructor-share/context";
import {useStyles} from "./FieldTableInput.styles";

interface IFieldTableInputProps {
    bc: IBuilderConfig;
    disabled?: boolean;
    field: IField;
}

export const FieldTableInput: React.FC<IFieldTableInputProps> = (props) => {
    const {bc, disabled, field} = props;
    const classes = useStyles();
    const {onOpen} = React.useContext(PopoverContext);
    const inputRef = React.useRef<HTMLInputElement>(null);

    const handleFocusButton = React.useCallback(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []);

    const textFieldProps = useTextFieldProps({
        bc,
        disabled,
        field,
        tips: [
            <IconButton
                key="search"
                disabled={disabled}
                color="secondary"
                className={classes.search}
                data-page-object={`${bc[VAR_RECORD_PAGE_OBJECT_ID]}-search`}
                tabIndex={-1}
                onClick={onOpen}
                onFocus={handleFocusButton}
            >
                <Icon iconfont="search" size="xs" />
            </IconButton>,
        ],
    });

    return <TextField {...textFieldProps} ref={inputRef} />;
};
