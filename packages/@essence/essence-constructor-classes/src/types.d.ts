/* eslint-disable no-duplicate-imports */
/* eslint-disable import/no-duplicates */
/* eslint-disable max-classes-per-file */
declare module "*.png";
declare module "*.svg";
declare module "rc-calendar/lib/Picker" {
    import * as moment from "moment";
    import * as React from "react";

    type Moment = moment.Moment;

    export interface IPickerProps {
        // PrefixCls of this component
        prefixCls?: string;
        calendar: React.ReactElement;
        // Whether picker is disabled
        disabled?: boolean;
        // One of ['left','right','top','bottom', 'topLeft', 'topRight', 'bottomLeft', 'bottomRight']
        placement?: string | object;
        /*
         * AlignConfig of [dom-align](https://github.com/yiminghe/dom-align)
         * value will be merged into placement's align config.
         */
        align?: object;
        // Index.css support 'slide-up'
        animation?: string;
        // Css class for animation
        transitionName?: string;
        // Current value like input's value
        value?: Moment | Moment[];
        // DefaultValue like input's defaultValue
        defaultValue?: Moment | Moment[];
        // Called when select a different value
        onChange?: (value: Moment) => void;
        // Called when open/close picker
        onOpenChange?: (open: boolean) => void;
        // Current open state of picker. controlled prop
        open?: boolean;
        // () => {return document.body;} 	dom node where calendar to be rendered into
        getCalendarContainer?: () => HTMLElement;
        onBlur?: () => void;
        dropdownClassName?: string;
    }

    export default class Picker extends React.Component<IPickerProps> {}
}

declare module "rc-calendar/lib/MonthCalendar" {
    import * as moment from "moment";
    import * as React from "react";

    type Moment = moment.Moment;

    interface IMonthCalendarProps {
        // PrefixCls of this component
        prefixCls?: string;
        // Additional css class of root dom node
        className?: string;
        // Additional style of root dom node
        style?: Record<string, number | string>;
        // Current value like input's value
        value?: Moment;
        // DefaultValue like input's defaultValue
        defaultValue?: Moment;
        // Import from 'rc-calendar/lib/locale/en_US' 	calendar locale
        locale: Record<string, any>;
        // Whether to disable select of current month
        disabledDate?: (current: moment) => boolean;
        // Called when a date is selected from calendar
        onSelect?: (date: moment) => void;
        // Custom month cell render method
        monthCellRender?: function;
        // Custom month cell content render method,the content will be appended to the cell.
        monthCellContentRender?: function;
        // Moment) 		called when a date is changed inside calendar (next year/next month/keyboard)
        onChange?: (date: moment) => void;
        // => React.Node
        renderFooter?: () => React.ReactNode;
    }

    export default class MonthCalendar extends React.Component<IMonthCalendarProps> {}
}

declare module "rc-time-picker/lib/Panel" {
    import * as moment from "moment";
    import * as React from "react";

    type Moment = moment.Moment;

    interface ITimePickerProps {
        prefixCls?: string;
        onChange?: (val?: Moment) => void;
        disabledHours?: () => number[];
        disabledMinutes?: () => number[];
        disabledSeconds?: () => number[];
        defaultOpenValue?: Moment;
        use12Hours?: boolean;
        inputReadOnly?: boolean;
    }

    export default class TimePickerProps extends React.Component<ITimePickerProps> {}
}

declare module "rc-calendar/lib/Calendar" {
    import * as moment from "moment";
    import * as React from "react";

    type Mode = "time" | "date" | "month" | "year" | "decade";

    interface ICalendarProps {
        prefixCls?: string;
        className?: string;
        style?: React.CSSProperties;
        defaultValue?: Moment;
        value?: Moment;
        selectedValue?: Moment;
        mode?: Mode;
        locale?: object;
        format?: string | string[];
        showDateInput?: boolean;
        showWeekNumber?: boolean;
        showToday?: boolean;
        showOk?: boolean;
        onSelect?: (date: Moment) => void;
        onOk?: () => void;
        onKeyDown?: () => void;
        timePicker?: React.ReactNode;
        dateInputPlaceholder?: string;
        onClear?: () => void;
        onChange?: (date: Moment | null) => void;
        onPanelChange?: (date: Moment | null, mode: Mode) => void;
        disabledDate?: (current: Moment | undefined) => boolean;
        disabledTime?: (current: Moment | undefined) => object;
        dateRender?: (current: Moment, value: Moment) => React.ReactNode;
        renderFooter?: () => React.ReactNode;
        renderSidebar?: () => React.ReactNode;
        inputMode?: string;
        monthCellRender?: (current: Moment, locale: Record<string, any>) => string;
        monthCellContentRender?: (current: Moment, locale: Record<string, any>) => React.ReactNode;
    }

    export default class Calendar extends React.Component<ICalendarProps> {}
}
