// @flow
import * as React from "react";
import {observer} from "mobx-react";
import {VAR_RECORD_PAGE_OBJECT_ID} from "@essence/essence-constructor-share/constants";
import {type GridModelType} from "../../stores/GridModel";
import {type PageModelType} from "../../stores/PageModel";
import {type BuilderGridType} from "../BuilderGridType";
import GridCell from "../Cell/GridCell";
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
    render() {
        const {store, bc, pageStore} = this.props;

        return (
            <BaseGridRow
                data-page-object={`${bc[VAR_RECORD_PAGE_OBJECT_ID]}-root-row`}
                tabIndex="-1"
                visible
                store={store}
                bc={bc}
                record={DEFAULT_ROOT_RECORD}
            >
                {store.gridColumns.map((column) =>
                    column.istree === "true" ? (
                        <GridCell
                            key={column[VAR_RECORD_PAGE_OBJECT_ID]}
                            column={column}
                            bc={bc}
                            record={DEFAULT_ROOT_RECORD}
                            pageStore={pageStore}
                            store={store}
                            visible
                        />
                    ) : (
                        <td key={column[VAR_RECORD_PAGE_OBJECT_ID]} />
                    ),
                )}
            </BaseGridRow>
        );
    }
}

export default observer(TreeGridRootRow);
