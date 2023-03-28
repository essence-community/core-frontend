import * as React from "react";
import {useObserver} from "mobx-react";
import {IPageModel, IClassProps} from "@essence-community/constructor-share/types";
import {getComponent, mapComponentOne} from "@essence-community/constructor-share/components";
import {ApplicationContext} from "@essence-community/constructor-share/context";

export const PagesContainer: React.FC<IClassProps> = (props) => {
    const {bc} = props;
    const applicationStore = React.useContext(ApplicationContext);
    const BuilderPage = getComponent("PAGER");

    return useObserver(() => {
        if (!applicationStore || !BuilderPage) {
            return null;
        }

        const content = applicationStore.pagesStore.pages.map((page: IPageModel) =>
            mapComponentOne(page.pagerBc, (ChildCmp) => (
                <ChildCmp
                    key={page.isMulti ? page.uniqueId : page.pageId}
                    pageStore={page}
                    visible
                    bc={{childs: bc.childs, ...page.pagerBc}}
                />
            )),
        );

        if (bc.height) {
            return <div style={{height: bc.height}}>{content}</div>;
        }

        return <>{content}</>;
    });
};
