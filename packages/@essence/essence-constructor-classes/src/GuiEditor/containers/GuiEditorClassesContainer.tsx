import React, {useContext} from "react";
import {IClassProps} from "@essence-community/constructor-share/types";
import {useModel} from "@essence-community/constructor-share/hooks";
import {useObserver} from "mobx-react";
import {
    VAR_RECORD_CV_DESCRIPTION,
    VAR_RECORD_ID,
    VAR_RECORD_NAME,
    VAR_RECORD_PARENT_ID,
} from "@essence-community/constructor-share/constants";
import {GuiEditorClassesModel} from "../stores/GuiEditorClassesModel";
import {GuiEditorContext} from "../context";
import {useStyles} from "./GuiEditorClassesContainer.styles";

export const GuiEditorClassesContainer: React.FC<IClassProps> = (props) => {
    const {pageStore, bc} = props;
    const editorStore = useContext(GuiEditorContext);
    const [store] = useModel(
        (options) => new GuiEditorClassesModel({...options, applicationStore: pageStore.applicationStore}),
        props,
    );
    const classes = useStyles();
    const handleDragStart = (cls: Record<string, never>) => {
        const parentStore = pageStore.stores.get(bc[VAR_RECORD_PARENT_ID]);

        editorStore.onDragSelect(cls);

        if (parentStore) {
            // TODO: закрывать после начала движения
            // parentStore.invokeHandler("onCloseMenu", ["1", bc, {}]);
        }
    };

    return useObserver(() => (
        <div className={classes.root}>
            {store.recordsStore.records.map((cls) => (
                <div
                    key={cls[VAR_RECORD_ID] as string}
                    className={classes.element}
                    draggable
                    onDragStart={() => handleDragStart(cls as any)}
                >
                    <div className={classes.title}>{cls[VAR_RECORD_NAME]}</div>
                    <div className={classes.description}>{cls[VAR_RECORD_CV_DESCRIPTION]}</div>
                </div>
            ))}
        </div>
    ));
};
