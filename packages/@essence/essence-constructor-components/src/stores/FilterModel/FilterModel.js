// @flow
import {extendObservable, action} from "mobx";
import forOwn from "lodash/forOwn";
import {saveToStore, removeFromStore} from "@essence-community/constructor-share/utils";
import {snackbarStore} from "@essence-community/constructor-share/models";
import {print} from "@essence-community/constructor-share/utils/download";
import {
    VAR_RECORD_PARENT_ID,
    VAR_RECORD_MASTER_ID,
    VAR_RECORD_PAGE_OBJECT_ID,
    VAR_RECORD_ROUTE_PAGE_ID,
} from "@essence-community/constructor-share/constants";
import {isEmpty} from "../../utils/base";
import {findSetKey} from "../../utils/findKey";
import {attachGlobalValues} from "../actions/saveAction";
import {type BuilderModeType} from "../../BuilderType";
import {StoreBaseModel} from "../StoreBaseModel";
import {type FilterModelType, type ConstructorConfigType, type FilterValues} from "./FilterModelType";

export class FilterModel extends StoreBaseModel implements FilterModelType {
    name = "filter";

    values: null | Object;

    form: ?IForm;

    valuesStorageKey: ?string;

    filterValues: Object;

    searched: boolean;

    isFormDirty: boolean;

    constructor({bc, pageStore}: ConstructorConfigType) {
        super({bc, pageStore});

        if (bc.filtervaluessave === "true" && pageStore.pageId) {
            this.valuesStorageKey = `${pageStore.pageId}_filter_${bc[VAR_RECORD_PAGE_OBJECT_ID]}`;
        }

        extendObservable(this, {
            get filterValues() {
                return this.values || {};
            },
            isFormDirty: false,
            searched: false,
            get selectedRecord() {
                return this.searched ? this.values : null;
            },
            values: null,
        });
    }

    setValues = (values: FilterValues): void => {
        const filterValues = {...values};

        if (isEmpty(filterValues[this.recordId]) && this.bc.childs) {
            for (const child of this.bc.childs) {
                if (child.required === "true") {
                    filterValues[this.recordId] = filterValues[child.column];
                    break;
                }
            }
        }

        if (this.valuesStorageKey) {
            setTimeout(() => saveToStore(this.valuesStorageKey, filterValues), 0);
        }

        this.values = filterValues;
    };

    resetValues = () => {
        this.values = null;

        if (this.valuesStorageKey) {
            removeFromStore(this.valuesStorageKey);
        }
    };

    setSearchedAction = action(
        "setSearchedAction",
        (searched: boolean, parentBc?: Object, fireSearch?: boolean): void => {
            this.searched = searched;

            if (fireSearch) {
                this.pageStore.stores.forEach((store) => {
                    if (
                        store.bc &&
                        store.bc[VAR_RECORD_MASTER_ID] === this.bc[VAR_RECORD_PAGE_OBJECT_ID] &&
                        (!parentBc || parentBc[VAR_RECORD_MASTER_ID] !== store.bc[VAR_RECORD_MASTER_ID])
                    ) {
                        store.reloadStoreAction();
                    }
                });
            }
        },
    );

    /**
     * Онлайн печать
     *
     * @param {BuilderModeType} mode Модификатор
     * @param {Object} bcBtn Конфиг кнопки
     *
     * @returns {undefined}
     */
    onPrintHandleOnline = (mode: BuilderModeType, bcBtn: Object) => this.handlePrint(true, bcBtn);

    /**
     * Отложенная печать
     *
     * @param {BuilderModeType} mode Модификатор
     * @param {Object} bcBtn Конфиг кнопки
     *
     * @returns {undefined}
     */
    onPrintHandleOffline = (mode: BuilderModeType, bcBtn: Object) => this.handlePrint(false, bcBtn);

    handlePrint = async (isOnline: boolean, bcBtn: Object) => {
        this.form && (await this.form.validate({showErrors: true}));
        const values = this.form && this.form.isValid && this.form.values;

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
                this.form && this.form.submit({});
            }
        }
    };

    onSetForm = (form: Object) => {
        this.form = form;
    };

    handleGlobals = (values: Object) => {
        const {setglobal} = this.bc;

        if (setglobal) {
            const globalValues = {};
            const keys = findSetKey(setglobal);

            forOwn(keys, (fieldName, globaleKey) => {
                globalValues[globaleKey] = values[fieldName];
            });

            this.pageStore.updateGlobalValues(globalValues);
        }
    };

    handleFormStatus = (value: boolean) => {
        this.isFormDirty = value;
    };

    handlers = {
        onReset: (mode: IBuilderMode, btnBc: IBuilderConfig, options: IHandlerOptions) => {
            const {form} = options;
            const parentBc = this.pageStore.stores.get(this.bc[VAR_RECORD_PARENT_ID])?.bc;

            if (form) {
                form.onReset();
            }

            this.resetValues();
            this.setSearchedAction(false, parentBc);

            return Promise.resolve();
        },
        onSearch: (mode: IBuilderMode, btnBc: IBuilderConfig, options: IHandlerOptions) => {
            const {form} = options;

            if (form && !form.submitting) {
                form.submit();
            }

            return Promise.resolve();
        },
    };
}
