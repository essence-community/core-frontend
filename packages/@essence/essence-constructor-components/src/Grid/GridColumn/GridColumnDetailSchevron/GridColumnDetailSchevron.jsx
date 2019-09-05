// @flow
import * as React from "react";
import {compose} from "recompose";
import {observer} from "mobx-react";
import IconButton from "@material-ui/core/IconButton";
import {withStyles} from "@material-ui/core/styles";
import {Icon} from "@essence/essence-constructor-share/Icon";
import commonDecorator from "../../../decorators/commonDecorator";
import {type GridColumnPropsType} from "../GridColumnTypes";
import styles from "./GridColumnDetailSchevronStyles";

type PropsType = GridColumnPropsType & {
    classes: {
        [$Keys<$Call<typeof styles>>]: string,
    },
};

class GridColumnDetailSchevron extends React.Component<PropsType> {
    handleClick = (event: SyntheticEvent<>) => {
        const {record, store} = this.props;

        event.stopPropagation();

        if (record) {
            if (record.type === "root") {
                store.openRoot();
            } else {
                store.openCloseExpansionAction(record.ckId);
            }
        }
    };

    render() {
        const {store, record, gridBc, disabled, hidden, classes} = this.props;

        if (hidden || !record) {
            return null;
        }

        const isExpanded = record.type === "root" ? store.rootNode : store.expansionRecords.get(record.ckId);

        return (
            <IconButton
                color="primary"
                onClick={this.handleClick}
                tabIndex="-1"
                className={classes.root}
                disableRipple
                disabled={disabled}
                data-page-object={`${gridBc.ckPageObject}-row-schevron`}
                data-tabindex-grid="0"
            >
                <Icon iconfont={isExpanded ? "caret-down" : "caret-right"} size="xs" />
            </IconButton>
        );
    }
}

export default compose(
    commonDecorator,
    withStyles(styles),
    observer,
)(GridColumnDetailSchevron);
