import {IClassProps, Scrollbars} from "@essence-community/constructor-share";
import {ApplicationContext} from "@essence-community/constructor-share/context";
import {useModel} from "@essence-community/constructor-share/hooks/useModel";
import * as React from "react";
import {TreeRows} from "../components/TreeRows/TreeRows";
import {PagesTreeModel} from "../stores/PagesTreeModel";

const SCROLLBARS_STYLE = {
    height: "100%",
};

export const PagesTree: React.FC<IClassProps> = (props) => {
    const applicationStore = React.useContext(ApplicationContext);

    if (!applicationStore) {
        throw new Error("Not found applicationStore");
    }

    const [store] = useModel((modelProps) => new PagesTreeModel(modelProps), {
        applicationStore,
        bc: props.bc,
        disabled: props.disabled,
        hidden: props.hidden,
        pageStore: props.pageStore,
    });

    const {routesStore, pagesStore} = applicationStore;

    return (
        <Scrollbars withRequestAnimationFrame style={SCROLLBARS_STYLE}>
            {routesStore ? (
                <TreeRows parent={null} treeModel={store} routesStore={routesStore} pagesStore={pagesStore} level={0} />
            ) : null}
        </Scrollbars>
    );
};
