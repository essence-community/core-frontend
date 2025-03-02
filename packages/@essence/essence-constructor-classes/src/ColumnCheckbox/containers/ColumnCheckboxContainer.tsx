import * as React from "react";
import {IClassProps, IRecord, ICkId} from "@essence-community/constructor-share/types";
import {RecordContext} from "@essence-community/constructor-share/context";
import {VAR_RECORD_PARENT_ID, VAR_RECORD_LEAF} from "@essence-community/constructor-share/constants";
import {Checkbox} from "@material-ui/core";
import {Icon} from "@essence-community/constructor-share/Icon";
import {useObserver} from "mobx-react";
import {parseMemoize, isEmpty} from "@essence-community/constructor-share/utils";
import {isCheckedChilds} from "../utils/isCheckedChilds";
import {isMinusChecked} from "../utils/isMinusChecked";

const EMPTY_RECORD: IRecord = {};

export const ColumnCheckboxContainer: React.FC<IClassProps> = (props) => {
    const {pageStore, bc, readOnly, disabled} = props;
    const record = React.useContext(RecordContext) || EMPTY_RECORD;
    const isChecked = (): boolean => {
        const store = pageStore.stores.get(bc[VAR_RECORD_PARENT_ID]);

        if (store && store.recordsStore) {
            const leaf = record[VAR_RECORD_LEAF];
            const ckId = record[store.recordsStore.recordId] as ICkId;

            if (store.bc.type === "TREEGRID" && (typeof leaf === "boolean" ? leaf : leaf === "true")) {
                return isCheckedChilds(store.recordsStore, ckId, record, store.recordsStore.recordId);
            }

            return Boolean(store.recordsStore.selectedRecords.get(ckId));
        }

        return false;
    };
    const getIconFont = () => {
        const store = pageStore.stores.get(bc[VAR_RECORD_PARENT_ID]);
        const leaf = record[VAR_RECORD_LEAF];
        const isSelectTree = bc.selecttree == null || bc.selecttree;

        if (store?.bc.type !== "TREEGRID" || (typeof leaf === "boolean" ? leaf : leaf !== "false")) {
            return "check-square";
        }

        if (store && store.recordsStore && isSelectTree) {
            return isMinusChecked(
                store.recordsStore,
                record[store.recordsStore.recordId] as ICkId,
                record,
                store.recordsStore.recordId,
            )
                ? "minus-square"
                : "check-square";
        }

        return "check-square";
    };
    const handleChange = (event: React.SyntheticEvent) => {
        event.preventDefault();
        event.stopPropagation();
    };
    const handlePrevent = (event: React.SyntheticEvent) => {
        event.preventDefault();
        event.stopPropagation();
        const store = pageStore.stores.get(bc[VAR_RECORD_PARENT_ID]);

        if (store) {
            store.invokeHandler("onToggleSelectedRecord", ["1", bc, {record: {...record, checked: isChecked()}}]);
        }
    };

    return useObserver(() => {
        const store = pageStore.stores.get(bc[VAR_RECORD_PARENT_ID]);
        const checked = isChecked();
        const isDisabledCheck =
            !checked && bc.maxselected && store && store.recordsStore
                ? (store.recordsStore.selectedRecords.size as any) >=
                  parseMemoize(bc.maxselected).runer(pageStore.globalValues)
                : false;

        return (
            <Checkbox
                color="primary"
                checked={checked}
                disabled={readOnly || disabled || isDisabledCheck}
                onClick={handlePrevent}
                onChange={handleChange}
                icon={<Icon iconfont="square-o" size="xs" />}
                checkedIcon={<Icon iconfont={getIconFont()} size="xs" />}
                disableRipple
            />
        );
    });
};
