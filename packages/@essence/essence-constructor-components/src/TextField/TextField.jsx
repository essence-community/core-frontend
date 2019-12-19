// @flow
import * as React from "react";
import omit from "lodash/omit";
import {observer} from "mobx-react";
import {Field} from "mobx-react-form";
import {TextField as TextFieldMaterial} from "@material-ui/core";
import {VAR_RECORD_PAGE_OBJECT_ID} from "@essence/essence-constructor-share/constants";
import {isEmpty} from "../utils/base";
import TextFieldLabel from "./TextFieldComponents/TextFieldLabel/TextFieldLabel";
import {type BuilderFieldType} from "./BuilderFieldType";

const OMIT_PROPS = [
    "config",
    "form",
    "pageStore",
    "applicationStore",
    "tips",
    "noLabel",
    "bfClasses",
    "onInitGlobal",
    "onInitGetGlobal",
    "onInitSetGlobal",
    "onClear",
    "editing",
    "visible",
    "maskChar",
    "textField",
];
const FIELD_ICON_SIZE = 30;
const FIELD_LABEL_RIGHT = 5;

type PropsType = {
    field: Field,
    bc: BuilderFieldType,
    disabled?: boolean,
    className?: string,
    label?: string | React.Node,
    value: mixed,
    maskInputProps?: Object,
    errorText?: string,
    noQtip?: boolean,
    inputProps?: Object,
    tips?: React.Node[],
};
// eslint-disable-next-line react/display-name, max-statements
const TextField = React.forwardRef(
    // eslint-disable-next-line max-lines-per-function
    (
        {
            bc,
            disabled,
            className,
            label,
            value,
            noQtip,
            maskInputProps = {},
            field,
            errorText = disabled || !field.get("error") ? "" : String(field.get("error")),
            inputProps = {},
            tips,
            ...otherProps
        }: PropsType,
        ref,
    ) => {
        const fieldFullValue = isEmpty(value) ? "" : value;
        const error = Boolean(!disabled && !field.get("isValid"));

        const qtip = () => {
            if (noQtip) {
                return null;
            }

            return errorText || (bc.datatype === "password" ? "" : fieldFullValue) || bc.info || field.get("label");
        };
        let fieldValue = fieldFullValue;

        if (disabled && fieldFullValue && typeof fieldFullValue === "string") {
            fieldValue = fieldFullValue.replace(/<br[\s\S]*/iu, "...");
        }

        return (
            <TextFieldMaterial
                {...omit(otherProps, OMIT_PROPS)}
                ref={ref}
                autoComplete="off"
                error={error}
                data-qtip={qtip()}
                value={fieldValue}
                disabled={disabled}
                fullWidth
                className={className}
                label={
                    label || (
                        <TextFieldLabel
                            bc={bc}
                            error={error}
                            info={bc.info}
                            isRequired={field.rules && field.rules.indexOf("required") >= 0}
                            paddingRight={tips && tips.length * FIELD_ICON_SIZE - FIELD_LABEL_RIGHT}
                        />
                    )
                }
                data-page-object={bc[VAR_RECORD_PAGE_OBJECT_ID]}
                inputProps={{...inputProps, autoComplete: "off", name: bc[VAR_RECORD_PAGE_OBJECT_ID]}}
                {...maskInputProps}
            />
        );
    },
);

export default observer(TextField);
