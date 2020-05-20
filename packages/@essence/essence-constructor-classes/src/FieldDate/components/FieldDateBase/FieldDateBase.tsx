import * as React from "react";
import Calendar from "rc-calendar/lib/Calendar";
import {useTranslation} from "@essence-community/constructor-share/utils";
import * as moment from "moment";
import {DatePicker} from "../PickerOverride/PickerOverride";
import {toLocale} from "../../util/locale";
import {IFieldDateProps} from "../FieldDate.types";

export const FieldDateBase: React.FC<IFieldDateProps> = (props) => {
    const {dateConfig, onChange, disabled, children, value, open, onOpenChange} = props;
    const [trans] = useTranslation("meta");
    const handleChange = React.useCallback(
        (val: moment.Moment) => {
            const date = val ? val.format(dateConfig.serverFormat) : null;

            onChange(date);
            onOpenChange(false);
        },
        [dateConfig.serverFormat, onChange, onOpenChange],
    );

    const calendar = (
        <Calendar
            locale={toLocale(trans)}
            mode={dateConfig.mode}
            onPanelChange={handleChange}
            showDateInput={false}
            value={value}
        />
    );

    return (
        <DatePicker
            align={{
                offset: [0, 0],
                points: ["tr", "br"],
            }}
            disabled={disabled}
            calendar={calendar}
            onOpenChange={onOpenChange}
            open={open}
        >
            {children}
        </DatePicker>
    );
};
