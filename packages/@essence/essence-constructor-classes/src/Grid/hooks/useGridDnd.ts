import React from "react";
import {IRecord, ICkId} from "@essence-community/constructor-share/types";
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

    const handleDragStart = (event: React.DragEvent) => {
        event.dataTransfer.setData("recordId", String(record[store.recordsStore.recordId]));
        event.dataTransfer.dropEffect = "move";
        event.dataTransfer.effectAllowed = "move";
    };
    const handleDrop = (event) => {
        console.log(event.dataTransfer.getData("recordId"));
        console.log(record);
    };

    const handleDragOver = (event: React.DragEvent<HTMLTableRowElement>) => {
        event.preventDefault();
    };

    const handleDragEnter = () => {
        timeoutId.current = setTimeout(() => {
            store.openCloseExpansionAction(record[store.recordsStore.recordId] as ICkId, true);
        }, 2000);
    };

    const handleDragLeave = () => {
        if (timeoutId.current) {
            clearTimeout(timeoutId.current);
        }

        timeoutId.current = null;
    };

    return {
        draggable: true,
        onDragEnter: handleDragEnter,
        onDragLeave: handleDragLeave,
        onDragOver: handleDragOver,
        onDragStart: handleDragStart,
        onDrop: handleDrop,
    };
}
