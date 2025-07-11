import {action, makeObservable} from "mobx";
import {
    VAR_RECORD_PAGE_OBJECT_ID,
    VAR_RECORD_OBJECT_ID,
    VAR_RECORD_NAME,
} from "@essence-community/constructor-share/constants";
import {mapValueToArray} from "@essence-community/constructor-share/utils";
import {StoreBaseModel} from "@essence-community/constructor-share/models/StoreBaseModel";
import {saveAction} from "@essence-community/constructor-share/actions/saveAction";
import {
    IBuilderConfig,
    IBuilderMode,
    IStoreBaseModel,
    IRecord,
} from "@essence-community/constructor-share/types";
import {IField} from "@essence-community/constructor-share/Form";
import {
    IFieldItemSelectorModel,
    IChildGridBuildConfig,
    IFieldItemSelectorModelProps,
} from "./FieldItemSelectorModel.types";

function getSelectionRecords(gridStore: IStoreBaseModel): IRecord[] {
    if (gridStore.bc.selmode === "MULTI" || gridStore.bc.collectionvalues === "array") {
        return mapValueToArray(gridStore.recordsStore?.selectedRecords);
    }

    return gridStore.recordsStore?.selectedRecord ? [gridStore.recordsStore?.selectedRecord] : [];
}

export class FieldItemSelectorModel extends StoreBaseModel implements IFieldItemSelectorModel {
    public fieldFrom: IBuilderConfig;

    public fieldTo: IBuilderConfig;

    public field: IField;

    private isLocal: boolean;

    public fieldName: string;

    constructor(props: IFieldItemSelectorModelProps) {
        super(props);

        this.field = props.field;

        this.isLocal = props.bc.querymode === "local";

        this.fieldName = props.bc.valuefield && props.bc.valuefield.length > 0 ?
            props.bc.valuefield[0].in : props.bc.column || this.recordId;

        const [fieldFrom, fieldTo] = this.bc.childs || [];

        this.fieldFrom = {
            height: this.bc.height,
            selmode: "MULTI",
            ...fieldFrom,
        };

        this.fieldTo = {
            height: this.bc.height,
            selmode: "MULTI",
            ...fieldTo,
        };
        makeObservable(this);
    }

    public getStores = ({fieldFrom, fieldTo}: IChildGridBuildConfig): [IStoreBaseModel?, IStoreBaseModel?] => [
        this.pageStore.stores.get(fieldFrom[VAR_RECORD_PAGE_OBJECT_ID]),
        this.pageStore.stores.get(fieldTo[VAR_RECORD_PAGE_OBJECT_ID]),
    ];

    @action
    private saveAction = (values: IRecord[], mode: IBuilderMode, btnBc: IBuilderConfig): Promise<boolean> => {
        return saveAction.call(this, values, mode, {
            actionBc: {
                ...btnBc,
                [VAR_RECORD_NAME]: `${this.bc[VAR_RECORD_NAME]}_button`,
                [VAR_RECORD_OBJECT_ID]: `${this.bc[VAR_RECORD_OBJECT_ID]}_button`,
                [VAR_RECORD_PAGE_OBJECT_ID]: `${this.bc[VAR_RECORD_PAGE_OBJECT_ID]}_button`,
            },
            bc: this.bc,
            noReload: this.bc.reloadmaster ? false : true,
            pageStore: this.pageStore,
            query: this.bc.updatequery,
            recordId: this.recordId,
        });
    };

    @action
    public applySaveAction = (fromStore: IStoreBaseModel, toStore: IStoreBaseModel, recs: IRecord[]) => {
        if (fromStore.bc.winreloadstores) {
            fromStore.clearStoreAction();
            fromStore.recordsStore!.loadRecordsAction();
        } else {
            fromStore.recordsStore!.setSelectionsAction([]);
            fromStore.recordsStore!.setSelectionAction();
            fromStore.recordsStore!.removeRecordsAction(recs, this.fieldName);
        }
        if (toStore.bc.winreloadstores) {
            toStore.clearStoreAction();
            toStore.recordsStore!.loadRecordsAction();
        } else {
            toStore.recordsStore!.setSelectionsAction([]);
            toStore.recordsStore!.setSelectionAction();
            toStore.recordsStore!.addRecordsAction(recs);
            toStore.recordsStore!.sortRecordsAction();
        }
    };

    @action
    public async moveRecSaveAction(
        mode: IBuilderMode,
        fields: IChildGridBuildConfig,
        isAll: boolean,
        btnBc: IBuilderConfig,
    ): Promise<boolean> {
        const [fromStore, toStore] = this.getStores(fields);

        if (!fromStore || !toStore) {
            return false;
        }

        const recs = isAll ? fromStore.recordsStore?.records || [] : getSelectionRecords(fromStore);
        const saveStatus = this.isLocal ? true : await this.saveAction(recs, mode, btnBc);
        const currentValue = this.field.value as any as {I: IRecord[]; D: IRecord[]};
        let I = currentValue.I || [];
        let D = currentValue.D || [];

        if (mode === "1") {
            const isOld = D
                .some((item) => recs
                    .some((v) => v[fromStore.recordsStore.recordId] === item[fromStore.recordsStore.recordId]));

            I = isOld ? I : [
                ...I.filter((item) => !recs
                    .some((v) => v[fromStore.recordsStore.recordId] === item[fromStore.recordsStore.recordId])),
                ...recs,
            ];
            D = D.filter((item) => !recs
                .some((v) => v[fromStore.recordsStore.recordId] === item[fromStore.recordsStore.recordId]));
        } else {
            const isOld = I
                .some((item) => recs
                    .some((v) => v[fromStore.recordsStore.recordId] === item[fromStore.recordsStore.recordId]));

            D = isOld ? D : [
                ...D.filter((item) => !recs
                    .some((v) => v[fromStore.recordsStore.recordId] === item[fromStore.recordsStore.recordId])),
                ...recs,
            ];
            I = I.filter((item) => !recs
                .some((v) => v[fromStore.recordsStore.recordId] === item[fromStore.recordsStore.recordId]));
        }

        this.field.setValue({
            D,
            I,
        });
        if (saveStatus) {
            this.applySaveAction(fromStore, toStore, recs);
        }

        return saveStatus;
    }

    handlers = {
        addAll: (_mode: any, btnBc: IBuilderConfig) =>
            this.moveRecSaveAction("1", {fieldFrom: this.fieldFrom, fieldTo: this.fieldTo}, true, btnBc),
        addSelected: (_mode: any, btnBc: IBuilderConfig) =>
            this.moveRecSaveAction("1", {fieldFrom: this.fieldFrom, fieldTo: this.fieldTo}, false, btnBc),
        removeSelected: (_mode: any, btnBc: IBuilderConfig) =>
            this.moveRecSaveAction("3", {fieldFrom: this.fieldTo, fieldTo: this.fieldFrom}, false, btnBc),
        // eslint-disable-next-line sort-keys
        removeAll: (_mode: any, btnBc: IBuilderConfig) =>
            this.moveRecSaveAction("3", {fieldFrom: this.fieldTo, fieldTo: this.fieldFrom}, true, btnBc),
    };
}
