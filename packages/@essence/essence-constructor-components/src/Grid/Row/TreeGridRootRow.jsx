// @flow
import * as React from "react";
import {observer} from "mobx-react";
import {VAR_RECORD_PAGE_OBJECT_ID, VALUE_SELF_ROOT} from "@essence-community/constructor-share/constants";
import {mapComponentOne} from "@essence-community/constructor-share/components";
import {RecordContext} from "@essence-community/constructor-share/context";
import {type GridModelType} from "../../stores/GridModel";
import {type PageModelType} from "../../stores/PageModel";
import {type BuilderGridType} from "../BuilderGridType";
import BaseGridRow from "./BaseGridRow";

type PropsType = {
    store: GridModelType,
    bc: BuilderGridType,
    pageStore: PageModelType,
};

const DEFAULT_ROOT_RECORD = {
    type: "root",
};

class TreeGridRootRow extends React.Component<PropsType> {
    record = {
        [this.props.store.recordsStore.recordId]: VALUE_SELF_ROOT,
        type: "root",
    };

    render() {
        const {store, bc} = this.props;

        return (
            <BaseGridRow
                data-page-object={`${bc[VAR_RECORD_PAGE_OBJECT_ID]}-root-row`}
                tabIndex="-1"
                visible
                store={store}
                bc={bc}
                record={DEFAULT_ROOT_RECORD}
            >
                <RecordContext.Provider value={this.record}>
                    {store.gridColumns.map((column) =>
                        column.datatype === "tree" ? (
                            mapComponentOne(column, (ChildCmp) => (
                                <ChildCmp key={column[VAR_RECORD_PAGE_OBJECT_ID]} {...this.props} bc={column} />
                            ))
                        ) : (
                            <td key={column[VAR_RECORD_PAGE_OBJECT_ID]} />
                        ),
                    )}
                </RecordContext.Provider>
            </BaseGridRow>
        );
    }
}

export default observer(TreeGridRootRow);
