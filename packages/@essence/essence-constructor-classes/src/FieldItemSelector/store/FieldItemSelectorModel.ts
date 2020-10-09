import {action} from "mobx";
import {
    VAR_RECORD_PAGE_OBJECT_ID,
    VAR_RECORD_OBJECT_ID,
    VAR_RECORD_NAME,
} from "@essence-community/constructor-share/constants";
import {mapValueToArray} from "@essence-community/constructor-share/utils";
import {StoreBaseModel} from "@essence-community/constructor-share/models/StoreBaseModel";
import {saveAction} from "@essence-community/constructor-share/actions/saveAction";
import {
    IStoreBaseModelProps,
    IBuilderConfig,
    IBuilderMode,
    IStoreBaseModel,
    IRecord,
} from "@essence-community/constructor-share/types";
import {IFieldItemSelectorModel, IChildGridBuildConfig} from "./FieldItemSelectorModel.types";

function getSelectionRecords(gridStore: IStoreBaseModel): IRecord[] {
    if (gridStore.bc.selmode === "MULTI" || gridStore.bc.collectionvalues === "array") {
        return mapValueToArray(gridStore.recordsStore?.selectedRecords);
    }

    return gridStore.recordsStore?.selectedRecord ? [gridStore.recordsStore?.selectedRecord] : [];
}

export class FieldItemSelectorModel extends StoreBaseModel implements IFieldItemSelectorModel {
    public fieldFrom: IBuilderConfig;

    public fieldTo: IBuilderConfig;

    constructor(props: IStoreBaseModelProps) {
        super(props);

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
    }

    public getStores = ({fieldFrom, fieldTo}: IChildGridBuildConfig): [IStoreBaseModel?, IStoreBaseModel?] => [
        this.pageStore.stores.get(fieldFrom[VAR_RECORD_PAGE_OBJECT_ID]),
        this.pageStore.stores.get(fieldTo[VAR_RECORD_PAGE_OBJECT_ID]),
    ];

    @action
    private saveAction = (values: IRecord[], mode: IBuilderMode): Promise<boolean> =>
        saveAction.call(this, values, mode, {
            actionBc: {
                [VAR_RECORD_NAME]: `${this.bc[VAR_RECORD_NAME]}_button`,
                [VAR_RECORD_OBJECT_ID]: `${this.bc[VAR_RECORD_OBJECT_ID]}_button`,
                [VAR_RECORD_PAGE_OBJECT_ID]: `${this.bc[VAR_RECORD_PAGE_OBJECT_ID]}_button`,
            },
            bc: this.bc,
            noReload: true,
            pageStore: this.pageStore,
            query: this.bc.updatequery,
            recordId: this.recordId,
        });

    @action
    private applySaveAction = (fromStore: IStoreBaseModel, toStore: IStoreBaseModel, recs: IRecord[]) => {
        fromStore.recordsStore!.removeRecordsAction(recs, this.bc.column!);
        toStore.recordsStore!.addRecordsAction(recs);

        toStore.recordsStore!.sortRecordsAction();
        fromStore.clearStoreAction();
    };

    @action
    public async moveRecSaveAction(
        mode: IBuilderMode,
        fields: IChildGridBuildConfig,
        isAll: boolean,
    ): Promise<boolean> {
        const [fromStore, toStore] = this.getStores(fields);

        if (!fromStore || !toStore) {
            return false;
        }

        const recs = isAll ? fromStore.recordsStore?.records || [] : getSelectionRecords(fromStore);
        const saveStatus = await this.saveAction(recs, mode);

        if (saveStatus) {
            this.applySaveAction(fromStore, toStore, recs);
        }

        return saveStatus;
    }

    handlers = {
        addAll: () => this.moveRecSaveAction("1", {fieldFrom: this.fieldFrom, fieldTo: this.fieldTo}, true),
        addSelected: () => this.moveRecSaveAction("1", {fieldFrom: this.fieldFrom, fieldTo: this.fieldTo}, false),
        removeSelected: () => this.moveRecSaveAction("3", {fieldFrom: this.fieldTo, fieldTo: this.fieldFrom}, false),
        // eslint-disable-next-line sort-keys
        removeAll: () => this.moveRecSaveAction("3", {fieldFrom: this.fieldTo, fieldTo: this.fieldFrom}, true),
    };
}
