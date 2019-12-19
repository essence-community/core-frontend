import * as React from "react";
import {useObserver} from "mobx-react-lite";
import {getComponent, ApplicationContext, IPageModel, IBuilderConfig} from "@essence/essence-constructor-share";
import {VAR_RECORD_PARENT_ID, VAR_RECORD_PAGE_OBJECT_ID} from "@essence/essence-constructor-share/constants";

const emptyBC: IBuilderConfig = {
    [VAR_RECORD_PAGE_OBJECT_ID]: "null",
    [VAR_RECORD_PARENT_ID]: "null",
};

export const PagesContainer: React.FC = () => {
    const applicationStore = React.useContext(ApplicationContext);
    const BuilderPage = getComponent("PAGER");

    return useObserver(() => (
        <>
            {applicationStore &&
                BuilderPage &&
                applicationStore.pagesStore.pages.map((page: IPageModel) => (
                    <BuilderPage key={page.pageId} pageStore={page} visible bc={emptyBC} />
                ))}
        </>
    ));
};
