// @flow
import * as React from "react";
import omit from "lodash/omit";
import {observer} from "mobx-react";
import {Field} from "mobx-react-form";
import {TextField as TextFieldMaterial} from "@material-ui/core";
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
];

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
};
// eslint-disable-next-line max-statements
const TextField = ({
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
    ...otherProps
}: PropsType) => {
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
        fieldValue = fieldFullValue.replace(/<br[\s\S]*/i, "...");
    }

    return (
        <TextFieldMaterial
            {...omit(otherProps, OMIT_PROPS)}
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
                    />
                )
            }
            data-page-object={bc.ckPageObject}
            inputProps={{...inputProps, autoComplete: "off", name: bc.ckPageObject}}
            {...maskInputProps}
        />
    );
};

export default observer(TextField);
