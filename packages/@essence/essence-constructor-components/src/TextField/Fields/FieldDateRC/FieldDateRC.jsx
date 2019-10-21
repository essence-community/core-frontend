// @flow

import * as React from "react";
import moment from "moment";
import {withStyles} from "@material-ui/core/styles";
import {IconButton, InputAdornment} from "@material-ui/core";
import {Icon} from "@essence/essence-constructor-share/Icon";
import {type TextFieldChildProps} from "../../BuilderFieldType";
import FieldMask from "../FieldMask/FieldMask";
import {getFieldDate} from "./fieldDateHelpers";
import styles from "./FieldDateRCSStyles";

import "moment/locale/ru";

type PropsType = TextFieldChildProps & {
    classes: {
        [$Keys<$Call<typeof styles, any>>]: string,
    },
};

type StateType = {
    dateConfig: Object,
    formattedValue: string,
    lastValue?: string,
    momentValue?: Object,
    open: boolean,
};

export class FieldDateRCBase extends React.Component<PropsType, StateType> {
    inputElement: ?HTMLElement = null;

    dateConfig = getFieldDate(this.props.bc.format);

    static defaultProps = {
        classes: {},
    };

    static getDerivedStateFromProps(nextProps: PropsType, prevState: StateType) {
        const {value} = nextProps;
        const newState: $Shape<StateType> = {
            lastValue: String(value),
        };

        if (!value) {
            newState.formattedValue = String(value);
        } else if (
            value !== prevState.lastValue &&
            value !== prevState.formattedValue &&
            value !== "defaultvaluequery"
        ) {
            const momentValue = moment(value);

            if (momentValue.isValid()) {
                newState.momentValue = momentValue;
                newState.formattedValue = momentValue.format(prevState.dateConfig.format);
            }
        }

        return newState;
    }

    constructor(props: PropsType) {
        super(props);

        const {bc} = this.props;
        const dateConfig = getFieldDate(bc.format);
        const initialState = {
            dateConfig,
            formattedValue: "",
            open: false,
        };

        this.dateConfig = dateConfig;
        this.state = {
            ...initialState,
            ...FieldDateRCBase.getDerivedStateFromProps(this.props, initialState),
        };
    }

    componentWillUnmount() {
        this.props.pageStore.removeScrollEvent(this.handleScrollClose);
    }

    getDisabledFunction = () => {
        const {bc} = this.props;

        switch (true) {
            case Boolean(bc.disabledstartdate):
                return this.disabledStartDate;
            case Boolean(bc.disabledenddate):
                return this.disabledEndDate;
            default:
                return undefined;
        }
    };

    disabledEndDate = (endValue: any) => {
        const {disabledenddate} = this.props.bc;

        if (!endValue || !disabledenddate) {
            return false;
        }

        const startValue = moment(this.props.form.$(disabledenddate).value);

        if (!startValue.isValid()) {
            return false;
        }

        // - true|false for fraction value
        return endValue.diff(startValue, "days", true) < 0;
    };

    disabledStartDate = (startValue: any) => {
        const {disabledstartdate} = this.props.bc;

        if (!startValue || !disabledstartdate) {
            return false;
        }

        const endValue = moment(this.props.form.$(disabledstartdate).value);

        if (!endValue.isValid()) {
            return false;
        }

        // - true|false for fraction value
        return endValue.diff(startValue, "days", true) < 0;
    };

    handleFieldChange = (event: ?SyntheticEvent<>, value: mixed) => {
        const {onChange} = this.props;
        const {dateConfig} = this.state;
        const strValue = typeof value === "string" ? value : "";
        const numberValue = strValue.replace(/\./g, "").trim();
        const momentValue = moment(strValue, dateConfig.format, true);

        this.setState({formattedValue: strValue});

        if (momentValue.isValid()) {
            onChange(event, momentValue.format(dateConfig.serverFormat));
            this.setState({momentValue});
        } else {
            onChange(event, numberValue ? strValue : "");
        }
    };

    handleCalendarOpen = () => {
        this.setState({open: true});
    };

    handleFocus = (event: SyntheticEvent<>) => {
        event.stopPropagation();
        event.preventDefault();
    };

    handleSetFocus = () => {
        if (this.inputElement) {
            this.inputElement.focus();
        }
    };

    handleCalendarOpenChange = (open: boolean) => {
        const {pageStore} = this.props;

        if (open === false) {
            this.setState({open});

            requestAnimationFrame(this.handleSetFocus);
        } else {
            pageStore.addScrollEvent(this.handleScrollClose);
        }
    };

    handleScrollClose = () => {
        const {pageStore} = this.props;

        this.setState({open: false});
        pageStore.removeScrollEvent(this.handleScrollClose);
    };

    renderCalendarIcon = () => (
        <IconButton
            color="secondary"
            key="calendar-open"
            onClick={this.handleCalendarOpen}
            onFocus={this.handleFocus}
            tabIndex={-1}
            disableRipple
            className={this.props.classes.rootIcon}
        >
            <Icon iconfont="calendar" size="xs" />
        </IconButton>
    );

    getInputInstance = (ref: HTMLInputElement | null) => (this.inputElement = ref);

    renderTextField = () => {
        const {
            InputLabelProps,
            disabled,
            bc,
            InputProps,
            style,
            tips,
            field,
            className,
            form,
            onClear,
            pageStore,
            visible,
            onInitGlobal,
            tabIndex,
        } = this.props;
        const errorText = field.get("error");
        const {formattedValue} = this.state;
        const endAdornments = disabled ? tips : [...tips, this.renderCalendarIcon()];

        return (
            <FieldMask
                field={field}
                errorText={errorText && errorText.replace(":inputValue", formattedValue)}
                bc={bc}
                InputProps={{
                    ...InputProps,
                    endAdornment: <InputAdornment position="end">{endAdornments}</InputAdornment>,
                }}
                // eslint-disable-next-line react/jsx-no-duplicate-props
                inputProps={{tabIndex}}
                inputRef={this.getInputInstance}
                style={style}
                className={className}
                disabled={disabled}
                value={formattedValue}
                InputLabelProps={InputLabelProps}
                imask={this.state.dateConfig.inputMask}
                form={form}
                onChange={this.handleFieldChange}
                onClear={onClear}
                tips={endAdornments}
                pageStore={pageStore}
                visible={visible}
                onInitGlobal={onInitGlobal}
                tabIndex={tabIndex}
            />
        );
    };

    handleEndDateOnChange = (event: ?SyntheticEvent<>, value: mixed) => {
        this.props.onChange(event, value ? this.state.dateConfig.serverFormatEnd(value) : value);
    };

    render() {
        const {
            form,
            bc: {disabledenddate, format},
            classes,
            onChange,
        } = this.props;
        const Component = this.state.dateConfig.component;
        let className = "";

        if (format === "4") {
            className = classes["format-4"];
        }

        return (
            <Component
                open={this.state.open}
                dateConfig={this.state.dateConfig}
                onChange={disabledenddate ? this.handleEndDateOnChange : onChange}
                value={this.state.momentValue}
                onOpenChange={this.handleCalendarOpenChange}
                getDisabledFunction={this.getDisabledFunction}
                form={form}
                className={className}
            >
                {this.renderTextField}
            </Component>
        );
    }
}

export default withStyles(styles)(FieldDateRCBase);
