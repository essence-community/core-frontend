import * as React from "react";
import {Checkbox} from "@material-ui/core";
import {Icon} from "@essence-community/constructor-share/Icon";
import {IClassProps} from "@essence-community/constructor-share/types";
import {VAR_RECORD_PARENT_ID} from "@essence-community/constructor-share/constants";
import {useObserver} from "mobx-react";
import {checkPageSelectedRecords} from "../utils";

export const GridHeaderCheckboxContainer: React.FC<IClassProps> = (props) => {
    const store = props.pageStore.stores.get(props.bc[VAR_RECORD_PARENT_ID]);

    const handleChange = () => {
        const onToggleAllSelectedRecords = store?.handlers?.onToggleAllSelectedRecords;

        if (onToggleAllSelectedRecords) {
            onToggleAllSelectedRecords("1", props.bc, {});
        }
    };

    const handlePrevent = (event: React.SyntheticEvent) => {
        event.stopPropagation();
    };

    const getChekedIcon = () => {
        if (store) {
            const isPageSelectedRecords = checkPageSelectedRecords(store);

            if (store.bc.type === "TREEGRID" && isPageSelectedRecords) {
                return <Icon iconfont="check-square" size="xs" />;
            } else if (
                isPageSelectedRecords &&
                store.recordsStore?.selectedRecords.size === store.recordsStore?.records.length
            ) {
                return <Icon iconfont="check-square" size="xs" />;
            }
        }

        return <Icon iconfont="minus-square" size="xs" />;
    };

    return useObserver(() => (
        <Checkbox
            color="primary"
            checked={store?.recordsStore?.selectedRecords.size !== 0}
            disabled={props.readOnly || props.disabled}
            onClick={handlePrevent}
            onChange={handleChange}
            icon={<Icon iconfont="square-o" size="xs" />}
            checkedIcon={getChekedIcon()}
            disableRipple
        />
    ));
};
