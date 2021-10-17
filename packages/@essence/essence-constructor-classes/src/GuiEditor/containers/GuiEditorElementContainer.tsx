import React, {DragEvent, ReactElement, SyntheticEvent, useContext, useEffect, useRef, useState} from "react";
import cn from "classnames";
import {IClassProps} from "@essence-community/constructor-share/types";
import {mapComponents} from "@essence-community/constructor-share/components";
import {VAR_RECORD_PAGE_OBJECT_ID} from "@essence-community/constructor-share/constants";
import {observe} from "mobx";
import {useObserver} from "mobx-react";
import {GuiEditorContentContext, GuiEditorContext} from "../context";
import {useStyles} from "./GuiEditorElementContainer.styles";

export function GuiEditorElementContainer(props: IClassProps): ReactElement {
    const classes = useStyles();
    const editorContentStore = useContext(GuiEditorContentContext);
    const editorStore = useContext(GuiEditorContext);
    const [, forceRender] = useState({});
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
    const handleClick = (event: SyntheticEvent) => {
        event.stopPropagation();
        event.preventDefault();

        const propertiesBc = props.bc.childs[0];
        const properties = editorContentStore.getProperties(propertiesBc);

        editorStore.onOpenProperties(propertiesBc, properties);
    };

    useEffect(() => observe(props.bc.childs[0], forceRender), [props.bc.childs]);

    return useObserver(() => (
        <div
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onClick={handleClick}
            className={cn(classes.root, {[classes.hovered]: hovered})}
        >
            {mapComponents(props.bc.childs, (ChildCmp, childBc) => (
                <ChildCmp
                    key={`${childBc[VAR_RECORD_PAGE_OBJECT_ID]}-${childBc.disabled}-${childBc.hidden}`}
                    {...props}
                    bc={childBc}
                />
            ))}
        </div>
    ));
}
