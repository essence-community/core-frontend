// @flow
import * as React from "react";
import MonthCalendar from "rc-calendar/lib/MonthCalendar";
import DatePicker from "rc-calendar/lib/Picker";
import ruRU from "rc-calendar/lib/locale/ru_RU";

class FieldDateMonth extends React.Component<any> {
    handleChange = (value: Object) => {
        const date = value ? value.format(this.props.dateConfig.serverFormat) : null;

        this.props.onChange(null, date);
    };

    render() {
        const {disabled, children, value, open} = this.props;
        const calendar = <MonthCalendar locale={ruRU} />;

        return (
            <DatePicker
                align={{
                    offset: [0, 0],
                    points: ["tr", "br"],
                }}
                disabled={disabled}
                calendar={calendar}
                value={value}
                onChange={this.handleChange}
                onOpenChange={this.props.onOpenChange}
                open={open}
            >
                {children}
            </DatePicker>
        );
    }
}

export default FieldDateMonth;
