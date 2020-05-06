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

interface IFreeHanderOptions {
    applicationStore: IApplicationModel;
    pageStore: IPageModel;
    bc: IBuilderConfig;
    files?: File[];
    form?: IForm;
}

export function freeHandler(options: IFreeHanderOptions) {
    const {pageStore, bc, files, form, applicationStore} = options;
    let recordsStore: IRecordsModel = new RecordsModel(bc, {applicationStore, pageStore});

    // Try to get records store from master or parent
    for (const ckPageObjectMain of [bc[VAR_RECORD_MASTER_ID], bc[VAR_RECORD_PARENT_ID]]) {
        if (ckPageObjectMain) {
            const builderStore = pageStore.stores.get(ckPageObjectMain);

            if (builderStore && builderStore.recordsStore) {
                // eslint-disable-next-line prefer-destructuring
                recordsStore = builderStore.recordsStore;
                break;
            }
        }
    }

    const mode = (bc.modeaction || bc.mode) as IBuilderMode;

    return recordsStore[bc.mode === "7" ? "downloadAction" : "saveAction"]({}, mode, {
        actionBc: bc,
        files,
        form,
        query: bc.updatequery || "Modify",
    });
}
