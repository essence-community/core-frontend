import * as React from "react";
import {useObserver} from "mobx-react-lite";
import {IPageModel, noop, getComponent, IClassProps} from "@essence/essence-constructor-share";

interface IPagerWindowsProps {
    pageStore: IPageModel;
}

export const PagerWindows: React.FC<IPagerWindowsProps> = (props) => {
    const {pageStore} = props;

    return useObserver(() => (
        <>
            {(pageStore.windowsOne || pageStore.windows).map((windowStore) => {
                const {windowBc} = windowStore;
                const BuilderWindowComponent: React.ComponentType<IClassProps> | null =
                    windowBc.edittype === "inline" ? getComponent("INLINE_WINDOW") : getComponent("WINDOW");

                if (!BuilderWindowComponent) {
                    return null;
                }

                return (
                    <BuilderWindowComponent
                        // @ts-ignore
                        onSubmit={noop}
                        bc={windowBc}
                        key={windowBc.ckPageObject}
                        store={windowStore}
                        // @ts-ignore
                        gridStore={windowStore.gridStore}
                        pageStore={pageStore}
                        visible
                    />
                );
            })}
        </>
    ));
};
