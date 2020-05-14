import * as React from "react";
import {createPortal} from "react-dom";
import {VAR_RECORD_PARENT_ID} from "@essence-community/constructor-share/constants";
import {UIForm} from "@essence-community/constructor-share/uicomponents";
import {IClassProps, IBuilderMode} from "@essence-community/constructor-share/types";
import {useObserver} from "mobx-react-lite";
import {useModel} from "@essence-community/constructor-share/hooks";
import {IGridModel} from "../stores/GridModel/GridModel.types";
import {GridInlineTable} from "../components/GridInlineTable";
import {GridInlineButtons} from "../components/GridInlineButtons";
import {GridInlineModel} from "../stores/GridInlineModel";

export const GridInlineContainer: React.FC<IClassProps> = (props) => {
    const {pageStore, bc} = props;
    const isNew = bc.mode === "1" || bc.mode === "6";

    useModel((options) => new GridInlineModel(options), props);

    const handleSubmit = () => {
        const gridStore = pageStore.stores.get(bc[VAR_RECORD_PARENT_ID]) as IGridModel | undefined;
        const gridInlineButtonContainer = gridStore?.refs.get("grid-inline-button");

        if (gridInlineButtonContainer) {
            const saveButton = gridInlineButtonContainer.querySelector("button");

            if (saveButton) {
                saveButton.click();
            }
        }
    };

    return useObserver(() => {
        const gridStore = pageStore.stores.get(bc[VAR_RECORD_PARENT_ID]) as IGridModel | undefined;

        if (!gridStore) {
            return null;
        }

        const gridInlineButtonContainer = gridStore.refs.get("grid-inline-button");
        const gridInlineContainer = gridStore.refs.get("grid-inline");

        return (
            <UIForm
                noForm
                onSubmit={handleSubmit}
                initialValues={isNew ? undefined : gridStore.recordsStore.selectedRecord}
                mode={bc.mode as IBuilderMode}
                pageStore={pageStore}
            >
                {gridInlineButtonContainer
                    ? createPortal(<GridInlineButtons {...props} gridStore={gridStore} />, gridInlineButtonContainer)
                    : null}

                {gridInlineContainer
                    ? createPortal(<GridInlineTable {...props} gridStore={gridStore} />, gridInlineContainer)
                    : null}
            </UIForm>
        );
    });
};
