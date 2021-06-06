import React from "react";
import {IClassProps} from "@essence-community/constructor-share/types";
import {mapComponents} from "@essence-community/constructor-share/components";
import {VAR_RECORD_PAGE_OBJECT_ID} from "@essence-community/constructor-share/constants";
import {useModel} from "@essence-community/constructor-share/hooks";
import {ApplicationContext} from "@essence-community/constructor-share/context";
import {GuiEditorContext} from "../context";
import {GuiEditorModel} from "../stores/GuiEditorModel";
import {useStyles} from "./GuiEditorContainer.styles";

export const GuiEditorContainer: React.FC<IClassProps> = (props) => {
    const {bc} = props;
    const applicationStore = React.useContext(ApplicationContext);
    const [editorStore] = useModel((options) => new GuiEditorModel({...options, applicationStore}), props);
    const classes = useStyles();

    return (
        <GuiEditorContext.Provider value={editorStore}>
            <div className={classes.root}>
                {mapComponents(bc.childs, (ChildComponent, childBc) => (
                    <ChildComponent key={childBc[VAR_RECORD_PAGE_OBJECT_ID]} {...props} bc={childBc} />
                ))}
            </div>
        </GuiEditorContext.Provider>
    );
};
