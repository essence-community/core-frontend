// @flow
import * as React from "react";
import {reaction} from "mobx";
import {disposeOnUnmount} from "mobx-react";
import {type BuilderGridType} from "../BuilderGridType";
import {type GridModelType} from "../../stores/GridModel";
import GridDetail from "../GridComponents/GridDetail";
import BaseGridRow, {type BaseGridRowPropsType} from "./BaseGridRow";

type PropsType = BaseGridRowPropsType & {
    store: GridModelType,
    record: Object,
    bc: BuilderGridType,
    index: number,
    indexStripe: boolean,
};
type StateType = {
    isExpanded: boolean,
};

class GridRow extends React.Component<PropsType, StateType> {
    static defaultProps = {
        indexStripe: true,
    };

    state = {
        isExpanded: false,
    };

    componentDidMount() {
        const {bc} = this.props;

        if (bc.detail) {
            disposeOnUnmount(this, reaction(this.handleCheckExpanded, this.handleChangeExpanded));

            if (this.handleCheckExpanded()) {
                this.setState({isExpanded: true});
            }
        }
    }

    handleChangeExpanded = (isExpanded: boolean): void => {
        this.setState({isExpanded});
    };

    handleCheckExpanded = (): boolean => {
        const {store, record} = this.props;

        return Boolean(store.expansionRecords.get(record.ckId));
    };

    render() {
        const {isExpanded} = this.state;
        const {bc, indexStripe} = this.props;

        return (
            <React.Fragment>
                <BaseGridRow {...this.props} indexStripe={indexStripe} isExpanded={isExpanded} />
                {isExpanded && bc.detail ? (
                    <BaseGridRow {...this.props} indexStripe isDetail>
                        <GridDetail {...this.props} detail={bc.detail} />
                    </BaseGridRow>
                ) : null}
            </React.Fragment>
        );
    }
}

export default GridRow;
