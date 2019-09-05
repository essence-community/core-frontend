// @flow

import * as React from "react";
import {observer} from "mobx-react";
import Checkbox from "@material-ui/core/Checkbox";
import {Icon} from "@essence/essence-constructor-share/Icon";
import {type GridColumnPropsType} from "./GridColumnHeaderTypes";

class GridColumnHeaderCheckbox extends React.Component<GridColumnPropsType> {
    handleChange = () => {
        const {store} = this.props;

        if (store.recordsStore.records.length !== 0) {
            this.props.store.setAllSelectedRecords(!store.isPageSelectedRecords);
        }
    };

    handlePrevent = (event: SyntheticEvent<HTMLInputElement>) => {
        event.stopPropagation();
    };

    getChekedIcon = () => {
        const {store} = this.props;

        if (store.bc.type === "TREEGRID" && store.isPageSelectedRecords) {
            return <Icon iconfont="check-square" size="xs" />;
        } else if (store.isPageSelectedRecords && store.selectedRecords.size === store.recordsStore.records.length) {
            return <Icon iconfont="check-square" size="xs" />;
        }

        return <Icon iconfont="minus-square" size="xs" />;
    };

    render() {
        const {disabled, store, readOnly} = this.props;

        return (
            <Checkbox
                color="primary"
                checked={store.selectedRecords.size !== 0}
                disabled={readOnly || disabled}
                onClick={this.handlePrevent}
                onChange={this.handleChange}
                icon={<Icon iconfont="square-o" size="xs" />}
                checkedIcon={this.getChekedIcon()}
                disableRipple
            />
        );
    }
}

export default observer(GridColumnHeaderCheckbox);
