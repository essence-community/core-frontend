// @flow
import * as React from "react";
import cn from "classnames";
import compose from "recompose/compose";
import {reaction} from "mobx";
import {disposeOnUnmount, observer} from "mobx-react";
import {withStyles} from "@material-ui/core/styles";
import {VAR_RECORD_PAGE_OBJECT_ID, VAR_RECORD_JV_ROWCOLOR} from "@essence-community/constructor-share/constants";
import {mapComponents} from "@essence-community/constructor-share/components";
import {RecordContext} from "@essence-community/constructor-share";
import {type GridModelType} from "../../stores/GridModel";
import {type PageModelType} from "../../stores/PageModel";
import {type BuilderGridType} from "../BuilderGridType";
import styles from "./BaseGridRowStyles";

export type BaseGridRowPropsType = {
    store: GridModelType,
    record: Object,
    indexStripe?: boolean,
    bc: BuilderGridType,
    disabled?: boolean,
    readOnly?: boolean,
    visible: boolean,
    pageStore: PageModelType,
    nesting?: number,
    isDetail?: boolean,
    isExpanded?: boolean,
    disableSelect?: boolean,
    isSelected?: () => boolean,
    onDoubleClick?: () => void,
};
type PropsType = BaseGridRowPropsType & {
    index: number,
    children?: React.Node,
    classes: {
        [$Keys<$Call<typeof styles>>]: string,
    },
    autoStripe: boolean,
};
type StateType = {|
    selected: boolean,
|};

class BaseGridRow extends React.Component<PropsType, StateType> {
    static defaultProps = {
        index: 0,
    };

    state = {
        selected: false,
    };

    componentDidMount() {
        const {isSelected = this.isSelected, disableSelect} = this.props;

        if (!disableSelect) {
            disposeOnUnmount(this, [reaction(isSelected, this.handleSelect, {fireImmediately: true})]);
        }
    }

    handleClick = (event: SyntheticMouseEvent<HTMLTableRowElement>) => {
        const {store, record, bc, disabled} = this.props;

        if (bc.selmode === "MULTI" && !disabled) {
            if (event.shiftKey) {
                this.handleShiftSelect();
            } else if (event.metaKey || event.ctrlKey) {
                this.handleCtrlSelect();
            } else {
                store.selectedRecords.clear();
                store.selectedRecords.set(record[store.recordsStore.recordId], record);
                store.recordsStore.setSelectionAction(record[store.recordsStore.recordId]);
            }
        } else if (!disabled) {
            store.recordsStore.setSelectionAction(record[store.recordsStore.recordId]);
        }
    };

    handleShiftSelect = () => {
        const {store, index} = this.props;
        const lastSelectedRecord = store.recordsStore.selectedRecordIndex;
        const sliceParams =
            lastSelectedRecord > index ? [index, lastSelectedRecord + 1] : [lastSelectedRecord, index + 1];
        const records = store.recordsStore.records.slice(...sliceParams);

        store.selectedRecords.clear();
        records.forEach((rec) => {
            store.selectedRecords.set(rec[store.recordsStore.recordId], rec);
        });
    };

    handleCtrlSelect = () => {
        const {store, record} = this.props;

        if (this.isSelected()) {
            store.selectedRecords.delete(record[store.recordsStore.recordId]);
        } else {
            store.selectedRecords.set(record[store.recordsStore.recordId], record);
        }
        store.recordsStore.setSelectionAction(record[store.recordsStore.recordId]);
    };

    handleSelect = (selected: boolean) => {
        this.setState((prevState) => {
            if (prevState.selected === selected) {
                return null;
            }

            return {selected};
        });
    };

    isSelected = () => {
        const {bc, store, record} = this.props;

        return bc.selmode === "MULTI"
            ? store.selectedRecords.has(record[store.recordsStore.recordId])
            : store.recordsStore.selectedRecordId === record[store.recordsStore.recordId];
    };

    renderChildren = () => {
        const {store} = this.props;

        return mapComponents(store.gridColumns, (ChildCmp, childBc) => (
            <ChildCmp key={childBc[VAR_RECORD_PAGE_OBJECT_ID]} {...this.props} bc={childBc} />
        ));
    };

    render() {
        const {selected} = this.state;
        const {
            classes,
            record,
            index,
            bc,
            store,
            onDoubleClick,
            children,
            autoStripe,
            indexStripe,
            isDetail,
            isExpanded,
        } = this.props;
        const className = cn(
            classes.root,
            selected
                ? {
                      [classes.selected]: !isExpanded,
                      [classes.selectedDetailExpanded]: isExpanded,
                      [classes.selectedDetail]: isDetail,
                      "selected-row": true,
                  }
                : {
                      [classes.autoStripe]: autoStripe,
                      [classes.indexStripe]: indexStripe && !(index % 2),
                  },
        );

        return (
            <tr
                style={
                    record[VAR_RECORD_JV_ROWCOLOR] && !selected
                        ? {backgroundColor: record[VAR_RECORD_JV_ROWCOLOR]}
                        : undefined
                }
                className={className}
                onClick={this.handleClick}
                data-page-object={`${bc[VAR_RECORD_PAGE_OBJECT_ID]}-row-${record[store.recordsStore.recordId]}`}
                onDoubleClick={onDoubleClick}
                tabIndex="-1"
            >
                <RecordContext.Provider value={record}>
                    {children ? children : this.renderChildren()}
                </RecordContext.Provider>
            </tr>
        );
    }
}

export default compose(withStyles(styles, {name: "EssenceBaseGridRow"}), observer)(BaseGridRow);
