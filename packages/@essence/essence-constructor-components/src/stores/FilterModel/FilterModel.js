// @flow
import {extendObservable, action} from "mobx";
import {type Form, type Field} from "mobx-react-form";
import camelCase from "lodash/camelCase";
import forOwn from "lodash/forOwn";
import {saveToStore, removeFromStore} from "@essence/essence-constructor-share/utils";
import {print} from "@essence/essence-constructor-share/utils/download";
import {isEmpty} from "../../utils/base";
import {findSetKey} from "../../utils/findKey";
import {attachGlobalValues} from "../actions/saveAction";
import {type BuilderModeType} from "../../BuilderType";
import {StoreBaseModel} from "../StoreBaseModel";
import {type FilterModelType, type ConstructorConfigType, type FilterValues} from "./FilterModelType";

type MobxFormType = Form & Field;

export class FilterModel extends StoreBaseModel implements FilterModelType {
    name = "filter";

    values: null | Object;

    form: ?MobxFormType;

    valuesStorageKey: ?string;

    filterValues: Object;

    searched: boolean;

    isFormDirty: boolean;

    constructor({bc, pageStore}: ConstructorConfigType) {
        super({bc, pageStore});

        if (bc.filtervaluessave === "true" && pageStore.ckPage) {
            this.valuesStorageKey = `${pageStore.ckPage}_filter_${bc.ckPageObject}`;
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

        if (isEmpty(filterValues.ckId)) {
            for (const child of this.bc.childs) {
                if (child.required === "true") {
                    filterValues.ckId = filterValues[camelCase(child.column)];
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
                        store.bc.ckMaster === this.bc.ckPageObject &&
                        (!parentBc || parentBc.ckMaster !== store.bc.ckMaster)
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
        const values = this.form && this.form.isValid && this.form.values();

        if (values) {
            const isValidPrint = await print({
                bc: this.bc,
                bcBtn,
                isOnline,
                pageStore: this.pageStore,
                reloadPageObject: {
                    ckPage: this.pageStore.ckPage,
                    ckPageObject: this.bc.ckMaster || this.bc.ckParent,
                },
                session: this.pageStore.applicationStore.session,
                snackbarStore: this.pageStore.applicationStore.snackbarStore,
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
}
