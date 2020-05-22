import * as React from "react";
import {useTranslation, toTranslateText} from "@essence-community/constructor-share/utils";
import cn from "clsx";
import {Checkbox, FormLabel} from "@material-ui/core";
import {
    VAR_RECORD_PAGE_OBJECT_ID,
    VAR_RECORD_DISPLAYED,
} from "@essence-community/constructor-share/constants/variables";
import {Icon} from "@essence-community/constructor-share/Icon";
import {useObserver} from "mobx-react-lite";
import {TextFieldLabel} from "@essence-community/constructor-share/uicomponents/TextFieldLabel";
import {IClassProps} from "@essence-community/constructor-share/types";
import {useField} from "@essence-community/constructor-share/Form";
import {useTextFieldProps, useFieldSetGlobal, useFieldGetGlobal} from "@essence-community/constructor-share/hooks";
import {useStyles} from "./FieldCheckboxContainer.styles";

export const FieldCheckboxContainer: React.FC<IClassProps> = (props) => {
    const {bc, disabled, readOnly, pageStore} = props;
    const [focused, setFocus] = React.useState<boolean>(false);
    const field = useField(props);
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
            field.onChange(Number(checked));
        },
        [field],
    );

    useFieldSetGlobal({bc, field, pageStore});
    useFieldGetGlobal({bc, field, pageStore});

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
                    checked={Boolean(field.value)}
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
