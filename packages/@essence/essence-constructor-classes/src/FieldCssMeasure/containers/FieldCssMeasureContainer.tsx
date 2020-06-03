import * as React from "react";
import cn from "clsx";
import {IClassProps} from "@essence-community/constructor-share/types";
import {TextField, IconButton} from "@material-ui/core";
import {useField} from "@essence-community/constructor-share/Form";
import {useTextFieldProps, useFieldDisabled} from "@essence-community/constructor-share/hooks";
import {reaction} from "mobx";
import {NumberFormat} from "../components/NumberFormat";
import {parseValue} from "../utils";
import {IValueState} from "../FieldCssMeasure.types";
import {useStyles} from "./FieldCssMeasureContainer.styles";

export const FieldCssMeasureContainer: React.FC<IClassProps> = (props) => {
    const {bc, pageStore, disabled, readOnly, hidden} = props;
    const classes = useStyles();
    const field = useField({bc, disabled, hidden, pageStore});
    const [valueState, setValueState] = React.useState<IValueState>(() => parseValue(field.value));
    const isDisabled = useFieldDisabled({disabled, form: field.form, readOnly});

    const inputProps = useTextFieldProps({
        bc,
        disabled,
        field,
        readOnly,
        tips: [
            <IconButton
                key="px"
                size="small"
                tabIndex={-1}
                className={cn(classes.iconRoot, classes.iconLeft, {
                    [classes.iconRootSelected]: valueState.measure === "px",
                })}
                color="secondary"
                disabled={isDisabled}
                onClick={() => field.onChange(`${valueState.value || "0"}px`)}
            >
                px
            </IconButton>,
            <IconButton
                key="%"
                size="small"
                tabIndex={-1}
                className={cn(classes.iconRoot, {
                    [classes.iconRootSelected]: valueState.measure === "%",
                })}
                color="secondary"
                disabled={isDisabled}
                onClick={() => field.onChange(`${valueState.value || "0"}%`)}
            >
                %
            </IconButton>,
        ],
    });

    const handleChange = (value: string) => {
        if (value !== valueState.value) {
            field.onChange(`${value}${valueState.measure ?? "px"}`);
        }
    };

    React.useEffect(
        () =>
            reaction(
                () => field.value,
                (value) => {
                    setValueState(parseValue(value));
                },
            ),
        [field],
    );

    return (
        <TextField
            {...inputProps}
            value={valueState.value}
            InputProps={{...inputProps.InputProps, inputComponent: NumberFormat}}
            // eslint-disable-next-line react/jsx-no-duplicate-props
            inputProps={{...inputProps.inputProps, onValueChange: handleChange}}
        />
    );
};
