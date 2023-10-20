import * as React from "react";
import cn from "clsx";
import {IClassProps, IRecord, ICkId} from "@essence-community/constructor-share/types";
import {VAR_RECORD_JV_ROWCOLOR, VAR_RECORD_PAGE_OBJECT_ID} from "@essence-community/constructor-share/constants";
import {PopoverContext, RecordContext} from "@essence-community/constructor-share/context";
import {reaction} from "mobx";
import {mapComponents} from "@essence-community/constructor-share/components";
import {useObserver} from "mobx-react";
import {Skeleton} from "@material-ui/lab";
import {deepFind, isEmpty, parseMemoize} from "@essence-community/constructor-share/utils";
import {useGetValue} from "@essence-community/constructor-share/hooks/useCommon/useGetValue";
import {IGridModel} from "../../stores/GridModel/GridModel.types";
import {useGridDnd} from "../../hooks/useGridDnd";
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
    const popoverCtx = React.useContext(PopoverContext);
    const classes = useStyles();
    const dndProps = useGridDnd({record, store});
    const getValue = useGetValue({pageStore: store.pageStore});

    const [isCheckBoxColumn, checkBc] = React.useMemo(() => {
        const checkBc = bc.columns?.find((col) => col.datatype?.toLocaleUpperCase() === "CHECKBOX");

        return [!isEmpty(checkBc), checkBc];
    }, [bc]);
    const isSelected = React.useCallback(() => {
        return bc.selmode === "MULTI" || bc.collectionvalues === "array"
            ? store.recordsStore.selectedRecords.has(record[store.recordsStore.recordId] as ICkId)
            : store.recordsStore.selectedRecordId === record[store.recordsStore.recordId];
    }, [bc, record, store]);

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
        const maxSize =
            checkBc?.maxselected && (parseMemoize(checkBc.maxselected).runer(store.pageStore.globalValues) as number);

        if (isSelected()) {
            store.recordsStore.setSelectionsAction([record], store.recordsStore.recordId, "delete");
        } else if (!maxSize || maxSize > store.recordsStore.selectedRecords.size) {
            store.recordsStore.setSelectionsAction([record], store.recordsStore.recordId, "append");
        }
        store.recordsStore.setSelectionAction(record[store.recordsStore.recordId]);
    }, [checkBc, isSelected, record, store]);

    const handleClick = React.useCallback(
        (event: React.MouseEvent<HTMLTableRowElement>) => {
            if (props.disabled) {
                return;
            }
            if (isCheckBoxColumn) {
                if (
                    !checkBc.disabled &&
                    (isEmpty(checkBc.disabledrules) ||
                        !parseMemoize(checkBc.disabledrules).runer({
                            get: (name: string) => {
                                const [isExists, value] = deepFind(record, name);

                                return isExists ? value : getValue(name);
                            },
                        }))
                ) {
                    handleCtrlSelect();
                }
                store.recordsStore.setSelectionAction(record[store.recordsStore.recordId]);
            } else if (bc.selmode === "MULTI" || bc.collectionvalues === "array") {
                if (event.shiftKey) {
                    handleShiftSelect();
                } else if (event.metaKey || event.ctrlKey) {
                    handleCtrlSelect();
                } else {
                    store.recordsStore.selectedRecords.clear();
                    store.recordsStore.selectedRecords.set(record[store.recordsStore.recordId] as ICkId, record);
                    store.recordsStore.setSelectionAction(record[store.recordsStore.recordId]);
                }
            } else {
                store.recordsStore.setSelectionAction(record[store.recordsStore.recordId]);
            }
        },
        [
            bc,
            checkBc,
            getValue,
            handleCtrlSelect,
            handleShiftSelect,
            isCheckBoxColumn,
            props.disabled,
            record,
            store.recordsStore,
        ],
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

    const handleDoubleClick = React.useCallback(() => {
        store.handleDoubleClick({popoverCtx});
    }, [popoverCtx, store]);

    return useObserver(() => (
        <tr
            style={typeof rowcolor === "string" && !selected ? {backgroundColor: rowcolor} : undefined}
            className={className}
            onClick={handleClick}
            data-page-object={`${bc[VAR_RECORD_PAGE_OBJECT_ID]}-row-${record[store.recordsStore.recordId]}`}
            onDoubleClick={handleDoubleClick}
            tabIndex={-1}
            {...dndProps}
        >
            {children ? (
                children
            ) : (
                <RecordContext.Provider value={record}>
                    {mapComponents(store.gridColumns, (ChildCmp, childBc, index) =>
                        store.recordsStore.isLoading ? (
                            <td
                                key={`${childBc[VAR_RECORD_PAGE_OBJECT_ID] || index}-col-${
                                    record[store.recordsStore.recordId] || index
                                }`}
                            >
                                <Skeleton variant="text" animation={false} />
                            </td>
                        ) : (
                            <ChildCmp
                                key={`${childBc[VAR_RECORD_PAGE_OBJECT_ID] || index}-col-${
                                    record[store.recordsStore.recordId] || index
                                }`}
                                {...classProps}
                                bc={childBc}
                            />
                        ),
                    )}
                </RecordContext.Provider>
            )}
        </tr>
    ));
};
