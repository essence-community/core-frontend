import * as React from "react";
import {observe, reaction} from "mobx";
import {VALUE_SELF_ROOT} from "@essence-community/constructor-share/constants";
import {useObserver} from "mobx-react";
import {IClassProps, IRecord, ICkId} from "@essence-community/constructor-share";
import {IGridModel} from "../../stores/GridModel/GridModel.types";
import {getRecords, getTreeRecords} from "../../utils";
import {GridRow} from "../GridRow";

interface IVirtualizedGridProps extends IClassProps {
    store: IGridModel;
}

export const VirtualizedGrid: React.FC<IVirtualizedGridProps> = (props) => {
    const {store} = props;
    const [records, setRecords] = React.useState<IRecord[]>([]);

    React.useEffect(() => {
        if (store.bc.type === "TREEGRID") {
            setRecords(getTreeRecords(store));
            const disposers = [
                reaction(
                    () => store.recordsStore.recordsTree,
                    () => {
                        setRecords(getTreeRecords(store));
                    },
                ),
                observe(store.recordsStore.expansionRecords, () => {
                    setRecords(getTreeRecords(store));
                }),
            ];

            return () => {
                disposers.forEach((disposer) => disposer());
            };
        }

        return undefined;
    }, [store]);

    return useObserver(() => {
        if (store.bc.type === "TREEGRID" && !store.recordsStore.expansionRecords.get(VALUE_SELF_ROOT)) {
            return null;
        }

        const {records: renderRecords, heightTop, heightBottom} = getRecords(
            store,
            store.bc.type === "GRID" ? store.recordsStore.records : records,
        );

        return (
            <React.Fragment>
                {heightTop ? <tr style={{height: heightTop}} /> : null}
                {renderRecords.map((record) => (
                    <GridRow
                        key={record[store.recordsStore.recordId] as ICkId}
                        {...props}
                        record={record}
                        disabled={store.isInlineEditing || props.disabled}
                    />
                ))}
                {heightBottom ? <tr style={{height: heightBottom}} /> : null}
            </React.Fragment>
        );
    });
};
