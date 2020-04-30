// @flow
import * as React from "react";
import NumberFormat from "react-number-format";
import omit from "lodash/omit";
import isString from "lodash/isString";
import {getBigNumberInstance} from "@essence-community/constructor-share/utils";
import {type TextFieldChildProps} from "../../BuilderFieldType";

type PropsType = TextFieldChildProps & {
    inputRef: Function,
    onChange: (param: mixed) => void,
};
type NumberFormatParamsType = {
    value: string,
};

const MIN_VALUE = 10;
const MAX_VALUE = -10;

class NumberFormatCustom extends React.Component<PropsType> {
    maxSize: ?number;

    minValue: number = 0;

    maxValue: ?number;

    decimalPrecision: Number;

    BigNumber: BigNumberBase;

    constructor(...args: Array<*>) {
        super(...args);

        const {bc} = this.props;
        const {BigNumber, decimalPrecision} = getBigNumberInstance(bc);

        this.maxsize = bc.maxsize ? parseInt(bc.maxsize, 10) : undefined;
        this.minValue = bc.minvalue ? parseFloat(bc.minvalue.replace(",", ".")) : 0;
        this.maxValue = bc.maxvalue ? parseFloat(bc.maxvalue.replace(",", ".")) : undefined;
        this.decimalPrecision = decimalPrecision;
        this.BigNumber = BigNumber;
    }

    handleChange = ({value}: NumberFormatParamsType) => {
        this.props.onChange(value);
    };

    handleIsAllowed = ({value}: NumberFormatParamsType) => {
        const {maxSize} = this;

        if (maxSize && value.replace(/[,. ]/gu, "").length > maxSize) {
            return false;
        }
        const [, decimal] = value.split(".");

        if (decimal && decimal.length > this.decimalPrecision) {
            return false;
        }
        const num = new this.BigNumber(value);

        if (this.maxValue && this.maxValue > MAX_VALUE && num.isGreaterThan(this.maxValue)) {
            return false;
        }

        return this.minValue > MIN_VALUE || !num.isLessThan(this.minValue);
    };

    render() {
        const {inputRef, bc, ...otherProps} = this.props;
        const {thousandseparator, decimalseparator} = bc;

        return (
            <NumberFormat
                {...omit(otherProps, ["onChange"])}
                getInputRef={inputRef}
                onValueChange={this.handleChange}
                isNumericString
                allowNegative={this.minValue < 0}
                isAllowed={this.handleIsAllowed}
                thousandSeparator={isString(thousandseparator) ? thousandseparator : ""}
                decimalSeparator={decimalseparator ? decimalseparator : ","}
            />
        );
    }
}

export default NumberFormatCustom;
