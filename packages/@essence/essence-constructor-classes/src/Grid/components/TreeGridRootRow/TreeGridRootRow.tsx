import * as React from "react";
import {IClassProps} from "@essence-community/constructor-share/types";
import {VALUE_SELF_ROOT, VAR_RECORD_PAGE_OBJECT_ID} from "@essence-community/constructor-share/constants";
import {RecordContext} from "@essence-community/constructor-share/context";
import {mapComponentOne} from "@essence-community/constructor-share/components";
import {useObserver} from "mobx-react-lite";
import {BaseGridRow} from "../BaseGridRow";
import {IGridModel} from "../../stores/GridModel/GridModel.types";

interface ITreeGridRootRowProps extends IClassProps {
    store: IGridModel;
}

const RECORD_ROOT = {
    type: "root",
};

export const TreeGridRootRow: React.FC<ITreeGridRootRowProps> = (props) => {
    const {store} = props;
    const record = React.useMemo(
        () => ({
            [store.recordsStore.recordId]: VALUE_SELF_ROOT,
            type: "root",
        }),
        [store.recordsStore.recordId],
    );

    return useObserver(() => (
        <BaseGridRow record={RECORD_ROOT} isExpanded {...props}>
            <RecordContext.Provider value={record}>
                {store.gridColumns.map((column) =>
                    column.datatype === "tree" ? (
                        mapComponentOne(column, (ChildCmp) => (
                            <ChildCmp key={column[VAR_RECORD_PAGE_OBJECT_ID]} {...props} bc={column} />
                        ))
                    ) : (
                        <td key={column[VAR_RECORD_PAGE_OBJECT_ID]} />
                    ),
                )}
            </RecordContext.Provider>
        </BaseGridRow>
    ));
};
