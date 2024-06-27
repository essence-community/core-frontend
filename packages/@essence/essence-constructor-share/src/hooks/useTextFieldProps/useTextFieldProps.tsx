/* eslint-disable max-lines-per-function */
import * as React from "react";
import {TextFieldProps, IconButton, InputAdornment} from "@material-ui/core";
import cn from "clsx";
import {useObserver} from "mobx-react";
import {IField} from "../../Form/types";
import {IBuilderConfig} from "../../types";
import {isEmpty, useTranslation, toTranslateTextArray, TFunction, declension} from "../../utils";
import {Icon} from "../../Icon";
import {TextFieldLabel} from "../../uicomponents";
import {DEFAULT_CLIPBOARD_PASTE_SEPARATE_REGEX, VAR_RECORD_PAGE_OBJECT_ID} from "../../constants";
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

function getDisplayTextArray(field: IField, trans: TFunction): string {
    const selCount = (field.value as any[]).length ?? 0;

    return selCount
        ? `${declension(selCount, [
              trans("static:e28e56d7b12e4ea2b7663b3e66473b9e"),
              trans("static:783922ac8cf84a5eac8d1b17c77de544"),
              trans("static:783922ac8cf84a5eac8d1b17c77de544"),
          ])}  ${selCount} ${declension(selCount, [
              trans("static:0cd9a67ed46d4d70959182cc6260b221"),
              trans("static:87acd17f8ae243798e97549a5761cfaf"),
              trans("static:2485088fda3d4d9cb5de9c25534cdf23"),
          ])}`
        : "";
}

export function useTextFieldProps(props: IUseTextFieldProps): TextFieldProps & ITextFieldExtendProps {
    const form = React.useContext(FormContext);
    const [trans] = useTranslation("meta");
    const {disabled, readOnly, field, bc} = props;
    const [transValue] = useTranslation(bc.localization || "meta");
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

    const onChangeValue = React.useCallback(
        (text: string) => {
            const typePaste = bc.collectionvalues || "object";
            const regSeparated = new RegExp(
                bc.clipboardpasteseparateregex || DEFAULT_CLIPBOARD_PASTE_SEPARATE_REGEX,
                "g",
            );

            switch (typePaste) {
                case "object":
                    field.onChange(text);
                    break;
                case "array":
                case "objectandarray":
                    const arr = text.split(regSeparated).filter((val) => !isEmpty(val));

                    field.onChange(typePaste === "objectandarray" && arr.length === 1 ? arr[0] : (arr as any));
                    break;
            }
        },
        [bc, field],
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

    const getTipText = (trans: TFunction, transValue: TFunction, isError: boolean) => {
        if (isError && field.error) {
            return toTranslateTextArray(trans, field.error);
        }

        if ((typeof field.value === "string" && field.value !== "") || typeof field.value === "number") {
            return bc.localization ? toTranslateTextArray(transValue, field.value as string) : String(field.value);
        }

        if (bc.info !== undefined) {
            return toTranslateTextArray(trans, bc.info);
        }

        return toTranslateTextArray(trans, field.label);
    };

    const handleCopy = React.useCallback(
        (event: React.MouseEvent<HTMLButtonElement>) => {
            event.stopPropagation();
            field.onCopy();
        },
        [field],
    );

    const handleClear = React.useCallback(
        (event: React.MouseEvent<HTMLButtonElement>) => {
            event.stopPropagation();
            field.onClear(true);
        },
        [field],
    );

    return useObserver(() => {
        const isError = Boolean(!disabled && !field.isValid);
        const isDisabled =
            (readOnly && form.placement === "filter" && typeof bc.readonly === "undefined" ? false : readOnly) ||
            disabled ||
            !form.editing;

        if (!isEmpty(field.value) && bc.enableclipboard) {
            tips.push(
                <IconButton
                    color="secondary"
                    key="copy-value"
                    data-qtip={trans("static:b736e477d32c4c499522f02f62e18e90")}
                    className={classes.actionButton}
                    onClick={handleCopy}
                    tabIndex={-1}
                >
                    <Icon iconfont="copy" size="xs" />
                </IconButton>,
            );
        }

        if (!isEmpty(field.value) && !isDisabled && !bc.disableclear) {
            tips.push(
                <IconButton
                    color="secondary"
                    key="clear-value"
                    data-qtip={trans("static:cda88d85fb7e4a88932dc232d7604bfb")}
                    className={classes.clearButton}
                    onClick={handleClear}
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
            autoFocus: bc.autofocus,
            className: cn(classes.inputRoot, {
                [classes.linkInputRoot]: (bc.redirecturl || bc.redirectusequery) && Boolean(field.value),
            }),
            "data-page-object": bc[VAR_RECORD_PAGE_OBJECT_ID],
            "data-qtip": getTipText(trans, transValue, isError),
            disabled: isDisabled,
            error: isError,
            fullWidth: true,
            inputProps: {
                autoComplete: "off",
                className: classes.input,
                maxLength: bc.maxsize,
                name: bc[VAR_RECORD_PAGE_OBJECT_ID],
                ...((field.bc.collectionvalues === "array" || field.bc.collectionvalues === "objectandarray") &&
                Array.isArray(field.value)
                    ? {readOnly: true, value: getDisplayTextArray(field, trans)}
                    : {}),
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
            onDrop,
            onPaste,
            value: field.value === undefined || field.value === null ? "" : field.value,
            variant: "standard",
        };
    });
}
