import * as React from "react";
import {TextFieldProps, IconButton, InputAdornment} from "@material-ui/core";
import cn from "clsx";
import {useObserver} from "mobx-react";
import {IField} from "../../Form/types";
import {IBuilderConfig} from "../../types";
import {isEmpty, useTranslation, toTranslateTextArray} from "../../utils";
import {Icon} from "../../Icon";
import {TextFieldLabel} from "../../uicomponents";
import {VAR_RECORD_PAGE_OBJECT_ID} from "../../constants";
import {FormContext} from "../../context";
import {useStyles} from "./useTextFieldProps.styles";
import {ITextFieldExtendProps} from "./useTextFieldProps.types";

interface IUseTextFieldProps {
    disabled?: boolean;
    readOnly?: boolean;
    field: IField;
    bc: IBuilderConfig;
    tips?: React.ReactNode[];
}

export const inputTypes: Record<string, string> = {
    boolean: "checkbox",
    checkbox: "checkbox",
    combo: "text",
    integer: "text",
    numeric: "text",
    password: "password",
    text: "text",
};

const FIELD_ICON_SIZE = 30;
const FIELD_LABEL_RIGHT = 5;

export function useTextFieldProps(props: IUseTextFieldProps): TextFieldProps & ITextFieldExtendProps {
    const form = React.useContext(FormContext);
    const [trans] = useTranslation("meta");
    const {disabled, readOnly, field, bc} = props;
    const classes = useStyles();
    const tips: React.ReactNode[] = [];

    const handleClick = () => {
        if (bc.redirecturl || bc.redirectusequery) {
            field.redirect();
        }
    };

    if (bc.datatype === "numeric" && bc.currencysign) {
        tips.push(<div key="currencysign">{bc.currencysign}</div>);
    }

    function getTipText(isError: boolean) {
        if (isError && field.error) {
            return field.error;
        }

        if ((typeof field.value === "string" && field.value !== "") || typeof field.value === "number") {
            return String(field.value);
        }

        if (bc.info !== undefined) {
            return bc.info;
        }

        return field.label;
    }

    return useObserver(() => {
        const isError = Boolean(!disabled && !field.isValid);
        const isDisabled = readOnly || disabled || !form.editing;

        if (!isEmpty(field.value) && !isDisabled) {
            tips.push(
                <IconButton
                    color="secondary"
                    key="clear-value"
                    className={classes.clearButton}
                    onClick={field.onClear}
                    tabIndex={-1}
                >
                    <Icon iconfont="times" size="xs" />
                </IconButton>,
            );
        }

        if (props.tips) {
            tips.push(...props.tips);
        }

        return {
            InputLabelProps: {
                className: classes.formLabelRoot,
            },
            InputProps: {
                className: classes.inputDisable,
                endAdornment: tips.length ? <InputAdornment position="end">{tips}</InputAdornment> : null,
                type: inputTypes[bc.datatype || "text"],
            },
            className: cn(classes.inputRoot, {
                [classes.linkInputRoot]: (bc.redirecturl || bc.redirectusequery) && Boolean(field.value),
            }),
            "data-page-object": bc[VAR_RECORD_PAGE_OBJECT_ID],
            "data-qtip": toTranslateTextArray(trans, getTipText(isError)),
            disabled: isDisabled,
            error: isError,
            fullWidth: true,
            inputProps: {
                autoComplete: "off",
                className: classes.input,
                maxLength: bc.maxsize,
                name: bc[VAR_RECORD_PAGE_OBJECT_ID],
            },
            label: (
                <TextFieldLabel
                    bc={bc}
                    error={isError}
                    info={bc.info}
                    isRequired={field.isRequired}
                    paddingRight={tips && tips.length * FIELD_ICON_SIZE - FIELD_LABEL_RIGHT}
                />
            ),
            onClick: handleClick,
            value: field.value === undefined || field.value === null ? "" : field.value,
            variant: "standard",
        };
    });
}
