// @flow
import * as React from "react";
import Calendar from "rc-calendar";
import TimePickerPanel from "rc-time-picker/lib/Panel";
import DatePicker from "./PickerOverride";
import {ru} from "./fieldDateHelpers";

class FieldDateMain extends React.Component<any, any> {
    handleChange = (value: Object) => {
        const date = value ? value.format(this.props.dateConfig.serverFormat) : null;

        this.props.onChange(null, date);
    };

    render() {
        const {disabled, children, value, dateConfig, open} = this.props;
        const calendar = (
            <Calendar
                locale={ru}
                dateInputPlaceholder={dateConfig.placeholder}
                formatter={dateConfig.format}
                showDateInput={false}
                timePicker={dateConfig.withTime ? <TimePickerPanel /> : null}
                disabledDate={this.props.getDisabledFunction()}
                className={this.props.className}
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
                value={value}
                onOpenChange={this.props.onOpenChange}
                onChange={this.handleChange}
                open={open}
            >
                {children}
            </DatePicker>
        );
    }
}

export default FieldDateMain;
