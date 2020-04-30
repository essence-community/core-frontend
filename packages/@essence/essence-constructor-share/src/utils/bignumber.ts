import BigNumberBase from "bignumber.js";
import {IBuilderConfig} from "../types";

interface IGetBigNumberInstanceResult {
    BigNumber: typeof BigNumberBase;
    decimalPrecision: number;
}

const BIG_PRECISION = 20;

function getDecimalPreccision(bc: IBuilderConfig) {
    if (bc.datatype === "integer") {
        return 0;
    }

    return bc.decimalprecision ? parseInt(bc.decimalprecision, 10) : 2;
}

export function getBigNumberInstance(bc: IBuilderConfig): IGetBigNumberInstanceResult {
    const decimalPrecision = getDecimalPreccision(bc);

    const conf: BigNumberBase.Config = {
        DECIMAL_PLACES: bc.decimalprecision === "-1" ? BIG_PRECISION : decimalPrecision,
        FORMAT: {
            decimalSeparator: bc.decimalseparator || ",",
            fractionGroupSeparator: " ",
            fractionGroupSize: 0,
            groupSeparator: typeof bc.thousandseparator === "string" ? bc.thousandseparator : " ",
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
}

export {BigNumberBase};
