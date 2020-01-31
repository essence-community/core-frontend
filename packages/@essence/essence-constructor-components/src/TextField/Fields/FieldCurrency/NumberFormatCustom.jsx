// @flow
import * as React from "react";
import NumberFormat from "react-number-format";
import omit from "lodash/omit";
import isString from "lodash/isString";
import {type TextFieldChildProps} from "../../BuilderFieldType";
import {getBigNumberInstance} from "../../../utils/bignumber";

type PropsType = TextFieldChildProps & {
    inputRef: Function,
    onChange: (param: mixed) => void,
};
type NumberFormatParamsType = {
    value: string,
};

class NumberFormatCustom extends React.Component<PropsType> {
    maxSize: ?number;

    minValue: number = 0;

    maxValue: ?number;

    dPrecision: Number;

    BigNumber: BigNumberBase;

    constructor(...args: Array<*>) {
        super(...args);

        const {bc} = this.props;
        const {BigNumber} = getBigNumberInstance(bc);

        this.maxsize = bc.maxsize ? parseInt(bc.maxsize, 10) : undefined;
        this.minValue = bc.minvalue ? parseInt(bc.minvalue, 10) : 0;
        this.maxValue = bc.maxvalue ? parseInt(bc.maxvalue, 10) : undefined;
        this.dPrecision = parseInt(bc.decimalprecision || "2", 10);
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

        if (decimal && decimal.length > this.dPrecision) {
            return false;
        }
        const num = new this.BigNumber(value);

        if (this.maxValue && num.isGreaterThan(this.maxValue)) {
            return false;
        }

        return !num.isLessThan(this.minValue);
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
