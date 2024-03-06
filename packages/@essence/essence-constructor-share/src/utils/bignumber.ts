import BigNumberBase from "bignumber.js";
import {IBuilderConfig} from "../types";
import {isEmpty} from "./base";

interface IGetBigNumberInstanceResult {
    BigNumber: typeof BigNumberBase;
    decimalPrecision: number;
}

const BIG_PRECISION = 20;

function getDecimalPreccision(bc: IBuilderConfig): number {
    if (bc.datatype === "integer") {
        return 0;
    }

    return bc.decimalprecision ?? 2;
}

export function getBigNumberInstance(bc: IBuilderConfig): IGetBigNumberInstanceResult {
    const decimalPrecision = getDecimalPreccision(bc);

    const conf: BigNumberBase.Config = {
        DECIMAL_PLACES: bc.decimalprecision === -1 ? BIG_PRECISION : decimalPrecision,
        FORMAT: {
            decimalSeparator: bc.decimalseparator || ",",
            fractionGroupSeparator: " ",
            fractionGroupSize: 0,
            groupSeparator: typeof bc.thousandseparator === "string" ? bc.thousandseparator : "",
            groupSize: isEmpty(bc.thousandseparator) ? 0 : 3,
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
