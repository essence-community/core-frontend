/* eslint max-lines: ["error", 400]*/
// @flow
import {extendObservable, action} from "mobx";
import snakeCase from "lodash/snakeCase";
import {toSize, declension, camelCaseMemoized, i18next} from "@essence/essence-constructor-share/utils";
import {Field} from "mobx-react-form";
import {loggerRootInfo} from "../../constants";
import {isEmpty} from "../../utils/base";
import {RecordsModel, type RecordsModelType} from "../RecordsModel";
import {type PageModelType} from "../PageModel";
import {StoreBaseModel} from "../StoreBaseModel";
import {type ConstructorType, type TableFieldModelInterface, type TableFieldModelType} from "./TableFieldModelType";
import {prepareArrayValues} from "./TableFieldModelArrayActions";

const HEIGHT_GRID = 210;
const loggerInfo = loggerRootInfo.extend("TableFieldModel");

export type {TableFieldModelType};

const clearChildStores = ({pageStore, bc}: {pageStore: PageModelType, bc: Object}) => {
    pageStore.stores.forEach((store) => {
        if (store.bc && store.bc.ckMaster === bc.ckPageObject) {
            store.clearAction && store.clearAction();
        }
    });
};

export class TableFieldModel extends StoreBaseModel implements TableFieldModelInterface {
    recordsGridStore: RecordsModelType;

    selectedRecord: Object | null | void;

    recordsStore: RecordsModelType;

    builderConfigs: Array<Object>;

    openField: boolean;

    form: any;

    field: Field;

    gridBc: any;

    valueFields: ?Array<[string, string]>;

    valueField: string;

    displayField: string;

    column: string;

    selectedRecordValue: ?string;

    selectedEntries: Array<[string, Object]>;

    fieldHandlers: $PropertyType<ConstructorType, "fieldHandlers">;

    /* eslint max-statements: ["error", 14]*/
    constructor({bc, pageStore, form, field, fieldHandlers}: ConstructorType) {
        super({bc, pageStore});

        this.column = camelCaseMemoized(bc.column);
        this.valueField = camelCaseMemoized(bc.valuefield) || "ckId";

        if (bc.valuefield) {
            this.valueFields = bc.valuefield.split(",").map((key) => {
                const keys = key.split("=");
                const fieldKeyName = camelCaseMemoized(keys[1] || keys[0]);
                const valueField = camelCaseMemoized(keys[0]);

                if (fieldKeyName === this.column) {
                    this.valueField = valueField;
                }

                return [fieldKeyName, valueField];
            });
        }

        this.recordsStore = new RecordsModel(this.bc, this.pageStore, {valueField: this.valueField});
        this.form = form;
        this.field = field;
        this.displayField = camelCaseMemoized(bc.displayfield);
        this.fieldHandlers = fieldHandlers;

        extendObservable(
            this,
            {
                get displayText() {
                    if (bc.collectionvalues === "array") {
                        const selCount = this.selectedEntries.length;

                        return selCount
                            ? `${declension(selCount, [
                                  i18next.t("e28e56d7b12e4ea2b7663b3e66473b9e"),
                                  i18next.t("e28e56d7b12e4ea2b7663b3e66473b9e"),
                                  i18next.t("783922ac8cf84a5eac8d1b17c77de544"),
                              ])}  ${selCount} ${declension(selCount, [
                                  i18next.t("0cd9a67ed46d4d70959182cc6260b221"),
                                  i18next.t("87acd17f8ae243798e97549a5761cfaf"),
                                  i18next.t("2485088fda3d4d9cb5de9c25534cdf23"),
                              ])}`
                            : "";
                    }

                    if (this.selectedRecord) {
                        return this.selectedRecord[this.displayField];
                    }

                    return "";
                },
                openField: false,
                get recordsGridStore() {
                    const gridStore = this.pageStore.stores.get(this.gridBc.ckPageObject);

                    return gridStore && gridStore.recordsStore;
                },
                selectedEntries: [],
                get selectedRecord() {
                    return this.recordsStore.selectedRecord;
                },
                get selectedRecordValue() {
                    return this.selectedRecord ? this.selectedRecord[this.valueField] : "";
                },
            },
            undefined,
            {
                deep: false,
            },
        );

        this.builderConfigs = [
            {
                ckMaster: `grid_${this.bc.ckPageObject}`,
                ckPageObject: `btnok_${this.bc.ckPageObject}`,
                ckParent: this.bc.ckPageObject,
                cvDisplayed: "147bb56012624451971b35b1a4ef55e6",
                handlerFn: bc.collectionvalues === "array" ? this.selectArrayAction : this.selectAction,
                iconfont: "fa-check",
                iconfontname: "fa",
                onlyicon: "true",
                readonly: "false",
                reqsel: bc.collectionvalues === "array" ? undefined : "true",
                type: "BTN",
                uitype: "1",
            },
            {
                ckPageObject: `btnban_${this.bc.ckPageObject}`,
                ckParent: this.bc.ckPageObject,
                cvDisplayed: "64aacc431c4c4640b5f2c45def57cae9",
                handlerFn: this.closeAction,
                iconfont: "fa-ban",
                iconfontname: "fa",
                onlyicon: "true",
                readonly: "false",
                type: "BTN",
                uitype: "1",
            },
        ];

        // Блокировка происходит на уровне поля
        this.gridBc = {
            ...bc,
            ckPageObject: `grid_${bc.ckPageObject}`,
            clearonsearch: "false",
            datatype: undefined,
            disabled: undefined,
            disabledrules: undefined,
            getglobal: null,
            height:
                isEmpty(bc.pickerheight) && !isEmpty(bc.pagesize) ? undefined : toSize(bc.pickerheight, HEIGHT_GRID),
            hidden: undefined,
            hiddenrules: undefined,
            includeField: true,
            readonly: "false",
            reqsel: undefined,
            setglobal: null,
            topbtn: this.builderConfigs,
            type: bc.datatype === "tree" ? "TREEGRID" : "GRID",
        };
    }

    setDefaultRecordAction = action("setDefaultRecordAction", async (value: any) => {
        const filter = [
            {
                operator: "eq",
                property: snakeCase(this.valueField),
                value,
            },
        ];

        await this.recordsStore.searchAction({}, {filter, selectedRecordId: value});

        if (this.bc.collectionvalues === "array") {
            const records = prepareArrayValues(this, this.recordsStore.records);

            this.fieldHandlers.onChange(null, records);
            this.selectedEntries = this.recordsStore.records.map((record: Object) => [record.ckId, record]);
        } else if (this.recordsStore.selectedRecord) {
            this.handleChangeRecord(this.recordsStore.selectedRecord);
        }
    });

    selectArrayAction = action("seletctArrayAction", () => {
        const gridStore = this.pageStore.stores.get(this.gridBc.ckPageObject);

        if (gridStore) {
            this.fieldHandlers.onChange(null, prepareArrayValues(this, gridStore.selectedRecords));
            this.selectedEntries = [];
            gridStore.selectedRecords.forEach((value, key) => {
                this.selectedEntries.push([key, value]);
            });
        }

        this.openField = !this.openField;
    });

    selectAction = action("selectAction", () => {
        const record = this.recordsGridStore && this.recordsGridStore.selectedRecord;

        if (record) {
            this.handleChangeRecord(record, true);
        }

        this.openField = !this.openField;
    });

    openFieldAction = action("openFieldAction", () => {
        this.openField = !this.openField;
    });

    clearAction = action("clearAction", () => {
        const gridStore = this.pageStore.stores.get(this.gridBc.ckPageObject);

        if (gridStore) {
            gridStore.recordsStore.clearRecordsAction();

            if (this.bc.collectionvalues === "array") {
                gridStore.selectedRecords.clear();
            }
        }

        if (this.bc.collectionvalues === "array") {
            this.selectedEntries = [];
        }

        clearChildStores({bc: this.bc, pageStore: this.pageStore});
        // CORE-186 handleChangeRecord({}) не нужно вызывать, очистка полей происходит с помощью BuilderField

        this.recordsStore.clearRecordsAction();
    });

    closeAction = action("closeAction", () => {
        const gridStore = this.pageStore.stores.get(`grid_${this.bc.ckPageObject}`);

        if (gridStore && this.bc.collectionvalues === "array") {
            gridStore.selectedRecords.clear();
            this.selectedEntries.forEach(([key, value]) => {
                gridStore.selectedRecords.set(key, value);
            });
        }

        this.openField = !this.openField;
    });

    handleChangeRecord = (record: Object, userChange: boolean = false) => {
        let column: string = "";

        if (this.valueFields && this.valueFields.length > 1) {
            this.valueFields.forEach(([fieldName, valueFeild]) => {
                const value: string = record[valueFeild];

                if (!this.form.has(fieldName)) {
                    this.form.add({key: fieldName});
                }

                this.form.$(fieldName).set(value);

                if (fieldName === this.column) {
                    column = valueFeild;
                }
            });
        } else if (this.valueFields && this.valueFields.length) {
            column = this.valueField;
        } else {
            column = "ckId";
        }

        const value: mixed = record[column];

        if (userChange) {
            this.fieldHandlers.onChange(null, value);
        } else if (isEmpty(value)) {
            this.field.clear();
        } else {
            this.field.set(value);
        }
    };

    reloadStoreAction = action("reloadStoreAction", () => {
        loggerInfo(i18next.t("58715205c88c4d60aac6bfe2c3bfa516"));

        this.selectedEntries = [];
    });

    clearStoreAction = action("clearStoreAction", () => {
        this.recordsGridStore && this.recordsGridStore.clearChildsStoresAction();
        this.selectedEntries = [];
    });

    dbSelectAction = action("dbSelectAction", () => {
        const selectAction = this.bc.collectionvalues === "array" ? this.selectArrayAction : this.selectAction;

        return selectAction();
    });

    restoreSelectedAction = action("restoreSelectedAction", () => {
        const gridStore = this.pageStore.stores.get(this.gridBc.ckPageObject);

        if (gridStore) {
            this.selectedEntries.forEach(([key, value]) => {
                gridStore.selectedRecords.set(key, value);
            });

            if (this.bc.collectionvalues === "array") {
                gridStore.recordsStore.setRecordsAction(
                    this.selectedEntries.map((args) => ({...args[1], jnTotalCnt: 1})),
                );
            }
        }
    });
}
