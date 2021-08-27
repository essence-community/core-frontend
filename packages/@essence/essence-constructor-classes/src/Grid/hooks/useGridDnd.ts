import React from "react";
import {IRecord, ICkId} from "@essence-community/constructor-share/types";
import {VAR_RECORD_PAGE_OBJECT_ID} from "@essence-community/constructor-share/constants/variables";
import {mapValueToArray} from "@essence-community/constructor-share/utils/transform";
import {IGridModel} from "../stores/GridModel/GridModel.types";

interface IUseGridDndProps {
    record: IRecord;
    store: IGridModel;
}

export function useGridDnd({
    record,
    store,
}: IUseGridDndProps): React.DetailedHTMLProps<React.HTMLAttributes<HTMLTableRowElement>, HTMLTableRowElement> {
    const timeoutId = React.useRef(null);

    const handleDragStart = React.useCallback(
        (event: React.DragEvent) => {
            const selectedRecords = mapValueToArray(store.recordsStore.selectedRecords);
            const {selmode, collectionvalues} = store.bc;

            event.dataTransfer.setData(
                "recordId",
                selmode === "MULTI" || collectionvalues === "array"
                    ? JSON.stringify(selectedRecords.map((rec) => String(rec[store.recordsStore.recordId])))
                    : JSON.stringify(String(record[store.recordsStore.recordId])),
            );
            event.dataTransfer.setData("pageObjectId", store.bc[VAR_RECORD_PAGE_OBJECT_ID]);
            event.dataTransfer.dropEffect = "move";
            event.dataTransfer.effectAllowed = "move";
        },
        [store, record],
    );
    const handleDrop = React.useCallback(
        (event) => {
            if (
                event.dataTransfer.getData("recordId") !== JSON.stringify(String(record[store.recordsStore.recordId]))
            ) {
                store.dragDropAction(
                    event.dataTransfer.getData("pageObjectId"),
                    JSON.parse(event.dataTransfer.getData("recordId")),
                    record,
                );
            }
        },
        [record, store],
    );

    const handleDragOver = React.useCallback(
        (event: React.DragEvent<HTMLTableRowElement>) => {
            event.preventDefault();
        },
        [record, store],
    );

    const handleDragEnter = React.useCallback(() => {
        timeoutId.current = setTimeout(() => {
            store.openCloseExpansionAction(record[store.recordsStore.recordId] as ICkId, true);
        }, 2000);
    }, [record, store]);

    const handleDragLeave = React.useCallback(() => {
        if (timeoutId.current) {
            clearTimeout(timeoutId.current);
        }

        timeoutId.current = null;
    }, []);

    return store.bc.draggable
        ? {
              draggable: store.bc.draggable,
              onDragEnter: handleDragEnter,
              onDragLeave: handleDragLeave,
              onDragOver: handleDragOver,
              onDragStart: handleDragStart,
              onDrop: handleDrop,
          }
        : {};
}
