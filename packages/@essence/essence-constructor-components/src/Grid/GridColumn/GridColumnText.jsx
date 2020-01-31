// @flow
import * as React from "react";
import isString from "lodash/isString";
import isEqual from "lodash/isEqual";
import {makeRedirectUrl, getQueryParams} from "../../utils/redirect";
import {getBigNumberInstance} from "../../utils/bignumber";
import {isEmpty} from "../../utils/base";
import {type GridColumnPropsType} from "./GridColumnTypes";

type StateType = {
    pathname?: string,
    blank: boolean,
    BigNumber?: BigNumberBase,
    decimalPrecision: number,
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
            const [, decimal] = strValue.split(".");

            dPrecision = decimal ? decimal.length : 0;
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
            // eslint-disable-next-line prefer-named-capture-group
            value = value.replace(/((<br)|\r|\n)[\s\S]*/iu, "...");
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
