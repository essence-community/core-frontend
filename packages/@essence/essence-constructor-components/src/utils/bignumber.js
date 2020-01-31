// @flow
import BigNumberBase from "bignumber.js";
import isString from "lodash/isString";
import {type BuilderBaseType} from "../BuilderType";
import {isEmpty} from "./base";

const BIG_PRECISION = 20;
const getDecimalPreccision = (bc: BuilderBaseType) => {
    if (bc.datatype === "integer") {
        return 0;
    }

    return isEmpty(bc.decimalprecision) ? 2 : parseInt(bc.decimalprecision, 10);
};

export const getBigNumberInstance = (bc: BuilderBaseType): {BigNumber: BigNumberBase, decimalPrecision: number} => {
    const decimalPrecision = getDecimalPreccision(bc);

    const conf = {
        DECIMAL_PLACES: bc.decimalprecision === "-1" ? BIG_PRECISION : decimalPrecision,
        FORMAT: {
            decimalSeparator: bc.decimalseparator || ",",
            fractionGroupSeparator: " ",
            fractionGroupSize: 0,
            groupSeparator: isString(bc.thousandseparator) ? bc.thousandseparator : " ",
            groupSize: 3,
            secondaryGroupSize: 0,
            suffix: bc.currencysign || "",
        },
        ROUNDING_MODE: 1,
    };

    return {
        BigNumber: BigNumberBase.clone(conf),
        decimalPrecision,
    };
};
