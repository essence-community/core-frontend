import * as React from "react";
import {useTranslation, toTranslateText} from "@essence-community/constructor-share/utils";
import cn from "clsx";
import {Checkbox, FormLabel} from "@material-ui/core";
import {VAR_RECORD_PAGE_OBJECT_ID} from "@essence-community/constructor-share/constants/variables";
import {Icon} from "@essence-community/constructor-share/Icon";
import {useObserver} from "mobx-react-lite";
import {TextFieldLabel} from "@essence-community/constructor-share/uicomponents/TextFieldLabel";
import {IFieldCheckboxContainerProps} from "./FieldCheckboxContainer.types";
import {useStyles} from "./FieldCheckboxContainer.styles";

export const FieldCheckboxContainer: React.FC<IFieldCheckboxContainerProps> = (props) => {
    const [focused, setFocus] = React.useState<boolean>(false);

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
            props.onChange(event, Number(checked));
        },
        [props],
    );

    return useObserver(() => {
        const {value, InputLabelProps, label, disabled, error, noLabel, bc, tabIndex, field} = props;
        const isInline = bc.edittype && bc.edittype === "inline";

        return (
            <label
                className={cn(classes.root, {
                    [classes.setInline]: isInline,
                    [classes.disabled]: disabled,
                    [classes.noLabelRender]: noLabel,
                    [classes.focused]: focused,
                })}
                data-qtip={
                    value
                        ? trans("static:dacf7ab025c344cb81b700cfcc50e403")
                        : trans("static:f0e9877df106481eb257c2c04f8eb039")
                }
                data-page-object={bc[VAR_RECORD_PAGE_OBJECT_ID]}
            >
                <FormLabel
                    {...InputLabelProps}
                    classes={{root: `${classes.formLabel} ${bc.info ? classes.defaultPointerEvents : ""}`}}
                    error={error}
                >
                    {noLabel ? (
                        ""
                    ) : (
                        <TextFieldLabel
                            bc={bc}
                            info={toTranslateText(trans, bc.info)}
                            error={error}
                            isRequired={field.rules && field.rules.indexOf("required") >= 0}
                        />
                    )}
                </FormLabel>
                <Checkbox
                    checked={Boolean(value)}
                    onChange={onChange}
                    className={classes.checkboxRoot}
                    disabled={disabled}
                    color="default"
                    checkedIcon={<Icon iconfont="check-square" />}
                    icon={disabled ? <Icon iconfont="square" /> : <Icon iconfont="square-o" />}
                    disableRipple
                    tabIndex={tabIndex}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                />
            </label>
        );
    });
};
