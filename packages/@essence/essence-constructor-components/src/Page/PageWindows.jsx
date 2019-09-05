// @flow
import * as React from "react";
import {observer} from "mobx-react";
import noop from "lodash/noop";
import {BuilderWindow, BuilderInlineWindow} from "../Window";
import {type PageModelType} from "../stores/PageModel";

type PropsType = {
    pageStore: PageModelType,
};

const PageWindows = ({pageStore}: PropsType) => {
    if (!pageStore.windowsOne.length) {
        return null;
    }

    return pageStore.windowsOne.map((windowStore) => {
        const {windowBc} = windowStore;
        const BuilderWindowComponent = windowBc.edittype === "inline" ? BuilderInlineWindow : BuilderWindow;

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
    });
};

export default observer(PageWindows);
