import * as React from "react";
import ReactNumberFormat, {NumberFormatValues} from "react-number-format";
import {getBigNumberInstance} from "@essence-community/constructor-share/utils";
import {IBuilderConfig} from "@essence-community/constructor-share/types";
import {InputBaseComponentProps} from "@material-ui/core";

interface INumberFormatProps extends InputBaseComponentProps {
    bc: IBuilderConfig;
    inputRef: React.RefObject<HTMLInputElement>;
    defaultValue: string;
    onValueChange: (value: string) => void;
}

const MIN_VALUE = 10;
const MAX_VALUE = -10;

export const NumberFormat: React.FC<INumberFormatProps> = (props) => {
    const {bc, onValueChange, inputRef, ...inputProps} = props;
    const config = React.useMemo(() => {
        const {BigNumber, decimalPrecision} = getBigNumberInstance(bc);

        return {
            BigNumber,
            decimalPrecision,
            maxSize: bc.maxsize ? parseInt(bc.maxsize, 10) : undefined,
            maxValue: bc.maxvalue ? parseFloat(bc.maxvalue.replace(",", ".")) : undefined,
            minValue: bc.minvalue ? parseFloat(bc.minvalue.replace(",", ".")) : 0,
        };
    }, [bc]);
    const handleChange = ({value}: NumberFormatValues) => {
        onValueChange(value);
    };

    const handleIsAllowed = ({value}: NumberFormatValues) => {
        if (config.maxSize && value.replace(/[,. ]/gu, "").length > config.maxSize) {
            return false;
        }
        const [, decimal] = value.split(".");

        if (decimal && decimal.length > config.decimalPrecision) {
            return false;
        }
        const num = new config.BigNumber(value);

        if (config.maxValue && config.maxValue > MAX_VALUE && num.isGreaterThan(config.maxValue)) {
            return false;
        }

        return config.minValue > MIN_VALUE || !num.isLessThan(config.minValue);
    };

    return (
        <ReactNumberFormat
            {...inputProps}
            getInputRef={inputRef}
            onValueChange={handleChange}
            isNumericString
            allowNegative={config.minValue < 0}
            isAllowed={handleIsAllowed}
            thousandSeparator={typeof bc.thousandseparator === "string" ? bc.thousandseparator : ""}
            decimalSeparator={bc.decimalseparator ? bc.decimalseparator : ","}
        />
    );
};
