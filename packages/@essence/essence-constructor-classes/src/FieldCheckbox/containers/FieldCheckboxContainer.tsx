import * as React from "react";
import {useTranslation, toTranslateText, transformToBoolean} from "@essence-community/constructor-share/utils";
import cn from "clsx";
import {Checkbox, FormLabel} from "@material-ui/core";
import {
    VAR_RECORD_PAGE_OBJECT_ID,
    VAR_RECORD_DISPLAYED,
} from "@essence-community/constructor-share/constants/variables";
import {Icon} from "@essence-community/constructor-share/Icon";
import {useObserver} from "mobx-react";
import {TextFieldLabel} from "@essence-community/constructor-share/uicomponents/TextFieldLabel";
import {FieldValue, IClassProps, IRecord} from "@essence-community/constructor-share/types";
import {IField, IForm, useField} from "@essence-community/constructor-share/Form";
import {
    useTextFieldProps,
    useFieldSetGlobal,
    useFieldGetGlobal,
    useDefaultValueQuery,
} from "@essence-community/constructor-share/hooks";
import {IBuilderClassConfig} from "../types";
import {useStyles} from "./FieldCheckboxContainer.styles";

const getOutput = (field: IField, form: IForm, value?: IRecord | FieldValue) => {
    if (value || field.value) {
        return field.bc.valuetype === "integer" ? 1 : true;
    }

    return field.bc.valuetype === "integer" ? 0 : false;
};

export const FieldCheckboxContainer: React.FC<IClassProps<IBuilderClassConfig>> = (props) => {
    const {bc, disabled, readOnly, pageStore} = props;
    const [focused, setFocus] = React.useState<boolean>(false);
    const clearValue = React.useMemo(() => (bc.valuetype === "integer" ? 0 : false), [bc]);
    const field = useField({...props, clearValue, output: getOutput});
    const textFieldProps = useTextFieldProps({bc, disabled, field, readOnly});

    const [trans] = useTranslation("meta");
    const classes = useStyles(props);

    const handleFocus = React.useCallback(() => {
        setFocus(true);
    }, []);
    const handleBlur = React.useCallback(() => {
        setFocus(false);
    }, []);
    const onChange = React.useCallback(
        (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
            field.onChange(bc.valuetype === "integer" ? Number(checked) : checked);
        },
        [field, bc],
    );

    useFieldSetGlobal({bc, field, pageStore});
    useFieldGetGlobal({bc, field, pageStore});
    useDefaultValueQuery({bc, field, pageStore});

    return useObserver(() => {
        const isInline = bc.edittype && bc.edittype === "inline";
        const noLabel = !bc[VAR_RECORD_DISPLAYED];

        return (
            <label
                className={cn(classes.root, {
                    [classes.setInline]: isInline,
                    [classes.disabled]: textFieldProps.disabled,
                    [classes.noLabelRender]: noLabel,
                    [classes.focused]: focused,
                })}
                data-qtip={
                    field.value
                        ? trans("static:dacf7ab025c344cb81b700cfcc50e403")
                        : trans("static:f0e9877df106481eb257c2c04f8eb039")
                }
                data-page-object={bc[VAR_RECORD_PAGE_OBJECT_ID]}
            >
                <FormLabel
                    {...textFieldProps.InputLabelProps}
                    classes={{root: `${classes.formLabel} ${bc.info ? classes.defaultPointerEvents : ""}`}}
                    error={textFieldProps.error}
                >
                    {noLabel ? (
                        ""
                    ) : (
                        <TextFieldLabel
                            bc={bc}
                            info={toTranslateText(trans, bc.info)}
                            error={textFieldProps.error}
                            isRequired={field.isRequired}
                        />
                    )}
                </FormLabel>
                <Checkbox
                    checked={transformToBoolean(field.value)}
                    onChange={onChange}
                    className={classes.checkboxRoot}
                    disabled={textFieldProps.disabled}
                    color="default"
                    checkedIcon={<Icon iconfont="check-square" />}
                    icon={textFieldProps.disabled ? <Icon iconfont="square" /> : <Icon iconfont="square-o" />}
                    disableRipple
                    tabIndex={textFieldProps.disabled ? -1 : undefined}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                />
            </label>
        );
    });
};
