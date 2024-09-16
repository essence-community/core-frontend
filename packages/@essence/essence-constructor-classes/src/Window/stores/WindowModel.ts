import {
    IRecord,
    IBuilderConfig,
    IRecordsModel,
    IStoreBaseModelProps,
    IBuilderMode,
    IHandlerOptions,
    IHandlers,
    IStoreBaseModel,
} from "@essence-community/constructor-share/types";
import {StoreBaseModel, RecordsModel} from "@essence-community/constructor-share/models";
import {
    VAR_RECORD_PAGE_OBJECT_ID,
    VAR_RECORD_MASTER_ID,
    VAR_RECORD_PARENT_ID,
} from "@essence-community/constructor-share/constants";
import {observable, action, computed} from "mobx";
import {getWindowChilds} from "../utils";

/**
 * @exports WindowModel
 */
export class WindowModel extends StoreBaseModel {
    childs: IBuilderConfig[];

    recordsStore: IRecordsModel;

    constructor(props: IStoreBaseModelProps) {
        super(props);
        this.childs = getWindowChilds(this.bc.mode as IBuilderMode, this.bc.childs);
        this.recordsStore = new RecordsModel(this.bc, {
            applicationStore: this.pageStore.applicationStore,
            pageStore: this.pageStore,
        });
        this.initialValues = this.bc.values;
    }

    @observable public initialValues: IRecord | undefined;

    @observable addMore = false;

    @observable cancel = false;

    @computed get mainStore(): IStoreBaseModel | undefined {
        for (const ckPageObjectMain of [this.bc[VAR_RECORD_MASTER_ID], this.bc[VAR_RECORD_PARENT_ID]]) {
            const store = ckPageObjectMain && this.pageStore.stores.get(ckPageObjectMain);

            if (store) {
                return store;
            }
        }

        return undefined;
    }

    @action
    closeAction = (mode: IBuilderMode, btnBc: IBuilderConfig, options: IHandlerOptions): Promise<boolean> => {
        this.pageStore.closeWindowAction(this.bc[VAR_RECORD_PAGE_OBJECT_ID]);
        const isCloseReload = [btnBc.closereload, this.bc.closereload, true].find((val) => typeof val === "boolean");

        if (isCloseReload && this.mainStore?.handlers?.onReloadStores) {
            // TODO: call winReloadStores for gridStore
            this.mainStore.handlers.onReloadStores(mode, btnBc, options);
        }

        return Promise.resolve(true);
    };

    @action
    resetCancelAction = () => {
        this.cancel = false;
    };

    @action
    setCancelAction = () => {
        const isSilent = (this.bc.bottombtn || []).some((btn) => btn.handler === "onCloseWindowSilent");

        if (isSilent) {
            this.pageStore.closeWindowAction(this.bc[VAR_RECORD_PAGE_OBJECT_ID]);
        } else {
            this.cancel = true;
        }
    };

    @action
    changeAddMoreAction = () => {
        this.addMore = !this.addMore;
    };

    /**
     * Сохранение данных
     * @param {IBuilderMode} mode Коды действия
     * @param {IBuilderConfig} btnBc Конфиг кнопки
     * @param {IHandlerOptions} options Опции после нажатия на кнопку
     */
    @action
    saveAction = async (mode: IBuilderMode, btnBc: IBuilderConfig, options: IHandlerOptions) => {
        if (!options.form) {
            return false;
        }

        await options.form.validate();

        if (btnBc.skipvalidation || options.form.isValid) {
            let success: string | boolean = false;
            const modeAction = (btnBc.modeaction || btnBc.mode || this.bc.mode || mode) as IBuilderMode;

            if (this.mainStore?.handlers?.onSaveWindow) {
                success = await this.mainStore.handlers.onSaveWindow(modeAction, btnBc, options);
            } else {
                const isDownload = mode === "7" || btnBc.mode === "7";

                success = await this.recordsStore[isDownload ? "downloadAction" : "saveAction"](
                    options.form.values,
                    modeAction,
                    {
                        actionBc: btnBc,
                        // TODO: check new api of records store
                        files: options.files,
                        form: options.form,
                    },
                );
            }

            if (success) {
                if (this.addMore) {
                    this.pageStore.resetStepAction();
                    this.initialValues = {};
                } else {
                    this.closeAction(modeAction, btnBc, options);
                }
            }

            return Boolean(success);
        }

        return false;
    };

    /**
     * TODO: Понять проблему после релиза
     * Сохранение данных
     */
    @action
    saveFileAction = async (mode: IBuilderMode, btnBc: IBuilderConfig, options: IHandlerOptions) => {
        return this.saveAction(mode, btnBc, options);
    };

    onPrintExcel = async (mode: IBuilderMode, btnBc: IBuilderConfig, options: IHandlerOptions) => {
        if (!options.form) {
            return false;
        }

        await options.form.validate();

        if ((btnBc.skipvalidation || options.form.isValid) && this.mainStore && this.mainStore.handlers.onPrintExcel) {
            const success = await this.mainStore.handlers.onPrintExcel(mode, btnBc, {record: options.form.values});

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
         * Сохраняем значение по кнопке "Save" для FilePanel
         * @memberof WindowModel.handlers
         * @instance
         */
        onSaveFile: this.saveFileAction,
        /**
         * Сохраняем значение по кнопке "Save"
         * @memberof WindowModel.handlers
         * @instance
         */
        onSimpleSaveWindow: this.saveAction,
    };
}
