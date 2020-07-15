import * as React from "react";
import {IClassProps} from "@essence-community/constructor-share/types";
import {useObserver} from "mobx-react";
import {useModel} from "@essence-community/constructor-share/hooks";
import {mapComponents} from "@essence-community/constructor-share/components";
import {VAR_RECORD_PAGE_OBJECT_ID} from "@essence-community/constructor-share/constants";
import {PromoExampleBuildModel} from "../store/PromoExampleBuildModel";

export const PromoExampleBuildContainer: React.FC<IClassProps> = (props) => {
    const [store] = useModel((options) => new PromoExampleBuildModel(options), props);

    return useObserver(() => (
        <>
            {mapComponents(store.childs, (ChildCmp, childBc) => (
                <ChildCmp key={childBc[VAR_RECORD_PAGE_OBJECT_ID]} {...props} bc={childBc} />
            ))}
        </>
    ));
};
