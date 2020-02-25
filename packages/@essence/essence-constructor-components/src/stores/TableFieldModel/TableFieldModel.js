/* eslint max-lines: ["error", 400]*/
// @flow
import {extendObservable, action} from "mobx";
import snakeCase from "lodash/snakeCase";
import {toSize, declension, i18next} from "@essence-community/constructor-share/utils";
import {
    VAR_RECORD_ID,
    VAR_RECORD_PARENT_ID,
    VAR_RECORD_MASTER_ID,
    VAR_RECORD_PAGE_OBJECT_ID,
    VAR_RECORD_DISPLAYED,
    VAR_RECORD_JN_TOTAL_CNT,
} from "@essence-community/constructor-share/constants";
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
        if (store.bc && store.bc[VAR_RECORD_MASTER_ID] === bc[VAR_RECORD_PAGE_OBJECT_ID]) {
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

    // eslint-disable-next-line max-lines-per-function, max-statements
    constructor({bc, pageStore, form, field, fieldHandlers}: ConstructorType) {
        super({bc, pageStore});

        this.column = bc.column;
        this.valueField = bc.valuefield || bc.idproperty || VAR_RECORD_ID;

        if (bc.valuefield) {
            this.valueFields = bc.valuefield.split(",").map((key) => {
                const keys = key.split("=");
                const fieldKeyName = keys[1] || keys[0];
                const [valueField] = keys;

                if (fieldKeyName === this.column) {
                    this.valueField = valueField;
                }

                return [fieldKeyName, valueField];
            });
        }

        this.recordsStore = new RecordsModel(this.bc, this.pageStore, {valueField: this.valueField});
        this.form = form;
        this.field = field;
        this.displayField = bc.displayfield;
        this.fieldHandlers = fieldHandlers;

        extendObservable(
            this,
            {
                get displayText() {
                    if (bc.collectionvalues === "array") {
                        const selCount = this.selectedEntries.length;

                        return selCount
                            ? `${declension(selCount, [
                                  i18next.t("static:e28e56d7b12e4ea2b7663b3e66473b9e"),
                                  i18next.t("static:783922ac8cf84a5eac8d1b17c77de544"),
                                  i18next.t("static:783922ac8cf84a5eac8d1b17c77de544"),
                              ])}  ${selCount} ${declension(selCount, [
                                  i18next.t("static:0cd9a67ed46d4d70959182cc6260b221"),
                                  i18next.t("static:87acd17f8ae243798e97549a5761cfaf"),
                                  i18next.t("static:2485088fda3d4d9cb5de9c25534cdf23"),
                              ])}`
                            : "";
                    }

                    if (this.selectedRecord) {
                        const label = this.selectedRecord[this.displayField];

                        if (bc.localization && label) {
                            return i18next.t(`${bc.localization}:${label}`, label);
                        }

                        return label;
                    }

                    return "";
                },
                openField: false,
                get recordsGridStore() {
                    const gridStore = this.pageStore.stores.get(this.gridBc[VAR_RECORD_PAGE_OBJECT_ID]);

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
                [VAR_RECORD_DISPLAYED]: "static:147bb56012624451971b35b1a4ef55e6",
                [VAR_RECORD_MASTER_ID]: `grid_${this.bc[VAR_RECORD_PAGE_OBJECT_ID]}`,
                [VAR_RECORD_PAGE_OBJECT_ID]: `btnok_${this.bc[VAR_RECORD_PAGE_OBJECT_ID]}`,
                [VAR_RECORD_PARENT_ID]: this.bc[VAR_RECORD_PAGE_OBJECT_ID],
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
                [VAR_RECORD_DISPLAYED]: "static:64aacc431c4c4640b5f2c45def57cae9",
                [VAR_RECORD_PAGE_OBJECT_ID]: `btnban_${this.bc[VAR_RECORD_PAGE_OBJECT_ID]}`,
                [VAR_RECORD_PARENT_ID]: this.bc[VAR_RECORD_PAGE_OBJECT_ID],
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
            [VAR_RECORD_PAGE_OBJECT_ID]: `grid_${bc[VAR_RECORD_PAGE_OBJECT_ID]}`,
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
            setrecordtoglobal: undefined,
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
            const records = prepareArrayValues(this, this.recordsStore.records, this.recordsStore.recordId);

            this.fieldHandlers.onChange(null, records);
            this.selectedEntries = this.recordsStore.records.map((record: Object) => [
                record[this.recordsStore.recordId],
                record,
            ]);
        } else if (this.recordsStore.selectedRecord) {
            this.handleChangeRecord(this.recordsStore.selectedRecord);
        }
        this.setRecordToGlobal();
    });

    setRecordToGlobal = () => {
        if (this.bc.setrecordtoglobal) {
            this.pageStore.updateGlobalValues({
                [this.bc.setrecordtoglobal]:
                    this.bc.collectionvalues === "array"
                        ? this.selectedEntries.map((val) => val[1])
                        : this.recordsStore.selectedRecord || null,
            });
        }
    };

    selectArrayAction = action("selectArrayAction", () => {
        const gridStore = this.pageStore.stores.get(this.gridBc[VAR_RECORD_PAGE_OBJECT_ID]);

        if (gridStore) {
            this.fieldHandlers.onChange(
                null,
                prepareArrayValues(this, gridStore.selectedRecords, this.recordsStore.recordId),
            );
            this.selectedEntries = [];
            gridStore.selectedRecords.forEach((value, key) => {
                this.selectedEntries.push([key, value]);
            });
            this.setRecordToGlobal();
        }

        this.openField = !this.openField;
    });

    selectAction = action("selectAction", () => {
        const record = this.recordsGridStore && this.recordsGridStore.selectedRecord;

        if (record) {
            this.handleChangeRecord(record, true);
        }

        this.setRecordToGlobal();
        this.openField = !this.openField;
    });

    openFieldAction = action("openFieldAction", () => {
        this.openField = !this.openField;
    });

    // eslint-disable-next-line max-statements
    clearAction = action("clearAction", () => {
        const gridStore = this.pageStore.stores.get(this.gridBc[VAR_RECORD_PAGE_OBJECT_ID]);

        if (gridStore) {
            gridStore.recordsStore.clearRecordsAction();

            if (this.bc.collectionvalues === "array") {
                gridStore.selectedRecords.clear();
            }
        }

        if (this.bc.collectionvalues === "array") {
            this.selectedEntries = [];
        }

        this.setRecordToGlobal();

        clearChildStores({bc: this.bc, pageStore: this.pageStore});
        // CORE-186 handleChangeRecord({}) не нужно вызывать, очистка полей происходит с помощью BuilderField

        this.recordsStore.clearRecordsAction();
    });

    closeAction = action("closeAction", () => {
        const gridStore = this.pageStore.stores.get(`grid_${this.bc[VAR_RECORD_PAGE_OBJECT_ID]}`);

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
            column = this.recordsStore.recordId || VAR_RECORD_ID;
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
        loggerInfo(i18next.t("static:58715205c88c4d60aac6bfe2c3bfa516"));

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
        const gridStore = this.pageStore.stores.get(this.gridBc[VAR_RECORD_PAGE_OBJECT_ID]);

        if (gridStore) {
            this.selectedEntries.forEach(([key, value]) => {
                gridStore.selectedRecords.set(key, value);
            });

            if (this.bc.collectionvalues === "array") {
                gridStore.recordsStore.setRecordsAction(
                    this.selectedEntries.map((args) => ({...args[1], [VAR_RECORD_JN_TOTAL_CNT]: 1})),
                );
            }
        }
    });
}
