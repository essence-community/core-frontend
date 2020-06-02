import * as React from "react";
import {IClassProps, IBuilderConfig} from "@essence-community/constructor-share/types";
import {VAR_RECORD_PARENT_ID} from "@essence-community/constructor-share/constants";
import {RecordContext} from "@essence-community/constructor-share/context";
import {useObserver} from "mobx-react-lite";
import {mapComponentOne} from "@essence-community/constructor-share/components";

export const ColumnDetailContainer: React.FC<IClassProps> = React.memo(function ColumnDetailContainerMemo(props) {
    const record = React.useContext(RecordContext);
    const {pageStore, bc} = props;

    return useObserver(() => {
        const store = pageStore.stores.get(bc[VAR_RECORD_PARENT_ID]);
        const isExpanded =
            store?.recordsStore && record !== undefined
                ? store.recordsStore.expansionRecords.get(record[store.recordsStore.recordId] as string)
                : false;

        const iconBc: IBuilderConfig = {
            ...bc,
            handler: "onToggleExpansion",
            iconfont: isExpanded ? "caret-down" : "caret-right",
            iconsize: "xs",
            onlyicon: true,
            type: "BTN",
            uitype: "7",
        };

        return (
            <>
                {mapComponentOne(iconBc, (ChildCmp, childBc) => (
                    <ChildCmp {...props} bc={childBc} />
                ))}
            </>
        );
    });
});
