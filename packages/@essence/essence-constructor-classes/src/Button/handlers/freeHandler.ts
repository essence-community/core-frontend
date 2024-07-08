import {RecordsModel} from "@essence-community/constructor-share/models";
import {
    IPageModel,
    IBuilderConfig,
    IBuilderMode,
    IApplicationModel,
    IRecordsModel,
} from "@essence-community/constructor-share/types";
import {VAR_RECORD_MASTER_ID, VAR_RECORD_PARENT_ID} from "@essence-community/constructor-share/constants";
import {IForm} from "@essence-community/constructor-share/Form";
import {getWindowBc} from "@essence-community/constructor-share/utils/window/getWindowBc";
import {createWindowProps} from "@essence-community/constructor-share/utils/window";

interface IFreeHanderOptions {
    applicationStore: IApplicationModel;
    pageStore: IPageModel;
    bc: IBuilderConfig;
    files?: File[];
    form?: IForm;
}

export function freeHandler(options: IFreeHanderOptions) {
    const {pageStore, bc, files, form, applicationStore} = options;
    const recordsStore: IRecordsModel = new RecordsModel(bc, {applicationStore, pageStore});
    let recordsStoreParent: IRecordsModel = null;

    // Try to get records store from master or parent
    for (const ckPageObjectMain of [bc[VAR_RECORD_MASTER_ID], bc[VAR_RECORD_PARENT_ID]]) {
        if (ckPageObjectMain) {
            const builderStore = pageStore.stores.get(ckPageObjectMain);

            if (builderStore && builderStore.recordsStore) {
                // eslint-disable-next-line prefer-destructuring
                recordsStoreParent = builderStore.recordsStore;
                break;
            }
        }
    }

    const mode = (bc.modeaction || bc.mode) as IBuilderMode;

    if (bc.ckwindow && getWindowBc(bc, pageStore)) {
        pageStore.createWindowAction(
            createWindowProps({
                btnBc: bc,
                initValues: recordsStoreParent?.selectedRecord || form?.values,
                mode,
                pageStore,
                parentStore: {
                    bc,
                    recordsStore,
                } as any,
            }),
        );

        return Promise.resolve(true);
    }

    return recordsStore[bc.mode === "7" ? "downloadAction" : "saveAction"](
        recordsStoreParent?.selectedRecord || form?.values || {},
        mode,
        {
            actionBc: bc,
            files,
            form,
            noReload: bc.reloadmaster ? undefined : true,
            query: bc.updatequery || "Modify",
        },
    );
}
