import {IClassProps, Scrollbars} from "@essence-community/constructor-share";
import {useModel} from "@essence-community/constructor-share/hooks/useModel";
import * as React from "react";
import {TreeRows} from "../components/TreeRows/TreeRows";
import {PagesTreeModel} from "../stores/PagesTreeModel";
import {IBuilderClassConfig} from "../types";
import {useStyles} from "./PagesTree.styles";

const SCROLLBARS_STYLE = {
    height: "100%",
    width: "100%",
};

const UITYPES = {
    1: "uitype-1" as "uitype-1",
    3: "uitype-3" as "uitype-3",
};

export const PagesTree: React.FC<IClassProps<IBuilderClassConfig>> = (props) => {
    const {pageStore, bc} = props;
    const {routesStore, pagesStore} = pageStore.applicationStore;
    const classes = useStyles();

    const [store] = useModel((modelProps) => new PagesTreeModel(modelProps), props);

    return (
        <Scrollbars withRequestAnimationFrame style={SCROLLBARS_STYLE} className={classes[UITYPES[bc.uitype]]}>
            {routesStore ? (
                <TreeRows parent={null} treeModel={store} routesStore={routesStore} pagesStore={pagesStore} level={0} />
            ) : null}
        </Scrollbars>
    );
};
