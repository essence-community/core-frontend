// @flow
import * as React from "react";
import BigNumberBase from "bignumber.js";
import isString from "lodash/isString";
import isEqual from "lodash/isEqual";
import {type BuilderBaseType} from "../../BuilderType";
import {makeRedirectUrl, getQueryParams} from "../../utils/redirect";
import {isEmpty} from "../../utils/base";
import {type GridColumnPropsType} from "./GridColumnTypes";

type StateType = {
    pathname?: string,
    blank: boolean,
    BigNumber?: BigNumberBase,
    decimalPrecision: number,
};

const BIG_PRECISION = 20;
const getDecimalPreccision = (bc: BuilderBaseType) => {
    if (bc.datatype === "integer") {
        return 0;
    }

    return isEmpty(bc.decimalprecision) ? 2 : parseInt(bc.decimalprecision, 10);
};
const getBigNumberInstance = (bc: BuilderBaseType): {BigNumber: BigNumberBase, decimalPrecision: number} => {
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

class GridColumnText extends React.Component<GridColumnPropsType, StateType> {
    state = {
        BigNumber: null,
        blank: false,
        decimalPrecision: 2,
        pathname: "",
    };

    constructor(props: GridColumnPropsType) {
        super(props);

        const {bc, record, pageStore} = this.props;
        const {redirecturl, columnsfilter} = this.props.bc;

        if (redirecturl) {
            this.state = {
                ...this.state,
                ...makeRedirectUrl({
                    authData: pageStore.applicationStore.authData,
                    bc,
                    columnsName: columnsfilter,
                    globalValues: pageStore.globalValues,
                    record,
                    redirecturl,
                }),
            };
        }

        if (bc.datatype === "numeric" || bc.datatype === "integer") {
            this.state = {
                ...this.state,
                ...getBigNumberInstance(bc),
            };
        }
    }

    componentDidUpdate(prevProps: GridColumnPropsType) {
        const {bc, record, pageStore} = this.props;
        const {redirecturl, columnsfilter} = this.props.bc;

        if (redirecturl && !isEqual(prevProps.record, record)) {
            this.setState(
                makeRedirectUrl({
                    authData: pageStore.applicationStore.authData,
                    bc,
                    columnsName: columnsfilter,
                    globalValues: pageStore.globalValues,
                    record,
                    redirecturl,
                }),
            );
        }
    }

    handleRedirect = (event: SyntheticEvent<*>) => {
        const {
            pageStore: {applicationStore, globalValues},
            bc: {redirecturl, columnsfilter},
            record,
        } = this.props;
        const queryValues = columnsfilter ? getQueryParams({columnsName: columnsfilter, globalValues, record}) : {};

        event.preventDefault();
        applicationStore.redirectToAction(redirecturl, queryValues);
    };

    renderNumber = (value: string | number, BigNumber: BigNumberBase, decimalPrecision: number): number => {
        const strValue = isString(value) ? value.replace(",", ".") : value.toString();
        let dPrecision = 0;

        if (decimalPrecision === -1) {
            const indexDeccimal = strValue.indexOf(".");

            dPrecision = indexDeccimal > -1 ? strValue.substr(indexDeccimal + 1).length : 0;
        } else {
            dPrecision = decimalPrecision;
        }

        return new BigNumber(strValue).decimalPlaces(dPrecision).toFormat(dPrecision);
    };

    // eslint-disable-next-line max-statements
    render() {
        const {BigNumber, blank, decimalPrecision, pathname} = this.state;
        let {value} = this.props;

        if (isEmpty(value)) {
            return null;
        }

        if (BigNumber) {
            value = this.renderNumber(value, BigNumber, decimalPrecision);
        } else if (typeof value === "string") {
            value = value.replace(/<br[\s\S]*/iu, "...");
        }

        if (this.props.trans) {
            value = this.props.trans(value, value);
        }

        if (pathname) {
            return (
                <a
                    href={pathname}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={blank ? undefined : this.handleRedirect}
                >
                    {value}
                </a>
            );
        }

        return value;
    }
}

export default GridColumnText;
