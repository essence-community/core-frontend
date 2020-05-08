import {action} from "mobx";
import {
    VAR_RECORD_PAGE_OBJECT_ID,
    VAR_RECORD_OBJECT_ID,
    VAR_RECORD_NAME,
} from "@essence-community/constructor-share/constants";
import {mapValueToArray} from "@essence-community/constructor-share/utils";
import {StoreBaseModel} from "@essence-community/constructor-share/models/StoreBaseModel";
import {saveAction} from "@essence-community/constructor-share/actions/saveAction";
import {IStoreBaseModelProps, IBuilderConfig, IBuilderMode, IRecord} from "@essence-community/constructor-share/types";
import {IFieldItemSelectorModel, IChildGridBuildConfig, IGridModel} from "./FieldItemSelectorModel.types";

function getSelectionRecords(gridStore: IGridModel): IRecord[] {
    if (gridStore.bc.selmode === "MULTI" || gridStore.bc.selmode === "SIMPLE") {
        return mapValueToArray<string, IRecord>(gridStore.selectedRecords) as IRecord[];
    }

    return gridStore.recordsStore.selectedRecord ? [gridStore.recordsStore.selectedRecord] : [];
}

export class FieldItemSelectorModel extends StoreBaseModel implements IFieldItemSelectorModel {
    public fieldFrom: IBuilderConfig;

    public fieldTo: IBuilderConfig;

    constructor(props: IStoreBaseModelProps) {
        super(props);

        const [fieldFrom, fieldTo] = this.bc.childs || [];

        this.fieldFrom = {
            height: this.bc.height,
            ...fieldFrom,
        };

        this.fieldTo = {
            height: this.bc.height,
            ...fieldTo,
        };
    }

    public getStores = ({fieldFrom, fieldTo}: IChildGridBuildConfig): [IGridModel?, IGridModel?] => [
        this.pageStore.stores.get(fieldFrom[VAR_RECORD_PAGE_OBJECT_ID]) as any,
        this.pageStore.stores.get(fieldTo[VAR_RECORD_PAGE_OBJECT_ID]) as any,
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
            recordId: this.recordId,
        });

    @action
    private applySaveAction = (fromStore: IGridModel, toStore: IGridModel, recs: IRecord[]) => {
        fromStore.recordsStore.removeRecordsAction(recs, this.bc.column!);
        toStore.recordsStore.addRecordsAction(recs);

        toStore.recordsStore.sortRecordsAction();
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

        const recs = isAll ? fromStore.recordsStore.records : getSelectionRecords(fromStore);
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
