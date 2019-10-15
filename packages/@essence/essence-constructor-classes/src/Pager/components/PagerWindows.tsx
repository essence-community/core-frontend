import * as React from "react";
import {useObserver} from "mobx-react-lite";
import {IPageModel, noop, getComponent} from "@essence/essence-constructor-share";

interface IPagerWindowsProps {
    pageStore: IPageModel;
}

export const PagerWindows: React.FC<IPagerWindowsProps> = (props) => {
    const {pageStore} = props;

    return useObserver(() =>
        (pageStore.windowsOne || pageStore.windows).map((windowStore) => {
            const {windowBc} = windowStore;
            const BuilderWindowComponent: React.ComponentType<any> =
                windowBc.edittype === "inline" ? getComponent("INLINE_WINDOW") : getComponent("WINDOW");

            if (!BuilderWindowComponent) {
                return null;
            }

            return (
                <BuilderWindowComponent
                    onSubmit={noop}
                    bc={windowBc}
                    key={windowBc.ckPageObject}
                    store={windowStore}
                    gridStore={windowStore.gridStore}
                    pageStore={pageStore}
                    visible
                />
            );
        }),
    );
};
