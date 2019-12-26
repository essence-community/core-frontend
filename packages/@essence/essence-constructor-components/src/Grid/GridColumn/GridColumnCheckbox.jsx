// @flow
import * as React from "react";
import {observer} from "mobx-react";
import {Checkbox} from "@material-ui/core";
import {Icon} from "@essence/essence-constructor-share/Icon";
import {VAR_RECORD_ID, VAR_RECORD_LEAF} from "@essence/essence-constructor-share/constants";
import {type GridModelType} from "../../stores/GridModel";
import {type GridColumnPropsType} from "./GridColumnTypes";

const isCheckedChilds = (store: GridModelType, parentId: string | number, parentRecord: Object): boolean => {
    const records = store.recordsTree[parentId];

    if (!records) {
        return Boolean(store.selectedRecords.get(parentRecord[VAR_RECORD_ID]));
    }

    return records.every((record) => {
        if (record[VAR_RECORD_LEAF] === "true") {
            return Boolean(store.selectedRecords.get(record[VAR_RECORD_ID]));
        }

        return isCheckedChilds(store, record[VAR_RECORD_ID], record);
    });
};

const isMinusChecked = (store: GridModelType, parentId: string | number, parentRecord: Object): boolean => {
    const records = store.recordsTree[parentId];

    if (!records) {
        return Boolean(store.selectedRecords.get(parentRecord[VAR_RECORD_ID]));
    }

    return records.some((record) => {
        if (record[VAR_RECORD_LEAF] === "true") {
            return Boolean(store.selectedRecords.get(record[VAR_RECORD_ID]));
        }

        return isMinusChecked(store, record[VAR_RECORD_ID], record);
    });
};

class GridColumnCheckbox extends React.Component<GridColumnPropsType> {
    handleChange = () => {
        const {store, record = {}} = this.props;

        store.toggleSelectedRecordAction(record[VAR_RECORD_ID], record, this.isChecked());
    };

    handlePrevent = (event: SyntheticEvent<HTMLInputElement>) => {
        event.stopPropagation();
    };

    isChecked = (): boolean => {
        const {record = {}, store} = this.props;
        const leaf = record[VAR_RECORD_LEAF];
        const ckId = record[VAR_RECORD_ID];

        if (store.bc.type === "TREEGRID" && leaf === "false") {
            return isCheckedChilds(store, ckId, record);
        }

        return Boolean(store.selectedRecords.get(ckId));
    };

    getIconFont = () => {
        const {store, record = {}} = this.props;

        if (store.bc.type !== "TREEGRID" || record[VAR_RECORD_LEAF] !== "false") {
            return "square-o";
        }

        return isMinusChecked(store, record[VAR_RECORD_ID], record) ? "minus-square" : "square-o";
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
