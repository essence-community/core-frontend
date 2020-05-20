import * as React from "react";
import MonthCalendar from "rc-calendar/lib/MonthCalendar";
import {useTranslation} from "@essence-community/constructor-share/utils";
import * as moment from "moment";
import {DatePicker} from "../PickerOverride/PickerOverride";
import {toLocale} from "../../util/locale";
import {IFieldDateProps} from "../FieldDate.types";

export const FieldDateMonth: React.FC<IFieldDateProps> = (props) => {
    const {dateConfig, onChange, disabled, children, value, open, onOpenChange} = props;
    const [trans] = useTranslation("meta");
    const handleChange = React.useCallback(
        (val: moment.Moment) => {
            const date = val ? val.format(dateConfig.serverFormat) : null;

            onChange(date);
        },
        [dateConfig, onChange],
    );

    const calendar = <MonthCalendar locale={toLocale(trans)} />;

    return (
        <DatePicker
            align={{
                offset: [0, 0],
                points: ["tr", "br"],
            }}
            disabled={disabled}
            calendar={calendar}
            value={value}
            onChange={handleChange}
            onOpenChange={onOpenChange}
            open={open}
        >
            {children}
        </DatePicker>
    );
};
