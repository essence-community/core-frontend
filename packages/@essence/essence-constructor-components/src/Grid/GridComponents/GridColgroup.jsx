// @flow
import * as React from "react";
import {observer} from "mobx-react";
import {VAR_RECORD_PAGE_OBJECT_ID} from "@essence-community/constructor-share/constants";
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
                {store.gridColumns.map(({[VAR_RECORD_PAGE_OBJECT_ID]: ckPageObject, datatype}, index) => (
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
