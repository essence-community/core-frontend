import * as React from "react";
import {IClassProps, IRecord, ICkId} from "@essence-community/constructor-share";
import {reaction} from "mobx";
import {IGridModel} from "../../stores/GridModel/GridModel.types";
import {BaseGridRow} from "../BaseGridRow";
import {GridDetail} from "../GridDetail";

interface IGridRowProps extends IClassProps {
    store: IGridModel;
    record: IRecord;
}

export const GridRow: React.FC<IGridRowProps> = React.memo(function GridRowMmeo(props) {
    const {store, record, ...classProps} = props;
    const [isExpanded, setIsExpanded] = React.useState(false);

    React.useEffect(() => {
        if (classProps.bc.detail) {
            const handleCheckExpanded = (): boolean => {
                return Boolean(store.recordsStore.expansionRecords.get(record[store.recordsStore.recordId] as ICkId));
            };

            if (handleCheckExpanded()) {
                setIsExpanded(true);
            }

            return reaction(handleCheckExpanded, setIsExpanded);
        }

        return undefined;
    }, [classProps.bc.detail, record, store]);

    return (
        <React.Fragment>
            <BaseGridRow store={store} record={record} {...classProps} isExpanded={isExpanded} />
            {isExpanded && classProps.bc.detail ? (
                <BaseGridRow store={store} record={record} {...classProps} isDetail isExpanded>
                    <GridDetail store={store} record={record} {...classProps} />
                </BaseGridRow>
            ) : null}
        </React.Fragment>
    );
});
