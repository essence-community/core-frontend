import {makeObservable, observable} from "mobx";
import {
    IBuilderConfig,
    IPageModel,
    IStoreBaseModel,
    IStoreBaseModelProps,
    StoreBaseModelNameType,
    IHandlers,
    IApplicationModel,
    IRecord,
    IBuilderMode,
    IHandlerOptions,
    IRecordsModel,
} from "../../types";
import {
    VAR_RECORD_ID,
    VAR_RECORD_MASTER_ID,
    VAR_RECORD_PAGE_OBJECT_ID,
    VAR_RECORD_PARENT_ID,
    VAR_RECORD_ROUTE_PAGE_ID,
    loggerRoot,
} from "../../constants";
import {i18next, print} from "../../utils";
import {snackbarStore} from "..";
import {attachGlobalValues} from "../../actions/saveAction";

const logger = loggerRoot.extend("StoreBaseModel");

/**
 * Базовая модель для построения сторов
 *
 * reloadStoreAction - Запускается при изменения зависимого стора/поля по ck_master
 * checkParent - Позволяет обновлять стор вверх
 * clearStoreAction - Запускается при очистки зависимого стора/поля по ck_master
 */
export class StoreBaseModel implements IStoreBaseModel {
    public name: StoreBaseModelNameType = "base";

    public disabled?: boolean;

    public hidden?: boolean;

    public bc: IBuilderConfig;

    public handlers: IHandlers = {};

    public pageStore: IPageModel;

    public applicationStore?: IApplicationModel | null;

    public recordId: string;

    public editing?: boolean;

    public recordsStore?: IRecordsModel;

    constructor({bc, pageStore, applicationStore, disabled, hidden}: IStoreBaseModelProps) {
        this.bc = bc;
        this.pageStore = pageStore;
        this.applicationStore = applicationStore;
        this.disabled = disabled;
        this.hidden = hidden;
        this.recordId = bc.idproperty || VAR_RECORD_ID;
    }

    public reloadStoreAction = (reloadStoreAction?: boolean): Promise<undefined | IRecord> => {
        logger(i18next.t("static:83490c56debb4a399f05518608e3bace", {name: this.constructor.name, reloadStoreAction}));

        return Promise.resolve(undefined);
    };

    public clearStoreAction = (): void => {
        logger(i18next.t("static:5c3108d6508a4141bdca1e52881e196d", {name: this.constructor.name}));
    };

    public invokeHandler = (name: string, args: [IBuilderMode, IBuilderConfig, IHandlerOptions]): Promise<boolean> => {
        if (this.handlers[name]) {
            return this.handlers[name](...args);
        }

        return Promise.resolve(false);
    };

    handlePrint = async (isOnline: boolean, bcBtn: IBuilderConfig, options: IHandlerOptions): Promise<boolean> => {
        const form = options.form;
        const parentStore = this.pageStore.stores.get(this.bc[VAR_RECORD_MASTER_ID]);

        if (form) {
            form.validate();

            const values = bcBtn.skipvalidation || form.isValid ? form.values : undefined;

            if (values) {
                const isValidPrint = await print({
                    applicationStore: this.pageStore.applicationStore,
                    bc: this.bc,
                    bcBtn,
                    isOnline,
                    pageStore: this.pageStore,
                    reloadPageObject: {
                        [VAR_RECORD_PAGE_OBJECT_ID]: this.bc[VAR_RECORD_MASTER_ID] || this.bc[VAR_RECORD_PARENT_ID],
                        [VAR_RECORD_ROUTE_PAGE_ID]: this.pageStore.pageId,
                    },
                    snackbarStore,
                    timeout: bcBtn.timeout || this.bc.timeout,
                    values: attachGlobalValues({
                        getValue: parentStore?.recordsStore?.getValue || this.recordsStore?.getValue,
                        getglobaltostore: bcBtn.getglobaltostore,
                        globalValues: this.pageStore.globalValues,
                        values,
                    }),
                });

                if (isValidPrint) {
                    form.submit();
                    options.windowCtx?.onClose();
                }
            }
        }

        return Promise.resolve(true);
    };
    onPrintHandleOffline = (mode: IBuilderMode, btnBc: IBuilderConfig, options: IHandlerOptions) =>
        this.handlePrint(false, btnBc, options);
    onPrintHandleOnline = (mode: IBuilderMode, btnBc: IBuilderConfig, options: IHandlerOptions) =>
        this.handlePrint(true, btnBc, options);
}
