import {RecordsModel} from "@essence-community/constructor-share/models";
import {IPageModel, IBuilderConfig, IBuilderMode, IApplicationModel} from "@essence-community/constructor-share/types";

interface IFreeHanderOptions {
    applicationStore: IApplicationModel;
    pageStore: IPageModel;
    bc: IBuilderConfig;
    files?: File[];
    form?: any;
}

export function freeHandler(options: IFreeHanderOptions) {
    const {pageStore, bc, files, form, applicationStore} = options;
    const recordsStore = new RecordsModel(bc, {applicationStore, pageStore});
    const mode = (bc.modeaction || bc.mode) as IBuilderMode;

    return recordsStore[bc.mode === "7" ? "downloadAction" : "saveAction"]({}, mode, {
        actionBc: bc,
        files,
        form,
        query: bc.updatequery || "Modify",
    });
}
