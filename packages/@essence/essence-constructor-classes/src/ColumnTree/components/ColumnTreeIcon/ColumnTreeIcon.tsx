import * as React from "react";
import {VAR_RECORD_LEAF, VAR_RECORD_PARENT_ID} from "@essence-community/constructor-share/constants";
import {IRecord, IPageModel, IBuilderConfig, ICkId} from "@essence-community/constructor-share/types";
import {Icon} from "@essence-community/constructor-share/Icon";

interface IColumnTreeIconProps {
    record: IRecord;
    pageStore: IPageModel;
    bc: IBuilderConfig;
}

export const ColumnTreeIcon: React.FC<IColumnTreeIconProps> = (props) => {
    const {record, pageStore, bc} = props;
    const store = pageStore.stores.get(bc[VAR_RECORD_PARENT_ID]);

    if (record[VAR_RECORD_LEAF] === "true") {
        return <Icon iconfont="file-o" />;
    }

    if (store?.recordsStore) {
        return (
            <Icon
                iconfont={
                    store.recordsStore.expansionRecords.get(record[store.recordsStore.recordId] as ICkId)
                        ? "folder-open-o"
                        : "folder-o"
                }
            />
        );
    }

    return null;
};
