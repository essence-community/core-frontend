import * as React from "react";
import {IconButton, TextField} from "@material-ui/core";
import {Icon} from "@essence-community/constructor-share/Icon";
import {VAR_RECORD_PAGE_OBJECT_ID} from "@essence-community/constructor-share/constants";
import {IClassProps} from "@essence-community/constructor-share/types";
import {useField} from "@essence-community/constructor-share/Form";
import {
    useTextFieldProps,
    useFieldSetGlobal,
    useFieldGetGlobal,
    useDefaultValueQuery,
} from "@essence-community/constructor-share/hooks";
import {useStyles} from "./FIeldPasswordContainer.styles";

export const FieldPasswordContainer: React.FC<IClassProps> = (props) => {
    const {bc, pageStore, disabled, hidden, readOnly} = props;
    const classes = useStyles();
    const [showPassword, setShowPassword] = React.useState(false);
    const field = useField({bc, disabled, hidden, pageStore});

    const handleToggleShowPassword = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        field.onChange(event.currentTarget.value);
    };

    useFieldSetGlobal({bc, field, pageStore});
    useFieldGetGlobal({bc, field, pageStore});
    useDefaultValueQuery({bc, field, pageStore});

    const textFieldProps = useTextFieldProps({
        bc,
        disabled,
        field,
        readOnly,
        tips: [
            <IconButton
                color="secondary"
                key="eye"
                className={classes.eyeButton}
                onClick={handleToggleShowPassword}
                data-page-object={`${bc[VAR_RECORD_PAGE_OBJECT_ID]}-eye`}
                tabIndex={-1}
            >
                <Icon iconfont={showPassword ? "eye-slash" : "eye"} size="xs" />
            </IconButton>,
        ],
    });

    return (
        <TextField
            {...textFieldProps}
            data-qtip={
                field.value === textFieldProps["data-qtip"] && !showPassword ? "***" : textFieldProps["data-qtip"]
            }
            inputProps={{
                value: showPassword ? field.value : undefined,
                ...textFieldProps.inputProps,
                type: showPassword ? "text" : "password",
            }}
            onChange={handleChange}
        />
    );
};
