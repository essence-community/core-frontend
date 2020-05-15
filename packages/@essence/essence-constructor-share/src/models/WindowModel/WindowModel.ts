import {extendObservable, action} from "mobx";
import {StoreBaseModel} from "../StoreBaseModel";
import {
    IBuilderConfig,
    FieldValue,
    IRecordsModel,
    IStoreBaseModel,
    IHandlerOptions,
    IHandlers,
    IWindowModel,
    IBuilderMode,
} from "../../types";
import {RecordsModel} from "../RecordsModel";
import {VAR_RECORD_PARENT_ID, VAR_RECORD_MASTER_ID} from "../../constants";
import {IWindowModelConstructor} from "./WindowModel.types";

/**
 * @exports WindowModel
 */
export class WindowModel extends StoreBaseModel implements IWindowModel {
    initialValues: Record<string, FieldValue>;

    cancel: boolean;

    addMore: boolean;

    // @deprecated
    windowBc: IBuilderConfig;

    // @deprecated
    config: {
        mode: IBuilderMode;
    };

    childs: IBuilderConfig[];

    recordsStore: IRecordsModel;

    constructor({applicationStore, bc, mode, pageStore, values}: IWindowModelConstructor) {
        super({applicationStore, bc, pageStore});
        this.windowBc = bc;
        this.config = {
            mode,
        };
        this.childs = bc.childs || [];
        this.recordsStore = new RecordsModel(this.bc, {applicationStore, pageStore: this.pageStore});

        extendObservable(
            this,
            {
                addMore: false,
                cancel: false,
                initialValues: values || {},
            },
            undefined,
            {deep: false},
        );
    }

    getMainStore = () => {
        for (const ckPageObjectMain of [this.bc[VAR_RECORD_MASTER_ID], this.bc[VAR_RECORD_PARENT_ID]]) {
            const store = ckPageObjectMain && this.pageStore.stores.get(ckPageObjectMain);

            if (store) {
                return store;
            }
        }

        return undefined;
    };

    closeAction = action(
        "WindowModel.closeAction",
        (mode: IBuilderMode, btnBc: IBuilderConfig, options: IHandlerOptions) => {
            this.pageStore.windows.remove(this);
            const parentStore: IStoreBaseModel | undefined = this.pageStore.stores.get(this.bc[VAR_RECORD_PARENT_ID]);

            if (parentStore && parentStore.handlers.onReloadStores) {
                // TODO: call winReloadStores for gridStore
                parentStore.handlers.onReloadStores(mode, btnBc, options);
            }

            return Promise.resolve(true);
        },
    );

    resetCancelAction = action("resetCancelAction", () => {
        this.cancel = false;
    });

    setCancelAction = action(
        "WindowModel.setCancelAction",
        (mode: IBuilderMode, btnBc: IBuilderConfig, options: IHandlerOptions) => {
            const isSilent = (this.bc.bottombtn || []).some((btn) => btn.handler === "onCloseWindowSilent");

            if (isSilent) {
                this.closeAction(mode, btnBc, options);
            } else {
                this.cancel = true;
            }
        },
    );

    setAddMoreAction = action("WindowModel.setAddMoreAction", (value: boolean) => {
        this.addMore = value;
    });

    /**
     * Сохранение данных
     * @param {IBuilderMode} mode Коды действия
     * @param {IBuilderConfig} btnBc Конфиг кнопки
     * @param {IHandlerOptions} options Опции после нажатия на кнопку
     */
    saveAction = action(
        "WindowModel.saveAction",
        async (mode: IBuilderMode, btnBc: IBuilderConfig, options: IHandlerOptions) => {
            if (!options.form) {
                return false;
            }

            await options.form.validate();

            if (options.form.isValid) {
                const mainStore = this.getMainStore();
                // TODO: update this to pass throw handlers
                const saveAction = (mainStore && (mainStore as any).saveAction) || this.recordsStore.saveAction;

                const success = await saveAction(options.form.values, mode || this.bc.mode, {
                    actionBc: btnBc,
                    // TODO: check new api of records store
                    files: options.files,
                    form: options.form,
                });

                if (success) {
                    if (this.addMore) {
                        this.pageStore.resetStepAction();
                        this.initialValues = {};
                    } else {
                        this.closeAction(mode || this.bc.mode, btnBc, options);
                    }
                }

                return Boolean(success);
            }

            return false;
        },
    );

    onPrintExcel = async (mode: IBuilderMode, btnBc: IBuilderConfig, options: IHandlerOptions) => {
        const parentStore: IStoreBaseModel | undefined = this.pageStore.stores.get(this.bc[VAR_RECORD_PARENT_ID]);

        if (!options.form) {
            return false;
        }

        await options.form.validate();

        if (options.form.isValid && parentStore && parentStore.handlers.onPrintExcel) {
            const success = await parentStore.handlers.onPrintExcel(mode, btnBc, {record: options.form.values});

            if (success) {
                this.closeAction(mode, btnBc, options);
            }
        }

        return false;
    };

    /**
     * @memberof WindowModel
     * @member
     */
    public handlers: IHandlers = {
        /**
         * Закрытие модального окна с сообщением
         * @memberof WindowModel.handlers
         * @instance
         */
        onCloseWindow: this.closeAction,
        /**
         * Закрытие модального окна без сообщения
         * @memberof WindowModel.handlers
         * @instance
         */
        onCloseWindowSilent: this.closeAction,
        /**
         * Печать в excel
         * @memberof WindowModel.handlers
         * @instance
         */
        onPrintExcel: this.onPrintExcel,
        /**
         * Сохраняем значение по кнопке "Save"
         * @memberof WindowModel.handlers
         * @instance
         */
        onSimpleSaveWindow: this.saveAction,
    };
}
