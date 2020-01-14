import * as React from "react";
import {useObserver} from "mobx-react-lite";
import {getComponent, ApplicationContext, IPageModel} from "@essence-community/constructor-share";

export const PagesContainer: React.FC = () => {
    const applicationStore = React.useContext(ApplicationContext);
    const BuilderPage = getComponent("PAGER");

    return useObserver(() => (
        <>
            {applicationStore &&
                BuilderPage &&
                applicationStore.pagesStore.pages.map((page: IPageModel) => (
                    <BuilderPage key={page.pageId} pageStore={page} visible bc={page.pagerBc} />
                ))}
        </>
    ));
};
