import * as React from "react";
import {VAR_RECORD_PAGE_OBJECT_ID} from "@essence-community/constructor-share/constants";
import {IBuilderConfig} from "@essence-community/constructor-share/types";
import {useHidden} from "@essence-community/constructor-share/hooks/useCommon/useHidden";
import {useVisible} from "@essence-community/constructor-share/hooks/useCommon/useVisible";
import {IGridModel} from "../../stores/GridModel/GridModel.types";

interface IColumnCheckHidden {
    bc: IBuilderConfig;
    store: IGridModel;
}

export const ColumnCheckHidden: React.FC<IColumnCheckHidden> = ({store, bc}) => {
    const isHidden = useHidden({
        bc,
        pageStore: store.pageStore,
    });
    const isVisible = useVisible({
        bc,
        pageStore: store.pageStore,
    });

    React.useEffect(() => {
        const t = store.visibleAndHidden.get(bc[VAR_RECORD_PAGE_OBJECT_ID]);

        if (t.hidden !== isHidden) {
            store.setVisibleColumn(bc[VAR_RECORD_PAGE_OBJECT_ID], isHidden);
        }
    }, [bc, isHidden, store]);

    React.useEffect(() => {
        const t = store.visibleAndHidden.get(bc[VAR_RECORD_PAGE_OBJECT_ID]);

        if (t.visible !== isVisible) {
            store.setVisibleColumn(bc[VAR_RECORD_PAGE_OBJECT_ID], isVisible);
        }
    }, [bc, isVisible, store]);

    return null;
};
