import * as React from "react";
import {IClassProps} from "@essence-community/constructor-share/types";
import {Icon} from "@essence-community/constructor-share/Icon";
import {IconButton} from "@material-ui/core";
import {VAR_RECORD_PARENT_ID, VAR_RECORD_PAGE_OBJECT_ID} from "@essence-community/constructor-share/constants";
import {RecordContext} from "@essence-community/constructor-share/context";

export const ColumnDetailContainer: React.FC<IClassProps> = (props) => {
    const record = React.useContext(RecordContext);
    const {pageStore, bc, disabled} = props;
    const store = pageStore.stores.get(bc[VAR_RECORD_PARENT_ID]);

    const handleClick = (event: React.SyntheticEvent) => {
        event.stopPropagation();

        if (record && store) {
            store.handlers.onToggleExpansion("1", bc, {record});
        }
    };

    const isExpanded =
        store?.recordsStore && record !== undefined
            ? store.recordsStore.expansionRecords.get(record[store.recordsStore.recordId] as string)
            : false;

    return (
        <IconButton
            color="primary"
            onClick={handleClick}
            tabIndex={-1}
            disabled={disabled}
            data-page-object={`${bc[VAR_RECORD_PAGE_OBJECT_ID]}-schevron`}
            size="small"
        >
            <Icon iconfont={isExpanded ? "caret-down" : "caret-right"} size="xs" />
        </IconButton>
    );
};
