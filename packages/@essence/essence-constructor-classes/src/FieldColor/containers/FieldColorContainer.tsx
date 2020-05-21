import * as React from "react";
import cn from "clsx";
import {IClassProps} from "@essence-community/constructor-share/types";
import {VAR_RECORD_DISPLAYED, VAR_RECORD_PAGE_OBJECT_ID} from "@essence-community/constructor-share/constants";
import {useTranslation} from "@essence-community/constructor-share/utils";
import {useTextFieldProps, useFieldSetGlobal} from "@essence-community/constructor-share/hooks";
import {useField} from "@essence-community/constructor-share/Form";
import {FormLabel} from "@material-ui/core";
import {TextFieldLabel} from "@essence-community/constructor-share/uicomponents";
import {useObserver} from "mobx-react-lite";
import {FieldColorPicker} from "../components/FieldColorPicker";
import {useStyles} from "./FieldColorContainer.styles";

export const FieldColorContainer: React.FC<IClassProps> = (props) => {
    const {bc, pageStore, disabled, hidden, readOnly} = props;
    const [trans] = useTranslation("meta");
    const classes = useStyles();
    const isInline = bc.edittype && bc.edittype === "inline";
    const displayed = bc[VAR_RECORD_DISPLAYED];
    const field = useField({bc, disabled, hidden, pageStore});
    const textFieldProps = useTextFieldProps({bc, disabled, field, readOnly});

    useFieldSetGlobal({bc, field, pageStore});

    return useObserver(() => (
        <label
            className={cn(classes.root, {
                [classes.setInline]: isInline,
                [classes.disabled]: disabled,
                [classes.noLabelRender]: !displayed,
            })}
            data-qtip={displayed && trans(displayed)}
            data-page-object={bc[VAR_RECORD_PAGE_OBJECT_ID]}
        >
            {bc[VAR_RECORD_DISPLAYED] ? (
                <FormLabel
                    {...textFieldProps.InputLabelProps}
                    classes={{root: classes.formLabel}}
                    error={!field.isValid}
                >
                    {displayed ? (
                        <TextFieldLabel
                            bc={bc}
                            info={bc.info && trans(bc.info)}
                            error={!field.isValid}
                            isRequired={field.isRequired}
                        />
                    ) : (
                        ""
                    )}
                </FormLabel>
            ) : null}

            <FieldColorPicker
                bc={bc}
                pageStore={pageStore}
                disabled={disabled}
                value={field.value}
                onChange={field.onChange}
            />
        </label>
    ));
};
