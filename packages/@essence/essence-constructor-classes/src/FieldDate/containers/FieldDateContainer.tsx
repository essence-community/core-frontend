/* eslint-disable max-lines-per-function */
/* eslint-disable max-statements */
import * as React from "react";
import {FieldValue} from "@essence-community/constructor-share/types";
import {useField} from "@essence-community/constructor-share/Form";
import {useTextFieldProps, useFieldGetGlobal, useFieldSetGlobal} from "@essence-community/constructor-share/hooks";
import {TextFieldMask} from "@essence-community/constructor-share/uicomponents";
import {TextField, IconButton} from "@material-ui/core";
import {useTranslation} from "@essence-community/constructor-share/utils";
import moment from "moment";
import {reaction} from "mobx";
import {Icon} from "@essence-community/constructor-share/Icon";
import {FormContext} from "@essence-community/constructor-share/context";
import {getFieldDate} from "../util/Util";
import {IFieldBuildClassProps} from "../components/FieldDate.types";
import {useFieldDisabled} from "../hook/useFieldDisabled";
import {useStyles} from "./FieldDateContainer.types";

import "rc-calendar/assets/index.css";
import "rc-time-picker/assets/index.css";
import "moment/locale/ru";

export const FieldDateContainer: React.FC<IFieldBuildClassProps> = (props) => {
    const {bc, pageStore, disabled, readOnly} = props;
    const {disabledenddate} = bc;
    const form = React.useContext(FormContext);
    const field = useField({
        bc,
        disabled: props.disabled,
        hidden: props.hidden,
        pageStore: props.pageStore,
    });

    useFieldGetGlobal({bc, field, form, pageStore});
    useFieldSetGlobal({bc, field, form, pageStore});
    const [open, setOpen] = React.useState<boolean>(false);
    const [momentValue, setMomentValue] = React.useState<moment.Moment | undefined>(undefined);
    const [formatValue, setFormatValue] = React.useState<string | undefined>(undefined);
    const inputElement = React.useRef<HTMLInputElement | HTMLTextAreaElement>();
    const [trans] = useTranslation("meta");
    const classes = useStyles();
    const handleFocus = (event: React.FocusEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        event.preventDefault();
    };

    const handleSetFocus = () => {
        if (inputElement.current) {
            inputElement.current.focus();
        }
    };
    const handleScrollClose = React.useCallback(() => {
        setOpen(false);
        pageStore.removeScrollEvent(handleScrollClose);
    }, [pageStore]);
    const handleCalendarOpenChange = (isOpen: boolean) => {
        if (isOpen === false) {
            setOpen(isOpen);

            requestAnimationFrame(handleSetFocus);
        } else {
            pageStore.addScrollEvent(handleScrollClose);
        }
    };

    const dateConfig = React.useMemo(() => getFieldDate(trans, bc.format), [bc.format, trans]);
    const onChange = React.useMemo(() => {
        if (disabledenddate) {
            return (value: FieldValue) => {
                field.onChange(value ? dateConfig.serverFormatEnd(value) : value);
            };
        }

        return field.onChange;
    }, [disabledenddate, field, dateConfig]);
    const handleCalendarOpen = () => {
        setOpen(true);
    };
    const handleChange = React.useCallback(
        (event: React.SyntheticEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            const {value} = event.currentTarget;
            const strValue = typeof value === "string" ? value : "";
            const mValue = moment(strValue, dateConfig.format, true);

            if (mValue.isValid()) {
                onChange(mValue.format(dateConfig.serverFormat));
                setMomentValue(mValue);
                setFormatValue(strValue);
            }
        },
        [dateConfig.format, dateConfig.serverFormat, onChange],
    );
    const [getDisabledFunction] = useFieldDisabled(props);
    const calendarIcon = React.useMemo(
        () => (
            <IconButton
                color="secondary"
                key="calendar-open"
                onClick={handleCalendarOpen}
                onFocus={handleFocus}
                disabled={readOnly || disabled || !form.editing}
                tabIndex={-1}
                disableRipple
                className={classes.rootIcon}
            >
                <Icon iconfont="calendar" size="xs" />
            </IconButton>
        ),
        [classes.rootIcon, disabled, form.editing, readOnly],
    );
    const inputProps = useTextFieldProps({bc: props.bc, disabled: props.disabled, field, tips: [calendarIcon]});

    const textField = React.useMemo(() => {
        inputProps.inputRef = inputElement;
        inputProps.value = formatValue;
        inputProps["data-qtip"] = inputProps.error ? inputProps["data-qtip"] : formatValue || inputProps["data-qtip"];
        if (dateConfig.inputMask) {
            return () => (
                <TextFieldMask textFieldProps={inputProps} imask={dateConfig.inputMask!} onChange={handleChange} />
            );
        }

        return () => <TextField {...inputProps} onChange={handleChange} />;
    }, [dateConfig.inputMask, formatValue, handleChange, inputProps]);

    const className = React.useMemo(() => {
        if (bc.format === "4") {
            return classes["format-4"];
        }

        return "";
    }, [bc, classes]);

    React.useEffect(() => {
        const fn = (value: FieldValue) => {
            if (!value) {
                setFormatValue("");
                setMomentValue(undefined);

                return;
            }
            const mValue = moment(value as string, dateConfig.serverFormatIn, true);

            if (mValue.isValid() && !mValue.isSame(momentValue)) {
                setMomentValue(mValue);
                setFormatValue(mValue.format(dateConfig.format));
            }
        };

        fn(field.value);

        return reaction(() => field.value, fn);
    });

    if (!dateConfig) {
        return null;
    }

    return (
        <dateConfig.component
            open={open}
            dateConfig={dateConfig}
            onChange={onChange}
            value={momentValue}
            onOpenChange={handleCalendarOpenChange}
            getDisabledFunction={getDisabledFunction}
            className={className}
        >
            {textField}
        </dateConfig.component>
    );
};
