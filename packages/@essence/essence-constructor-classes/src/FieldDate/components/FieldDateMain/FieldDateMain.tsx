import * as React from "react";
import Calendar from "rc-calendar";
import TimePickerPanel from "rc-time-picker/lib/Panel";
import {useTranslation} from "@essence-community/constructor-share/utils";
import * as moment from "moment";
import {PickerOverride} from "../PickerOverride/PickerOverride";
import {toLocale} from "../../util/locale";
import {IFieldDateProps} from "../FieldDate.types";

export const FieldDateMain: React.FC<IFieldDateProps> = (props) => {
    const {dateConfig, onChange, disabled, children, value, open, onOpenChange, className, getDisabledFunction} = props;
    const [trans] = useTranslation("meta");
    const handleChange = React.useCallback(
        (val: moment.Moment) => {
            const date = val ? val.format(dateConfig.serverFormat) : null;

            onChange(date);
        },
        [dateConfig, onChange],
    );

    const calendar = (
        <Calendar
            locale={toLocale(trans)}
            dateInputPlaceholder={dateConfig.format}
            format={dateConfig.format}
            showDateInput={false}
            timePicker={dateConfig.withTime ? <TimePickerPanel /> : null}
            disabledDate={getDisabledFunction()}
            className={className}
        />
    );

    return (
        <PickerOverride
            align={{
                offset: [0, 0],
                points: ["tr", "br"],
            }}
            disabled={disabled}
            calendar={calendar}
            value={value}
            onOpenChange={onOpenChange}
            onChange={handleChange}
            open={open}
        >
            {children}
        </PickerOverride>
    );
};
