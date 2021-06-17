import React, {useContext} from "react";
import {IClassProps} from "@essence-community/constructor-share/types";
import {mapComponents} from "@essence-community/constructor-share/components";
import {VAR_RECORD_PAGE_OBJECT_ID} from "@essence-community/constructor-share/constants";
import {useModel} from "@essence-community/constructor-share/hooks";
import {useObserver} from "mobx-react";
import {Grid} from "@material-ui/core";
import {GuiEditorContentModel} from "../stores/GuiEditorContentModel";
import {GuiEditorContentContext, GuiEditorContext} from "../context";

export const GuiEditorContentContainer: React.FC<IClassProps> = (props) => {
    const editorStore = useContext(GuiEditorContext);
    const {applicationStore} = props.pageStore;
    const [store] = useModel(
        (options) => new GuiEditorContentModel({...options, applicationStore, editorStore}),
        props,
    );

    return useObserver(() => (
        <GuiEditorContentContext.Provider value={store}>
            <Grid container direction="column" spacing={2}>
                {mapComponents(store.childs, (ChildCmp, childBc) => (
                    <Grid item key={childBc[VAR_RECORD_PAGE_OBJECT_ID]}>
                        <ChildCmp {...props} bc={childBc} />
                    </Grid>
                ))}
            </Grid>
        </GuiEditorContentContext.Provider>
    ));
};
