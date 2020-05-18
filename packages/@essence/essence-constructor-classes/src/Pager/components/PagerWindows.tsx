import * as React from "react";
import {useObserver} from "mobx-react-lite";
import {VAR_RECORD_PAGE_OBJECT_ID} from "@essence-community/constructor-share/constants";
import {IClassProps} from "@essence-community/constructor-share/types";
import {mapComponents} from "@essence-community/constructor-share/components";

export const PagerWindows: React.FC<IClassProps> = (props) => {
    const {pageStore} = props;

    return useObserver(() => (
        <>
            {mapComponents(pageStore.windows, (ChildCmp, childBc) => (
                <ChildCmp key={childBc[VAR_RECORD_PAGE_OBJECT_ID]} {...props} bc={childBc} />
            ))}
        </>
    ));
};
