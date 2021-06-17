import React, {DragEvent, ReactElement, useContext, useRef, useState} from "react";
import cn from "classnames";
import {IClassProps} from "@essence-community/constructor-share/types";
import {mapComponents} from "@essence-community/constructor-share/components";
import {VAR_RECORD_PAGE_OBJECT_ID} from "@essence-community/constructor-share/constants";
import {GuiEditorContentContext} from "../context";
import {useStyles} from "./GuiEditorElementContainer.styles";

export function GuiEditorElementContainer(props: IClassProps): ReactElement {
    const classes = useStyles();
    const editorContentStore = useContext(GuiEditorContentContext);
    const [hovered, setHovered] = useState(false);
    const timeoutRef = useRef<number>(undefined);
    const handleDragOver = (event: DragEvent) => {
        const insertedBc = editorContentStore.canInsert(props.bc.childs[0]);

        if (insertedBc) {
            event.preventDefault();
            event.stopPropagation();

            setHovered(true);
            window.clearTimeout(timeoutRef.current);
            timeoutRef.current = window.setTimeout(() => setHovered(false), 420);
        }
    };
    const handleDrop = (event: DragEvent) => {
        if (!hovered) {
            return undefined;
        }

        event.stopPropagation();

        editorContentStore.onInsert(props.bc.childs[0]);
    };

    return (
        <div onDragOver={handleDragOver} onDrop={handleDrop} className={cn({[classes.hovered]: hovered})}>
            {mapComponents(props.bc.childs, (ChildCmp, childBc) => (
                <ChildCmp key={childBc[VAR_RECORD_PAGE_OBJECT_ID]} {...props} bc={childBc} />
            ))}
        </div>
    );
}
