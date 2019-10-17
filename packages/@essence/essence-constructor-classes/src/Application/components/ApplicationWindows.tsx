import * as React from "react";
import {useObserver} from "mobx-react-lite";
import {IPageModel, IWindowModel, mapComponents, IWindowClassProps} from "@essence/essence-constructor-share";

interface IApplicationWindowsProps {
    pageStore: IPageModel;
}

export const ApplicationWindows: React.FC<IApplicationWindowsProps> = (props) => {
    const {pageStore} = props;

    return useObserver(() => (
        <>
            {mapComponents(
                pageStore.windows.map((win: IWindowModel) => win.bc),
                (ChildCmp: React.ComponentType<IWindowClassProps>, childBc, index) => (
                    <ChildCmp
                        bc={childBc}
                        key={childBc.ckPageObject}
                        store={pageStore.windows[index]}
                        pageStore={pageStore}
                        visible
                    />
                ),
            )}
        </>
    ));
};
