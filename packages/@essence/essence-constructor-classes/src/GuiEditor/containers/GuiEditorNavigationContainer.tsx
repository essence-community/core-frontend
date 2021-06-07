import React, {useCallback, useEffect, useMemo, useRef} from "react";
import {IBuilderConfig, IClassProps} from "@essence-community/constructor-share/types";
import {mapComponentOne, mapComponents} from "@essence-community/constructor-share/components";
import {
    VAR_RECORD_MASTER_ID,
    VAR_RECORD_PAGE_OBJECT_ID,
    VAR_RECORD_PARENT_ID,
} from "@essence-community/constructor-share/constants";
import {useModel} from "@essence-community/constructor-share/hooks";
import {useObserver} from "mobx-react";
import {GuiEditorNavigationModel} from "../stores/GuiEditorNavigationModel";
import {useStyles} from "./GuiEditorNavigationContainer.styles";

export const GuiEditorNavigationContainer: React.FC<IClassProps> = (props) => {
    const {bc, pageStore} = props;
    const classes = useStyles();
    const buttons = useMemo<IBuilderConfig[]>(
        () =>
            bc.childs.map((child) => ({
                [VAR_RECORD_MASTER_ID]: child[VAR_RECORD_PAGE_OBJECT_ID],
                [VAR_RECORD_PAGE_OBJECT_ID]: `${child[VAR_RECORD_PAGE_OBJECT_ID]}_BTN`,
                [VAR_RECORD_PARENT_ID]: child[VAR_RECORD_PARENT_ID],
                handler: "onSelectMenu",
                iconfont: child.iconfont,
                iconfontname: child.iconfontname,
                onlyicon: true,
                type: "BTN",
                uitype: "11",
            })),
        [bc.childs],
    );
    const [store] = useModel((options) => new GuiEditorNavigationModel(options), props);
    const rootElement = useRef<HTMLDivElement>(null);
    const handleOutsideClick = useCallback(
        (event) => {
            const {target} = event;

            if (!rootElement.current.contains(target)) {
                store.handleCloseMenu();
            }
        },
        [store],
    );

    useEffect(() => {
        pageStore.pageEl.addEventListener("click", handleOutsideClick);

        return () => {
            pageStore.pageEl.removeEventListener("click", handleOutsideClick);
        };
    }, [handleOutsideClick, pageStore]);

    return useObserver(() => (
        <div className={classes.root} ref={rootElement}>
            <div className={classes.menu}>
                {mapComponents(buttons, (ChildCmp, childBc) => (
                    <ChildCmp key={childBc[VAR_RECORD_PAGE_OBJECT_ID]} {...props} bc={childBc} />
                ))}
            </div>

            {store.selectedMenu ? (
                <div className={classes.paper}>
                    {mapComponentOne(store.selectedMenu, (ChildCmp, childBc) => (
                        <ChildCmp {...props} bc={childBc} />
                    ))}
                </div>
            ) : null}
        </div>
    ));
};
