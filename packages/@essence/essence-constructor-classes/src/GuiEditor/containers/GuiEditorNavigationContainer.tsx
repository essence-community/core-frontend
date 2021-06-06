import React, {useState} from "react";
import {IBuilderConfig, IClassProps} from "@essence-community/constructor-share/types";
import {mapComponentOne, mapComponents} from "@essence-community/constructor-share";
import {Icon} from "@essence-community/constructor-share/Icon";

export const GuiEditorNavigationContainer: React.FC<IClassProps> = (props) => {
    const [selectedMenu, setSelectedMenu] = useState<IBuilderConfig | undefined>();

    return (
        <div>
            {mapComponents(props.bc.childs, (ChildCmp, childBc) => (
                <div onClick={() => setSelectedMenu(childBc)}>
                    <Icon iconfontname={childBc.iconfontname} iconfont={childBc.iconfont} />
                </div>
            ))}

            {selectedMenu
                ? mapComponentOne(selectedMenu, (ChildCmp, childBc) => <ChildCmp {...props} bc={childBc} />)
                : null}
        </div>
    );
};
