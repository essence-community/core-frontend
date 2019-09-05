// @flow
import * as React from "react";
import {observe, reaction} from "mobx";
import {observer, disposeOnUnmount} from "mobx-react";
import {type GridModelType} from "../../stores/GridModel";
import {GRID_ROW_HEIGHT} from "../../constants";
import {getTreeRecords} from "../../utils/grid";

type PropsType = {
    store: GridModelType,
    renderRecord: (record: Object, index: number) => React.Node,
};

type StateType = {
    records: Array<Object>,
};

const getRecords = (store, records: Array<Object>) => {
    const maxHeight = GRID_ROW_HEIGHT * records.length;
    let startRecord = Math.floor(store.scrollTop / GRID_ROW_HEIGHT);
    const endRecord = Math.min(Math.ceil((store.scrollTop + store.gridHeight) / GRID_ROW_HEIGHT) + 2, records.length);

    if (maxHeight <= store.gridHeight * 2) {
        return {
            heightBottom: 0,
            heightTop: 0,
            records,
        };
    }

    if (startRecord % 2 === 1) {
        startRecord = Math.max(startRecord - 2, 0);
    } else {
        startRecord = Math.max(startRecord - 3, 0);
    }

    return {
        heightBottom: (records.length - endRecord) * GRID_ROW_HEIGHT,
        heightTop: startRecord * GRID_ROW_HEIGHT,
        records: records.slice(startRecord, endRecord),
    };
};

class VirtualizedGrid extends React.Component<PropsType, StateType> {
    state = {
        records: [],
    };

    componentDidMount() {
        const {store} = this.props;

        if (store.bc.type === "TREEGRID") {
            disposeOnUnmount(this, [
                reaction(() => store.recordsTree, this.handleTreeRecords),
                observe(store.expansionRecords, this.handleTreeRecords),
            ]);
        }
    }

    handleTreeRecords = () => {
        const {store} = this.props;

        this.setState({records: getTreeRecords(store)});
    };

    render() {
        const {store, renderRecord} = this.props;

        if (store.bc.type === "TREEGRID" && !store.rootNode) {
            return null;
        }

        const {records, heightTop, heightBottom} = getRecords(
            store,
            store.bc.type === "GRID" ? store.recordsStore.records : this.state.records,
        );

        return (
            <React.Fragment>
                {heightTop ? <tr style={{height: heightTop}} /> : null}
                {records.map(renderRecord)}
                {heightBottom ? <tr style={{height: heightBottom}} /> : null}
            </React.Fragment>
        );
    }
}

export default observer(VirtualizedGrid);
