// @flow
import * as React from "react";
import NumberFormat from "react-number-format";
import omit from "lodash/omit";
import isString from "lodash/isString";
import {type TextFieldChildProps} from "../../BuilderFieldType";

type PropsType = TextFieldChildProps & {
    inputRef: Function,
    onChange: (param: mixed) => void,
};
type NumberFormatParamsType = {
    value: string,
};

const BIG_PRECISION = 20;
const getDecimalScale = (decimalprecision) => {
    if (decimalprecision === "-1") {
        return BIG_PRECISION;
    }

    if (typeof decimalprecision === "string") {
        return parseInt(decimalprecision, 10);
    }

    return 2;
};

class NumberFormatCustom extends React.Component<PropsType> {
    maxsize: ?number;

    constructor(...args: Array<*>) {
        super(...args);

        const {bc} = this.props;

        this.maxsize = bc.maxsize ? parseInt(bc.maxsize, 10) : undefined;
    }

    handleChange = ({value}: NumberFormatParamsType) => {
        this.props.onChange(value);
    };

    handleIsAllowed = ({value}: NumberFormatParamsType) => {
        const {maxsize} = this;

        if (maxsize && value.replace(/[,. ]/gu, "").length > maxsize) {
            return false;
        }

        return true;
    };

    render() {
        const {inputRef, bc, ...otherProps} = this.props;
        const {thousandseparator, decimalseparator, decimalprecision} = bc;

        return (
            <NumberFormat
                {...omit(otherProps, ["onChange"])}
                getInputRef={inputRef}
                onValueChange={this.handleChange}
                isNumericString={true}
                isAllowed={this.handleIsAllowed}
                thousandSeparator={isString(thousandseparator) ? thousandseparator : ""}
                decimalSeparator={decimalseparator ? decimalseparator : ","}
                decimalScale={getDecimalScale(decimalprecision)}
            />
        );
    }
}

export default NumberFormatCustom;
