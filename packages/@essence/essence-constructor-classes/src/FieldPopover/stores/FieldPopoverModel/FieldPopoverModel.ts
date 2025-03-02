/* eslint-disable max-lines */
import {
    deepChange,
    deepFind,
    i18next,
    isEmpty,
    parseMemoize,
    toString,
} from "@essence-community/constructor-share/utils";
import {
    VAR_RECORD_ID,
    VAR_RECORD_PARENT_ID,
    VAR_RECORD_MASTER_ID,
    VAR_RECORD_PAGE_OBJECT_ID,
    VAR_RECORD_DISPLAYED,
    VALUE_SELF_FIRST,
    loggerRoot,
    VAR_RECORD_NAME,
    VALUE_SELF_ALWAYSFIRST,
    VAR_RECORD_QUERY_ID,
} from "@essence-community/constructor-share/constants";
import {
    IPageModel,
    IBuilderConfig,
    IRecordsModel,
    IRecord,
    IStoreBaseModelProps,
    FieldValue,
    IHandlerOptions,
    IBuilderMode,
    IStoreBaseModel,
} from "@essence-community/constructor-share/types";
import {StoreBaseModel, RecordsModel} from "@essence-community/constructor-share/models";
// eslint-disable-next-line import/named
import {computed, observable, action} from "mobx";
import {IField, IForm} from "@essence-community/constructor-share/Form";
import {IFieldPopoverModel} from "./FieldPopoverModel.types";

interface IFieldPopoverModelProps extends IStoreBaseModelProps {
    field: IField;
    form: IForm;
}

const HEIGHT_GRID = "210px";
const loggerInfo = loggerRoot.extend("FieldPopoverModel");

const clearChildStores = ({pageStore, bc}: {pageStore: IPageModel; bc: IBuilderConfig}) => {
    pageStore.stores.forEach((store) => {
        if (store.bc && store.bc[VAR_RECORD_MASTER_ID] === bc[VAR_RECORD_PAGE_OBJECT_ID]) {
            store.clearStoreAction();
            store.clearAction && store.clearAction();

            if (store.recordsStore) {
                store.recordsStore.recordsAll = [];
                store.recordsStore.recordsState = {
                    isUserReload: false,
                    records: [],
                    status: "clear",
                };
            }
        }
    });
};

export class FieldPopoverModel extends StoreBaseModel implements IFieldPopoverModel {
    recordsStore: IRecordsModel;

    childBc: IBuilderConfig;

    valueFields: Array<[string, string]>;

    valueField: string;

    @observable
    field: IField;

    form: IForm;

    builderConfigs: IBuilderConfig[];

    @computed
    get childId(): string {
        return `popover_${
            this.field.parentFieldKey ? this.field.key.slice(this.field.parentFieldKey.length + 1).split(".")[0] : ""
        }_${this.bc[VAR_RECORD_PAGE_OBJECT_ID]}`;
    }

    @computed
    get currentId(): string {
        return `field_${
            this.field.parentFieldKey ? this.field.key.slice(this.field.parentFieldKey.length + 1).split(".")[0] : ""
        }_${this.bc[VAR_RECORD_PAGE_OBJECT_ID]}`;
    }

    constructor(props: IFieldPopoverModelProps) {
        super(props);

        this.field = props.field;
        this.form = props.form;
        this.valueField = this.bc.valuefield?.[0]?.in || this.bc.idproperty || VAR_RECORD_ID;
        const childId = this.childId;

        if (this.bc.valuefield && this.bc.valuefield.length) {
            let valueField = "";

            this.valueFields = this.bc.valuefield.map(({in: keyIn, out}) => {
                const fieldKeyName = out || keyIn;

                if (!valueField && (fieldKeyName === this.bc.column || !out)) {
                    valueField = keyIn;
                }

                return [fieldKeyName, keyIn];
            });
            if (valueField) {
                this.valueField = valueField;
            }
        } else {
            this.valueFields = [[this.bc.column, this.valueField]];
        }

        this.recordsStore = new RecordsModel(
            {...this.bc, defaultvalue: VALUE_SELF_ALWAYSFIRST},
            {
                applicationStore: this.pageStore.applicationStore,
                noLoadChilds: true,
                pageStore: this.pageStore,
                valueField: this.valueField,
            },
        );

        this.builderConfigs = [
            {
                [VAR_RECORD_DISPLAYED]: "static:147bb56012624451971b35b1a4ef55e6",
                [VAR_RECORD_MASTER_ID]: childId,
                [VAR_RECORD_NAME]: "Override Save Button",
                [VAR_RECORD_PAGE_OBJECT_ID]: `btnok_${this.bc[VAR_RECORD_PAGE_OBJECT_ID]}`,
                [VAR_RECORD_PARENT_ID]: this.currentId,
                handler: this.handleSelectAction,
                iconfont: "fa-check",
                iconfontname: "fa",
                onlyicon: true,
                readonly: false,
                reqsel: this.bc.collectionvalues === "array" ? undefined : true,
                type: "BTN",
                uitype: "11",
            },
            {
                [VAR_RECORD_DISPLAYED]: "static:64aacc431c4c4640b5f2c45def57cae9",
                [VAR_RECORD_NAME]: "Override Cancel Button",
                [VAR_RECORD_PAGE_OBJECT_ID]: `btnban_${this.bc[VAR_RECORD_PAGE_OBJECT_ID]}`,
                [VAR_RECORD_PARENT_ID]: this.currentId,
                confirmquestion: "false",
                handler: this.handleCloseAction,
                iconfont: "fa-ban",
                iconfontname: "fa",
                onlyicon: true,
                readonly: false,
                type: "BTN",
                uitype: "11",
            },
        ];

        // Блокировка происходит на уровне поля
        this.childBc = {
            ...this.bc,
            [VAR_RECORD_DISPLAYED]: undefined,
            [VAR_RECORD_PAGE_OBJECT_ID]: childId,
            [VAR_RECORD_PARENT_ID]: this.currentId,
            [VAR_RECORD_QUERY_ID]: undefined,
            childs: this.bc.childs?.map((childBc) => ({
                ...childBc,
                [VAR_RECORD_PAGE_OBJECT_ID]: this.field.parentFieldKey
                    ? `${childBc[VAR_RECORD_PAGE_OBJECT_ID]}_${
                          this.field.key.slice(this.field.parentFieldKey.length + 1).split(".")[0]
                      }`
                    : childBc[VAR_RECORD_PAGE_OBJECT_ID],
                [VAR_RECORD_PARENT_ID]: childId,
            })),
            datatype: undefined,
            disabled: undefined,
            disabledrules: undefined,
            editable: true,
            editing: true,
            editmodepanel: true,
            getglobal: undefined,
            height: this.bc.pickerheight === undefined ? undefined : this.bc.pickerheight ?? HEIGHT_GRID,
            hidden: undefined,
            hiddenrules: undefined,
            readonly: false,
            reqsel: undefined,
            setglobal: undefined,
            setrecordtoglobal: undefined,
            topbtn: this.builderConfigs,
            type: "PANEL",
        };
    }

    @computed get panelStore(): IStoreBaseModel | undefined {
        const panelStore = this.pageStore.stores.get(this.childId);

        return panelStore;
    }

    @computed get recordsPanelStore(): IRecordsModel | undefined {
        return this.pageStore?.recordsStore;
    }

    @computed get selectedRecord(): IRecord | undefined {
        return this.recordsStore.selectedRecord;
    }

    @computed get selectedRecordValue(): FieldValue {
        return this.selectedRecord ? deepFind(this.selectedRecord, this.valueField)[1] : undefined;
    }

    @action
    setField = (field: IField): void => {
        this.field = field;
    };

    @action
    restoreSelectedAction = (form: IForm): void => {
        form.update(this.selectedRecord || {});
    };

    @action
    setDefaultRecordAction = async (value?: FieldValue): Promise<void> => {
        const find = this.recordsStore.recordsState.records.find(
            (rec) => rec[this.valueField] === value || rec[this.recordsStore.recordId] === value,
        );

        if (!find) {
            await this.recordsStore.searchAction(
                {},
                value !== VALUE_SELF_FIRST
                    ? {
                          filter: [{operator: "eq", property: this.valueField, value}],
                          selectedRecordId: value as string,
                      }
                    : {},
            );
            if (this.recordsStore.selectedRecord) {
                this.handleChangeRecord(this.recordsStore.selectedRecord);
            }
        }
    };

    @action
    clearAction = (): void => {
        this.recordsPanelStore?.clearRecordsAction();

        clearChildStores({bc: this.bc, pageStore: this.pageStore});
        // CORE-186 handleChangeRecord({}) не нужно вызывать, очистка полей происходит с помощью BuilderField

        this.recordsStore.clearRecordsAction();
    };

    handleChangeRecord = (record: IRecord, userChange = false, isSilentClear = false): void => {
        let column = "";
        const patchValues: IRecord = {};

        if (this.valueFields && this.valueFields.length > 1) {
            let parentKey = "";

            if (this.field.key.indexOf(".") > -1) {
                const arrKey = this.field.key.split(".");

                parentKey = arrKey.slice(0, arrKey.length - 1).join(".");
            }

            this.valueFields.forEach(([fieldName, valueField]) => {
                deepChange(
                    patchValues,
                    `${parentKey ? `${parentKey}.` : ""}${fieldName}`,
                    deepFind(record, valueField)[1],
                );

                if (fieldName === this.bc.column) {
                    column = valueField;
                }
            });
        } else if (this.valueFields && this.valueFields.length) {
            column = this.valueField;
        } else {
            column = this.recordsStore.recordId || VAR_RECORD_ID;
        }

        const value: FieldValue = deepFind(record, column)[1];

        if (userChange) {
            this.field.onChange(value);
            this.form.patch(patchValues, true);
        } else if (isEmpty(value) && !isSilentClear) {
            this.field.onClear();
        } else if (isEmpty(value) && isSilentClear) {
            this.field.clear();
        } else if (this.field.value !== value) {
            this.field.onChange(value);
            this.form.patch(patchValues, true);
        }
    };

    @action
    reloadStoreAction = async (): Promise<IRecord | undefined> => {
        loggerInfo(i18next.t("static:58715205c88c4d60aac6bfe2c3bfa516"));

        if (!this.recordsStore.isLoading) {
            const selectedRecordId = this.recordsStore.selectedRecordValues[this.recordsStore.recordId];

            const res = await this.recordsStore.loadRecordsAction({
                selectedRecordId:
                    selectedRecordId === null || typeof selectedRecordId === "object"
                        ? undefined
                        : (selectedRecordId as "string" | "number"),
            });

            if (
                selectedRecordId != this.recordsStore.selectedRecordValues[this.recordsStore.recordId] &&
                this.bc.defaultvalue !== VALUE_SELF_FIRST &&
                this.bc.defaultvalue !== VALUE_SELF_ALWAYSFIRST
            ) {
                this.field.onClear();
            }

            if (
                this.recordsStore.recordsState.records.length &&
                (this.bc.defaultvalue === VALUE_SELF_FIRST || this.bc.defaultvalue === VALUE_SELF_ALWAYSFIRST)
            ) {
                const id = this.recordsStore.recordsState.records[0][this.recordsStore.recordId];

                this.recordsStore.setSelectionAction(id);
                this.handleChangeRecord(this.recordsStore.recordsState.records[0]);
            }

            return res;
        }

        return Promise.resolve(undefined);
    };

    @action
    clearStoreAction = (): void => {
        this.recordsPanelStore?.clearChildsStoresAction();
        this.handleChangeRecord({}, false, true);
        this.field.clear();
    };

    @action
    handleSelectAction = (
        mode: IBuilderMode,
        btnBc: IBuilderConfig,
        {popoverCtx, form}: IHandlerOptions,
    ): Promise<boolean> => {
        const record = form.values;

        form.validate();

        if (form.isValid && record) {
            this.recordsStore.setRecordsAction([record]);
            this.recordsStore.setSelectionAction(record[this.recordsStore.recordId]);
            this.handleChangeRecord(record, true);
            popoverCtx.onClose();
        }

        return Promise.resolve(true);
    };

    @action
    handleCloseAction = (
        mode: IBuilderMode,
        btnBc: IBuilderConfig,
        {popoverCtx}: IHandlerOptions,
    ): Promise<boolean> => {
        if (popoverCtx) {
            popoverCtx.onClose();
        }

        return Promise.resolve(true);
    };

    handlers = {
        onCloseAction: this.handleCloseAction,
        onSelectAction: this.handleSelectAction,
    };

    getLabel = (record: IRecord): string => {
        const [isExistDisplay, display] = deepFind(record, this.bc.displayfield);
        const label = isExistDisplay
            ? this.bc.localization
                ? i18next.t(toString(display), {ns: this.bc.localization})
                : toString(display)
            : (parseMemoize(this.bc.displayfield).runer({
                  get: (name: string) => {
                      return this.bc.localization
                          ? i18next.t(toString(record[name] || ""), {ns: this.bc.localization})
                          : toString(record[name] || "");
                  },
              }) as string) || toString(record[this.bc.displayfield]);

        return label;
    };
}
