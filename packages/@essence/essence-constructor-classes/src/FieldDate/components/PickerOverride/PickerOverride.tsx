import RCPicker from "rc-calendar/lib/Picker";

export class DatePicker extends RCPicker {
    // Don't need to close popover for blur if in the same instance
    onCalendarBlur = () => {
        // This.setOpen(false);
    };
}
