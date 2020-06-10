import {StoreBaseModel} from "@essence-community/constructor-share/models";
import {observable, IObservableArray} from "mobx";
import {
    IBuilderConfig,
    VAR_RECORD_PAGE_OBJECT_ID,
    VAR_RECORD_CN_ORDER,
    IBuilderMode,
    IHandlerOptions,
    FieldValue,
} from "@essence-community/constructor-share";
import {makeChilds, makePreviewChilds} from "../mock/childsBuild";

export class PromoExampleBuildModel extends StoreBaseModel {
    previewChilds = makePreviewChilds(this.bc[VAR_RECORD_PAGE_OBJECT_ID]);

    @observable childs: IObservableArray<IBuilderConfig> = observable.array(makeChilds(this.bc, this.previewChilds), {
        deep: false,
    });

    @observable values = {};

    saveAction = (values: IBuilderConfig) => {
        const [...newChilds] = this.previewChilds;
        const newChildIndex = newChilds.findIndex(
            (child: IBuilderConfig) => child.type === values.type && child.datatype === values.datatype,
        );

        if (newChildIndex === -1) {
            return false;
        }

        this.childs.replace([]);

        newChilds[newChildIndex] = values;
        newChilds.sort((a, b) => (a[VAR_RECORD_CN_ORDER] ?? 0) - (b[VAR_RECORD_CN_ORDER] ?? 0));

        this.previewChilds = newChilds;
        this.childs.replace(makeChilds(this.bc, newChilds));
        this.tryUpdateGridRecords(newChilds);

        return true;
    };

    tryUpdateGridRecords = (newValues: IBuilderConfig[]) => {
        const gridObjectId = this.childs[0]?.childs?.[0]?.[VAR_RECORD_PAGE_OBJECT_ID];

        if (gridObjectId) {
            const gridStore = this.pageStore.stores.get(gridObjectId);

            if (gridStore && gridStore.bc.type === "GRID") {
                gridStore.recordsStore?.setRecordsAction((newValues as unknown) as Record<string, FieldValue>[]);
            }
        }
    };

    handlers = {
        onSave: async (_mode: IBuilderMode, _btnBc: IBuilderConfig, options: IHandlerOptions) => {
            const {form} = options;

            if (form) {
                await form.validate();

                if (form.isValid) {
                    this.values = form.values;

                    return true;
                }
            }

            return false;
        },
        onSaveWindow: (_mode: IBuilderMode, _btnBc: IBuilderConfig, options: IHandlerOptions) => {
            const {form} = options;

            if (form) {
                return Promise.resolve(this.saveAction((form.values as unknown) as IBuilderConfig));
            }

            return Promise.resolve(false);
        },
    };
}
