/* eslint react/no-multi-comp:0, no-console:0 */
// @flow
import "rc-calendar/assets/index.css";
import * as React from "react";
import Calendar from "rc-calendar/lib/Calendar";
import DatePicker from "rc-calendar/lib/Picker";
import ruRU from "rc-calendar/lib/locale/ru_RU";

class FieldDateBase extends React.Component<any> {
    handleChange = (value: Object) => {
        const date = value ? value.format(this.props.dateConfig.serverFormat) : null;

        this.props.onChange(null, date);
        this.props.onOpenChange(false);
    };

    render() {
        const {disabled, children, value, open, dateConfig} = this.props;
        const calendar = (
            <Calendar
                locale={ruRU}
                mode={dateConfig.mode}
                onPanelChange={this.handleChange}
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
                onOpenChange={this.props.onOpenChange}
                open={open}
            >
                {children}
            </DatePicker>
        );
    }
}

export default FieldDateBase;
