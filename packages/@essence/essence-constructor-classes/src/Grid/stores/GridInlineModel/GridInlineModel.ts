import {StoreBaseModel} from "@essence-community/constructor-share/models";
import {VAR_RECORD_PAGE_OBJECT_ID, VAR_RECORD_PARENT_ID} from "@essence-community/constructor-share/constants";
import {IBuilderMode, IHandlerOptions, IBuilderConfig} from "@essence-community/constructor-share/types";

export class GridInlineModel extends StoreBaseModel {
    handlers = {
        onCloseWindow: () => {
            this.pageStore.closeWindowAction(this.bc[VAR_RECORD_PAGE_OBJECT_ID]);

            return Promise.resolve(true);
        },
        onSimpleSaveWindow: async (mode: IBuilderMode, btnBc: IBuilderConfig, {form}: IHandlerOptions) => {
            const parentStore = this.pageStore.stores.get(this.bc[VAR_RECORD_PARENT_ID]);

            if (parentStore && parentStore.recordsStore && form) {
                await form.validate();

                if (form.isValid) {
                    const success = await parentStore.recordsStore.saveAction(
                        form.values,
                        this.bc.mode as IBuilderMode,
                        {
                            actionBc: btnBc,
                            form,
                        },
                    );

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
