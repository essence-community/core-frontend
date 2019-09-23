// @flow
import * as React from "react";
import {observer} from "mobx-react";
import {Checkbox} from "@material-ui/core";
import {Icon} from "@essence/essence-constructor-share/Icon";
import {type GridModelType} from "../../stores/GridModel";
import {type GridColumnPropsType} from "./GridColumnTypes";

const isCheckedChilds = (store: GridModelType, parentId: string | number, parentRecord: Object): boolean => {
    const records = store.recordsTree[parentId];

    if (!records) {
        return Boolean(store.selectedRecords.get(parentRecord.ckId));
    }

    return records.every((record) => {
        if (record.leaf === "true") {
            return Boolean(store.selectedRecords.get(record.ckId));
        }

        return isCheckedChilds(store, record.ckId, record);
    });
};

const isMinusChecked = (store: GridModelType, parentId: string | number, parentRecord: Object): boolean => {
    const records = store.recordsTree[parentId];

    if (!records) {
        return Boolean(store.selectedRecords.get(parentRecord.ckId));
    }

    return records.some((record) => {
        if (record.leaf === "true") {
            return Boolean(store.selectedRecords.get(record.ckId));
        }

        return isMinusChecked(store, record.ckId, record);
    });
};

class GridColumnCheckbox extends React.Component<GridColumnPropsType> {
    handleChange = () => {
        const {store, record = {}} = this.props;

        store.toggleSelectedRecordAction(record.ckId, record, this.isChecked());
    };

    handlePrevent = (event: SyntheticEvent<HTMLInputElement>) => {
        event.stopPropagation();
    };

    isChecked = (): boolean => {
        const {record = {}, store} = this.props;
        const {ckId, leaf} = record;

        if (store.bc.type === "TREEGRID" && leaf === "false") {
            return isCheckedChilds(store, ckId, record);
        }

        return Boolean(store.selectedRecords.get(ckId));
    };

    getIconFont = () => {
        const {store, record = {}} = this.props;

        if (store.bc.type !== "TREEGRID" || record.leaf !== "false") {
            return "square-o";
        }

        return isMinusChecked(store, record.ckId, record) ? "minus-square" : "square-o";
    };

    render() {
        const {readOnly, disabled} = this.props;

        return (
            <Checkbox
                color="default"
                checked={this.isChecked()}
                disabled={readOnly || disabled}
                onClick={this.handlePrevent}
                onChange={this.handleChange}
                icon={<Icon iconfont={this.getIconFont()} size="xs" />}
                checkedIcon={<Icon iconfont="check-square" size="xs" />}
                disableRipple
            />
        );
    }
}

export default observer(GridColumnCheckbox);
