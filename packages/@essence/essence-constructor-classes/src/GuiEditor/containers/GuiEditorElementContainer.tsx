import React from "react";
import {IClassProps} from "@essence-community/constructor-share/types";
import {mapComponents} from "@essence-community/constructor-share/components";
import {VAR_RECORD_PAGE_OBJECT_ID} from "@essence-community/constructor-share/constants";

export const GuiEditorElementContainer: React.FC<IClassProps> = (props) => {
    return (
        <div>
            {mapComponents(props.bc.childs, (ChildCmp, childBc) => (
                <ChildCmp key={childBc[VAR_RECORD_PAGE_OBJECT_ID]} {...props} bc={childBc} />
            ))}
        </div>
    );
};
