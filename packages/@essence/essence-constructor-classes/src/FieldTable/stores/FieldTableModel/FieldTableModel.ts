/* eslint-disable max-lines */
import {toSize, i18next, isEmpty} from "@essence-community/constructor-share/utils";
import {
    VAR_RECORD_ID,
    VAR_RECORD_PARENT_ID,
    VAR_RECORD_MASTER_ID,
    VAR_RECORD_PAGE_OBJECT_ID,
    VAR_RECORD_DISPLAYED,
    VAR_RECORD_JN_TOTAL_CNT,
    loggerRoot,
    VAR_RECORD_NAME,
} from "@essence-community/constructor-share/constants";
import {
    IPageModel,
    IBuilderConfig,
    IRecordsModel,
    IRecord,
    IStoreBaseModelProps,
    FieldValue,
    ICkId,
    IHandlerOptions,
    IBuilderMode,
} from "@essence-community/constructor-share/types";
import {StoreBaseModel, RecordsModel} from "@essence-community/constructor-share/models";
// eslint-disable-next-line import/named
import {computed, observable, action, IObservableArray} from "mobx";
import {IField, IForm} from "@essence-community/constructor-share/Form";
import {prepareArrayValues} from "../../utils";
import {IFieldTableModel} from "./FieldTableModel.types";

interface IFieldTableModelProps extends IStoreBaseModelProps {
    field: IField;
    form: IForm;
}

const HEIGHT_GRID = 210;
const loggerInfo = loggerRoot.extend("FieldTableModel");

const clearChildStores = ({pageStore, bc}: {pageStore: IPageModel; bc: IBuilderConfig}) => {
    pageStore.stores.forEach((store) => {
        if (store.bc && store.bc[VAR_RECORD_MASTER_ID] === bc[VAR_RECORD_PAGE_OBJECT_ID]) {
            store.clearAction && store.clearAction();
        }
    });
};

export class FieldTableModel extends StoreBaseModel implements IFieldTableModel {
    recordsStore: IRecordsModel;

    gridBc: IBuilderConfig;

    valueFields: Array<[string, string]>;

    valueField: string;

    field: IField;

    form: IForm;

    builderConfigs: IBuilderConfig[];

    constructor(props: IFieldTableModelProps) {
        super(props);

        const gridId = `grid_${this.bc[VAR_RECORD_PAGE_OBJECT_ID]}`;

        this.field = props.field;
        this.form = props.form;
        this.valueField = this.bc.valuefield || this.bc.idproperty || VAR_RECORD_ID;

        if (this.bc.valuefield) {
            this.valueFields = this.bc.valuefield.split(",").map((key) => {
                const keys = key.split("=");
                const fieldKeyName = keys[1] || keys[0];
                const [valueField] = keys;

                if (fieldKeyName === this.bc.column) {
                    this.valueField = valueField;
                }

                return [fieldKeyName, valueField];
            });
        }

        this.recordsStore = new RecordsModel(this.bc, {
            applicationStore: this.pageStore.applicationStore,
            pageStore: this.pageStore,
            valueField: this.valueField,
        });

        this.builderConfigs = [
            {
                [VAR_RECORD_DISPLAYED]: "static:147bb56012624451971b35b1a4ef55e6",
                [VAR_RECORD_MASTER_ID]: gridId,
                [VAR_RECORD_NAME]: "select",
                [VAR_RECORD_PAGE_OBJECT_ID]: `btnok_${this.bc[VAR_RECORD_PAGE_OBJECT_ID]}`,
                [VAR_RECORD_PARENT_ID]: this.bc[VAR_RECORD_PAGE_OBJECT_ID],
                handler: this.bc.collectionvalues === "array" ? "onSelectArrayAction" : "onSelectAction",
                iconfont: "fa-check",
                iconfontname: "fa",
                onlyicon: "true",
                readonly: "false",
                reqsel: this.bc.collectionvalues === "array" ? undefined : "true",
                type: "BTN",
                uitype: "11",
            },
            {
                [VAR_RECORD_DISPLAYED]: "static:64aacc431c4c4640b5f2c45def57cae9",
                [VAR_RECORD_NAME]: "close",
                [VAR_RECORD_PAGE_OBJECT_ID]: `btnban_${this.bc[VAR_RECORD_PAGE_OBJECT_ID]}`,
                [VAR_RECORD_PARENT_ID]: this.bc[VAR_RECORD_PAGE_OBJECT_ID],
                handler: "onCloseAction",
                iconfont: "fa-ban",
                iconfontname: "fa",
                onlyicon: "true",
                readonly: "false",
                type: "BTN",
                uitype: "11",
            },
        ];

        // Блокировка происходит на уровне поля
        this.gridBc = {
            ...this.bc,
            [VAR_RECORD_PAGE_OBJECT_ID]: gridId,
            [VAR_RECORD_PARENT_ID]: this.bc[VAR_RECORD_PAGE_OBJECT_ID],
            columns: this.bc.columns?.map((column) => ({...column, [VAR_RECORD_PARENT_ID]: gridId})),
            // Clearonsearch: "false",
            datatype: undefined,
            disabled: undefined,
            disabledrules: undefined,
            getglobal: undefined,
            height:
                isEmpty(this.bc.pickerheight) && !isEmpty(this.bc.pagesize)
                    ? undefined
                    : String(toSize(this.bc.pickerheight, HEIGHT_GRID)),
            hidden: undefined,
            hiddenrules: undefined,
            readonly: "false",
            reqsel: undefined,
            setglobal: undefined,
            setrecordtoglobal: undefined,
            topbtn: this.builderConfigs,
            type: this.bc.datatype === "tree" ? "TREEGRID" : "GRID",
        };
    }

    @observable selectedEntries: IObservableArray<[ICkId, IRecord]> = observable.array([], {deep: false});

    @computed get recordsGridStore(): IRecordsModel | undefined {
        const gridStore = this.pageStore.stores.get(this.gridBc[VAR_RECORD_PAGE_OBJECT_ID]);

        return gridStore && gridStore.recordsStore;
    }

    @computed get selectedRecord(): IRecord | undefined {
        return this.recordsStore.selectedRecord;
    }

    @computed get selectedRecordValue(): FieldValue {
        return this.selectedRecord ? this.selectedRecord[this.valueField] : "";
    }

    @action
    setDefaultRecordAction = async (value?: FieldValue) => {
        const filter = [
            {
                operator: "eq",
                property: this.valueField,
                value,
            },
        ];

        await this.recordsStore.searchAction(
            {},
            {
                filter,
                selectedRecordId: value as string,
            },
        );

        if (this.bc.collectionvalues === "array") {
            const records = prepareArrayValues(this, this.recordsStore.records, this.recordsStore.recordId);

            this.field.onChange(records);
            this.selectedEntries.replace(
                this.recordsStore.records.map((record) => [record[this.recordsStore.recordId] as string, record]),
            );
        } else if (this.recordsStore.selectedRecord) {
            this.handleChangeRecord(this.recordsStore.selectedRecord);
        }
        this.setRecordToGlobal();
    };

    @action
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

    @action
    clearAction = () => {
        const gridStore = this.pageStore.stores.get(this.gridBc[VAR_RECORD_PAGE_OBJECT_ID]);

        if (gridStore && gridStore.recordsStore) {
            gridStore.recordsStore.clearRecordsAction();

            if (this.bc.collectionvalues === "array") {
                gridStore.recordsStore.selectedRecords.clear();
            }
        }

        if (this.bc.collectionvalues === "array") {
            this.selectedEntries.clear();
        }

        this.setRecordToGlobal();

        clearChildStores({bc: this.bc, pageStore: this.pageStore});
        // CORE-186 handleChangeRecord({}) не нужно вызывать, очистка полей происходит с помощью BuilderField

        this.recordsStore.clearRecordsAction();
    };

    handleChangeRecord = (record: IRecord, userChange = false) => {
        let column = "";

        if (this.valueFields && this.valueFields.length > 1) {
            const patchValues: IRecord = {};

            this.valueFields.forEach(([fieldName, valueFeild]) => {
                patchValues[fieldName] = record[valueFeild];

                if (fieldName === this.bc.column) {
                    column = valueFeild;
                }
            });

            this.form.patch(patchValues);
        } else if (this.valueFields && this.valueFields.length) {
            column = this.valueField;
        } else {
            column = this.recordsStore.recordId || VAR_RECORD_ID;
        }

        const value: FieldValue = record[column];

        if (userChange) {
            this.field.onChange(value);
        } else if (isEmpty(value)) {
            this.field.clear();
        } else {
            this.field.onChange(value);
        }
    };

    @action
    reloadStoreAction = () => {
        loggerInfo(i18next.t("static:58715205c88c4d60aac6bfe2c3bfa516"));

        this.selectedEntries.clear();

        return Promise.resolve(undefined);
    };

    @action
    clearStoreAction = () => {
        this.recordsGridStore && this.recordsGridStore.clearChildsStoresAction();
        this.selectedEntries.clear();
    };

    @action
    restoreSelectedAction = () => {
        const recordsStore = this.pageStore.stores.get(this.gridBc[VAR_RECORD_PAGE_OBJECT_ID])?.recordsStore;

        if (recordsStore) {
            this.selectedEntries.forEach(([key, value]) => {
                recordsStore.selectedRecords.set(key, value);
            });

            if (this.bc.collectionvalues === "array") {
                recordsStore.setRecordsAction(
                    this.selectedEntries.map((args) => ({...args[1], [VAR_RECORD_JN_TOTAL_CNT]: 1})),
                );
            }
        }
    };

    @action
    handleSelectArrayAction = (mode: IBuilderMode, btnBc: IBuilderConfig, {popoverCtx}: IHandlerOptions) => {
        const gridStore = this.pageStore.stores.get(this.gridBc[VAR_RECORD_PAGE_OBJECT_ID]);

        if (gridStore && gridStore.recordsStore) {
            this.field.onChange(
                prepareArrayValues(this, gridStore.recordsStore.selectedRecords, this.recordsStore.recordId),
            );
            this.selectedEntries.clear();
            gridStore.recordsStore.selectedRecords.forEach((value, key) => {
                this.selectedEntries.push([key, value]);
            });
            this.setRecordToGlobal();
        }

        if (popoverCtx) {
            popoverCtx.onClose();
        }

        return Promise.resolve(true);
    };

    @action
    handleSelectAction = (mode: IBuilderMode, btnBc: IBuilderConfig, {popoverCtx}: IHandlerOptions) => {
        const record = this.recordsGridStore && this.recordsGridStore.selectedRecord;

        if (record) {
            this.handleChangeRecord(record, true);
        }

        this.setRecordToGlobal();

        if (popoverCtx) {
            popoverCtx.onClose();
        }

        return Promise.resolve(true);
    };

    @action
    handleCloseAction = (mode: IBuilderMode, btnBc: IBuilderConfig, {popoverCtx}: IHandlerOptions) => {
        const recordsStore = this.pageStore.stores.get(`grid_${this.bc[VAR_RECORD_PAGE_OBJECT_ID]}`)?.recordsStore;

        if (recordsStore && this.bc.collectionvalues === "array") {
            recordsStore.selectedRecords.clear();
            this.selectedEntries.forEach(([key, value]) => {
                recordsStore.selectedRecords.set(key, value);
            });
        }

        if (popoverCtx) {
            popoverCtx.onClose();
        }

        return Promise.resolve(true);
    };

    handleDbSelectAction = (mode: IBuilderMode, btnBc: IBuilderConfig, options: IHandlerOptions) => {
        const selectAction =
            this.bc.collectionvalues === "array" ? this.handleSelectArrayAction : this.handleSelectAction;

        return selectAction(mode, btnBc, options);
    };

    handlers = {
        onCloseAction: this.handleCloseAction,
        onDoubleClick: this.handleDbSelectAction,
        onSelectAction: this.handleSelectAction,
        onSelectArrayAction: this.handleSelectArrayAction,
    };
}
