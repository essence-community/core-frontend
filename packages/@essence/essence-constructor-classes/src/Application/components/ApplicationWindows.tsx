import * as React from "react";
import {useObserver} from "mobx-react";
import {IPageModel, mapComponents} from "@essence-community/constructor-share";
import {VAR_RECORD_PAGE_OBJECT_ID} from "@essence-community/constructor-share/constants";

interface IApplicationWindowsProps {
    pageStore: IPageModel;
}

export const ApplicationWindows: React.FC<IApplicationWindowsProps> = (props) => {
    const {pageStore} = props;

    return useObserver(() => (
        <>
            {mapComponents(pageStore.windows, (ChildCmp, childBc) => (
                <ChildCmp bc={childBc} key={childBc[VAR_RECORD_PAGE_OBJECT_ID]} pageStore={pageStore} visible />
            ))}
        </>
    ));
};
