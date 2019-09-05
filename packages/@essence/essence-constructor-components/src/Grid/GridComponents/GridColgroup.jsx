// @flow
import * as React from "react";
import {observer} from "mobx-react";
import {type GridModelType} from "../../stores/GridModel";
import {WIDTH_MAP} from "../BaseGridTableHeader";

type PropsType = {
    store: GridModelType,
};

export class GridColgroup extends React.Component<PropsType> {
    render() {
        const {store} = this.props;

        return (
            <colgroup>
                {store.gridColumns.map(({ckPageObject, datatype}, index) => (
                    <col
                        key={index}
                        style={{
                            width: WIDTH_MAP[datatype] || store.columnsWidth.get(ckPageObject),
                        }}
                    />
                ))}
            </colgroup>
        );
    }
}

export default observer(GridColgroup);
