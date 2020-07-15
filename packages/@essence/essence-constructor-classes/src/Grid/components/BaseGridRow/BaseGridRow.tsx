import * as React from "react";
import cn from "clsx";
import {IClassProps, IRecord, ICkId} from "@essence-community/constructor-share/types";
import {VAR_RECORD_JV_ROWCOLOR, VAR_RECORD_PAGE_OBJECT_ID} from "@essence-community/constructor-share/constants";
import {RecordContext} from "@essence-community/constructor-share/context";
import {reaction} from "mobx";
import {mapComponents} from "@essence-community/constructor-share/components";
import {useObserver} from "mobx-react";
import {IGridModel} from "../../stores/GridModel/GridModel.types";
import {useStyles} from "./BaseGridRow.styles";

interface IBaseGridRowProps extends IClassProps {
    store: IGridModel;
    record: IRecord;
    isExpanded: boolean;
    isDetail?: boolean;
}

export const BaseGridRow: React.FC<IBaseGridRowProps> = (props) => {
    const {bc, store, record, isExpanded, isDetail, children, ...classProps} = props;
    const rowcolor = record[VAR_RECORD_JV_ROWCOLOR];
    const [selected, setSelected] = React.useState(false);
    const classes = useStyles();

    const isSelected = React.useCallback(() => {
        return bc.selmode === "MULTI"
            ? store.recordsStore.selectedRecords.has(record[store.recordsStore.recordId] as ICkId)
            : store.recordsStore.selectedRecordId === record[store.recordsStore.recordId];
    }, [bc.selmode, record, store]);

    const handleShiftSelect = React.useCallback(() => {
        const lastSelectedRecord = store.recordsStore.selectedRecordIndex;
        const index = store.recordsStore.records.findIndex((rec) => rec === record);
        const sliceParams =
            lastSelectedRecord > index ? [index, lastSelectedRecord + 1] : [lastSelectedRecord, index + 1];
        const records = store.recordsStore.records.slice(...sliceParams);

        store.recordsStore.selectedRecords.clear();
        records.forEach((rec) => {
            store.recordsStore.selectedRecords.set(rec[store.recordsStore.recordId] as ICkId, rec);
        });
    }, [record, store]);

    const handleCtrlSelect = React.useCallback(() => {
        if (isSelected()) {
            store.recordsStore.selectedRecords.delete(record[store.recordsStore.recordId] as ICkId);
        } else {
            store.recordsStore.selectedRecords.set(record[store.recordsStore.recordId] as ICkId, record);
        }
        store.recordsStore.setSelectionAction(record[store.recordsStore.recordId]);
    }, [isSelected, record, store]);

    const handleClick = React.useCallback(
        (event: React.MouseEvent<HTMLTableRowElement>) => {
            if (bc.selmode === "MULTI" && !props.disabled) {
                if (event.shiftKey) {
                    handleShiftSelect();
                } else if (event.metaKey || event.ctrlKey) {
                    handleCtrlSelect();
                } else {
                    store.recordsStore.selectedRecords.clear();
                    store.recordsStore.selectedRecords.set(record[store.recordsStore.recordId] as ICkId, record);
                    store.recordsStore.setSelectionAction(record[store.recordsStore.recordId]);
                }
            } else if (!props.disabled) {
                store.recordsStore.setSelectionAction(record[store.recordsStore.recordId]);
            }
        },
        [bc.selmode, handleCtrlSelect, handleShiftSelect, props.disabled, record, store],
    );

    React.useEffect(() => {
        return reaction(isSelected, setSelected, {fireImmediately: true});
    }, [isSelected]);

    const className = cn(
        classes.root,
        selected
            ? {
                  [classes.selected]: !isExpanded,
                  [classes.selectedDetailExpanded]: isExpanded,
                  [classes.selectedDetail]: isDetail,
                  "selected-row": true,
              }
            : classes.autoStripe,
    );

    return useObserver(() => (
        <tr
            style={typeof rowcolor === "string" && !selected ? {backgroundColor: rowcolor} : undefined}
            className={className}
            onClick={handleClick}
            data-page-object={`${bc[VAR_RECORD_PAGE_OBJECT_ID]}-row-${record[store.recordsStore.recordId]}`}
            onDoubleClick={store.handleDoubleClick}
            tabIndex={-1}
        >
            {children ? (
                children
            ) : (
                <RecordContext.Provider value={record}>
                    {mapComponents(store.gridColumns, (ChildCmp, childBc) => (
                        <ChildCmp key={childBc[VAR_RECORD_PAGE_OBJECT_ID]} {...classProps} bc={childBc} />
                    ))}
                </RecordContext.Provider>
            )}
        </tr>
    ));
};
