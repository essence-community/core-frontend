import {StoreBaseModel} from "@essence-community/constructor-share/models";
import {
    VAR_RECORD_MASTER_ID,
    VAR_RECORD_PAGE_OBJECT_ID,
    VAR_RECORD_PARENT_ID,
} from "@essence-community/constructor-share/constants";
import {IBuilderMode, IHandlerOptions, IBuilderConfig, IStoreBaseModelProps} from "@essence-community/constructor-share/types";
import {computed, makeObservable} from "mobx";

export class GridInlineModel extends StoreBaseModel {

    constructor(props: IStoreBaseModelProps) {
        super(props);
        makeObservable(this);
    }

    @computed get mainStore() {
        for (const ckPageObjectMain of [this.bc[VAR_RECORD_MASTER_ID], this.bc[VAR_RECORD_PARENT_ID]]) {
            const store = ckPageObjectMain && this.pageStore.stores.get(ckPageObjectMain);

            if (store) {
                return store;
            }
        }

        return undefined;
    }

    handlers = {
        onCloseWindow: () => {
            this.pageStore.closeWindowAction(this.bc[VAR_RECORD_PAGE_OBJECT_ID]);

            return Promise.resolve(true);
        },
        onSimpleSaveWindow: async (mode: IBuilderMode, btnBc: IBuilderConfig, options: IHandlerOptions) => {
            const parentStore = this.pageStore.stores.get(this.bc[VAR_RECORD_PARENT_ID]);
            const {form} = options;

            if (parentStore && parentStore.recordsStore && form) {
                await form.validate();

                if (btnBc.skipvalidation || form.isValid) {
                    let success: string | boolean = false;
                    const modeAction = (this.bc.mode || mode) as IBuilderMode;

                    if (this.mainStore?.handlers?.onSaveWindow) {
                        success = await this.mainStore.handlers.onSaveWindow(modeAction, btnBc, options);
                    } else {
                        const isDownload = mode === "7" || btnBc.mode === "7";

                        success = await parentStore.recordsStore[isDownload ? "downloadAction" : "saveAction"](
                            form.values,
                            modeAction,
                            {
                                ...options,
                                actionBc: btnBc,
                                form,
                            },
                        );
                    }

                    if (success) {
                        this.pageStore.closeWindowAction(this.bc[VAR_RECORD_PAGE_OBJECT_ID]);
                    }

                    return Boolean(success);
                }
            }

            return false;
        },
    };
}
