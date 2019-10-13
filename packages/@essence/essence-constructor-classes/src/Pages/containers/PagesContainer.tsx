import * as React from "react";
import {useObserver} from "mobx-react-lite";
import {getComponent, ApplicationContext, IApplicationModel, IPageModel} from "@essence/essence-constructor-share";

export const PagesContainer: React.FC = () => {
    const applicationStore: IApplicationModel = React.useContext(ApplicationContext);
    const BuilderPage = getComponent("PAGER");

    return useObserver(() => (
        <>
            <pre>{JSON.stringify(applicationStore.pagesStore.pages.length, null, 2)}</pre>
            {applicationStore.pagesStore.pages.map((page: IPageModel) => (
                <BuilderPage key={page.ckPage} pageStore={page} />
            ))}
        </>
    ));
};
