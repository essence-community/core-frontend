import * as React from "react";
import {IRecord, IPageModel, IBuilderConfig} from "@essence-community/constructor-share/types";
import {Icon} from "@essence-community/constructor-share/Icon";
import {IconButton} from "@material-ui/core";
import {VAR_RECORD_PARENT_ID, VAR_RECORD_PAGE_OBJECT_ID} from "@essence-community/constructor-share/constants";
import {useObserver} from "mobx-react";
import {useStyles} from "./ColumnTreeSchevron.styles";

interface IColumnTreeSchevronProps {
    record: IRecord;
    pageStore: IPageModel;
    bc: IBuilderConfig;
    disabled?: boolean;
}

export const ColumnTreeSchevron: React.FC<IColumnTreeSchevronProps> = (props) => {
    const {record, pageStore, bc, disabled} = props;
    const store = pageStore.stores.get(bc[VAR_RECORD_PARENT_ID]);
    const classes = useStyles();

    const handleClick = (event: React.SyntheticEvent) => {
        event.stopPropagation();

        if (record && store) {
            store.invokeHandler("onToggleExpansion", ["1", bc, {record}]);
        }
    };

    return useObserver(() => {
        const isExpanded = store?.recordsStore
            ? store.recordsStore.expansionRecords.get(record[store.recordsStore.recordId] as string)
            : false;

        return (
            <IconButton
                color="primary"
                className={classes.root}
                onClick={handleClick}
                tabIndex={-1}
                disabled={disabled}
                data-page-object={`${bc[VAR_RECORD_PAGE_OBJECT_ID]}-schevron`}
                size="small"
            >
                <Icon iconfont={isExpanded ? "caret-down" : "caret-right"} />
            </IconButton>
        );
    });
};
