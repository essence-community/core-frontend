/* eslint-disable max-len */
/* eslint-disable max-statements */
import {action, observable, computed} from "mobx";
import {removeFromStore, print, saveToStore, deepFind} from "@essence-community/constructor-share/utils";
import {snackbarStore, StoreBaseModel} from "@essence-community/constructor-share/models";
import {
    VAR_RECORD_PARENT_ID,
    VAR_RECORD_MASTER_ID,
    VAR_RECORD_PAGE_OBJECT_ID,
    VAR_RECORD_ROUTE_PAGE_ID,
    VAR_RECORD_CL_IS_MASTER,
} from "@essence-community/constructor-share/constants";
import {
    IRecord,
    FieldValue,
    IBuilderMode,
    IBuilderConfig,
    IHandlerOptions,
    IStoreBaseModelProps,
    IFormOptions,
    IStoreBaseModel,
} from "@essence-community/constructor-share/types";
import {attachGlobalValues} from "@essence-community/constructor-share/actions/saveAction";
import {awaitFormFilter} from "@essence-community/constructor-share/models/PageModel/PageModelRedirect";
import {IForm} from "@essence-community/constructor-share/Form/types";

export class FilterModel extends StoreBaseModel {
    public valuesStorageKey = "";

    @observable public isOpen = false;

    @observable public values = {};

    @computed public get selectedRecord() {
        return this.values;
    }

    constructor(props: IStoreBaseModelProps) {
        super(props);

        if (this.bc.filtervaluessave && this.pageStore.pageId) {
            this.valuesStorageKey = `${this.pageStore.pageId}_filter_${this.bc[VAR_RECORD_PAGE_OBJECT_ID]}`;
        }

        this.isOpen = !this.bc.collapsed;
    }

    @action
    setValues = (values: IRecord): void => {
        const filterValues = {...values};

        // TODO: remove after 2.4
        // Not used before refactoring
        // if (isEmpty(filterValues[this.recordId]) && this.bc.childs) {
        //     for (const child of this.bc.childs) {
        //         if (child.required === "true" && child.column) {
        //             filterValues[this.recordId] = filterValues[child.column];
        //             break;
        //         }
        //     }
        // }
        if (this.valuesStorageKey) {
            saveToStore(this.valuesStorageKey, filterValues);
        }
        this.values = filterValues;
    };

    resetValues = () => {
        this.values = {};

        if (this.valuesStorageKey) {
            removeFromStore(this.valuesStorageKey);
        }
    };

    handlePrint = async (isOnline: boolean, bcBtn: IBuilderConfig): Promise<boolean> => {
        const form = this.pageStore.forms.get(this.bc[VAR_RECORD_PAGE_OBJECT_ID]);

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
                        getglobaltostore: bcBtn.getglobaltostore,
                        globalValues: this.pageStore.globalValues,
                        values,
                    }),
                });

                if (isValidPrint) {
                    form.submit();
                }
            }
        }

        return Promise.resolve(true);
    };

    handleGlobals = (values: IRecord) => {
        const {setglobal, idproperty} = this.bc;

        if (setglobal && setglobal.length) {
            const globalValues: Record<string, FieldValue> = {};

            setglobal.forEach(({in: keyIn, out}) => {
                const [isExist, res] = deepFind(values, keyIn);

                globalValues[out] = isExist ? res : values[keyIn || idproperty || out];
            });

            this.pageStore.updateGlobalValues(globalValues);
        }
    };

    @action
    handleSubmit = async (values: IRecord, options?: IFormOptions) => {
        const parentStore = this.pageStore.stores.get(this.bc[VAR_RECORD_MASTER_ID] || this.bc[VAR_RECORD_PARENT_ID]);
        const form = this.pageStore.forms.get(this.bc[VAR_RECORD_PAGE_OBJECT_ID]);

        if (options && !options.redirect && form) {
            // Reset hidden field for not redirected search
            form.fields.forEach((field) => {
                if (field.hidden) {
                    field.reset();
                }
            });
            this.setValues(form.values);
            this.handleGlobals(form.values);
        } else {
            this.setValues(values);
            this.handleGlobals(values);
        }

        if (parentStore && parentStore.recordsStore) {
            await parentStore.recordsStore.searchAction(this.values, {
                ...options,
                formData: options.formData || form.isExistFile ? form.valuesFile : undefined,
            });
        }
        if (this.bc[VAR_RECORD_CL_IS_MASTER]) {
            const promises = [];

            this.pageStore.stores.forEach((store: IStoreBaseModel) => {
                if (store.bc && store.bc[VAR_RECORD_MASTER_ID] === this.bc[VAR_RECORD_PAGE_OBJECT_ID]) {
                    const promise = store.recordsStore?.searchAction(this.values, {
                        ...options,
                        formData: options.formData || form.isExistFile ? form.valuesFile : undefined,
                    });

                    if (promise) {
                        promises.push(promise);
                    }
                }
            });
            await Promise.all(promises);
        }
    };

    @action
    handleAutoload = async (isAutoload: boolean) => {
        const form = this.pageStore.forms.get(this.bc[VAR_RECORD_PAGE_OBJECT_ID]);
        const parentStore = this.pageStore.stores.get(this.bc[VAR_RECORD_PARENT_ID]);

        if (form && parentStore) {
            await awaitFormFilter(this.pageStore, form, false);
            await form.validate();

            if (form.isValid) {
                if (isAutoload) {
                    form.submit();
                } else {
                    this.handleSubmit(form.values, {
                        formData: form.isExistFile ? form.valuesFile : undefined,
                        noLoad: true,
                    });
                }
            } else if (!isAutoload) {
                form.resetValidation();
            }
        }
    };

    @action
    resetAction = async (form?: IForm) => {
        const parentStore = this.pageStore.stores.get(this.bc[VAR_RECORD_MASTER_ID] || this.bc[VAR_RECORD_PARENT_ID]);

        if (form) {
            form.reset();
        }

        this.resetValues();

        if (form && parentStore && parentStore.recordsStore) {
            parentStore.recordsStore.searchAction(form.values, {
                formData: form.isExistFile ? form.valuesFile : undefined,
                noLoad: true,
                reset: true,
            });
        }

        if (form && this.bc[VAR_RECORD_CL_IS_MASTER]) {
            const promises = [];

            this.pageStore.stores.forEach((store: IStoreBaseModel) => {
                if (store.bc && store.bc[VAR_RECORD_MASTER_ID] === this.bc[VAR_RECORD_PAGE_OBJECT_ID]) {
                    const promise = store.recordsStore?.searchAction(form.values, {
                        formData: form.isExistFile ? form.valuesFile : undefined,
                        noLoad: true,
                        reset: true,
                    });

                    if (promise) {
                        promises.push(promise);
                    }
                }
            });

            return Promise.all(promises).then(() => true);
        }

        if (form) {
            this.handleGlobals(form.values);
        }

        return Promise.resolve(true);
    };

    handlers: any = {
        /**
         * Call from parent store
         */
        onChangeValues: (mode: IBuilderMode, btnBc: IBuilderConfig, options: IHandlerOptions) => {
            const {record: values = {}} = options;

            this.handleGlobals(values);
            this.setValues(values);

            return Promise.resolve(true);
        },
        onFilterToggle: () => {
            this.isOpen = !this.isOpen;

            return Promise.resolve(true);
        },
        /**
         * Offline print. Result will be after delay.
         * Should be WebSocket notifictio after complete
         */
        onPrintHandleOffline: (mode: IBuilderMode, btnBc: IBuilderConfig) => this.handlePrint(false, btnBc),
        /**
         * Offline Print
         */
        onPrintHandleOnline: (mode: IBuilderMode, btnBc: IBuilderConfig) => this.handlePrint(true, btnBc),
        onReset: (mode: IBuilderMode, btnBc: IBuilderConfig, options: IHandlerOptions) => {
            const {form} = options;

            return this.resetAction(form);
        },
        onSearch: async () => {
            const parentStore = this.pageStore.stores.get(
                this.bc[VAR_RECORD_MASTER_ID] || this.bc[VAR_RECORD_PARENT_ID],
            );

            if (parentStore && parentStore.recordsStore) {
                await parentStore.recordsStore.loadRecordsAction({});
            }

            if (this.bc[VAR_RECORD_CL_IS_MASTER]) {
                const promises = [];

                this.pageStore.stores.forEach((store: IStoreBaseModel) => {
                    if (store.bc && store.bc[VAR_RECORD_MASTER_ID] === this.bc[VAR_RECORD_PAGE_OBJECT_ID]) {
                        const promise = store.recordsStore?.loadRecordsAction({});

                        if (promise) {
                            promises.push(promise);
                        }
                    }
                });
                await Promise.all(promises);
            }
        },
    };
}
