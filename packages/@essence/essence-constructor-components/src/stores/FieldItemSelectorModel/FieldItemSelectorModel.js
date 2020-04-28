// @flow
import {action} from "mobx";
import {
    VAR_RECORD_PAGE_OBJECT_ID,
    VAR_RECORD_OBJECT_ID,
    VAR_RECORD_NAME,
} from "@essence-community/constructor-share/constants";
import {type BuilderModeType} from "../../BuilderType";
import {saveAction} from "../actions/saveAction";
import {type GridModelType} from "../GridModel";
import {StoreBaseModel} from "../StoreBaseModel";
import {type FieldItemSelectorModelType} from "./FieldItemSelectorModelType";

function getSelectionRecords(gridStore: GridModelType) {
    if (gridStore.bc.selmode === "MULTI" || gridStore.bc.selmode === "SIMPLE") {
        return [...gridStore.selectedRecords.values()];
    }

    return [gridStore.recordsStore.selectedRecord];
}

export class FieldItemSelectorModel extends StoreBaseModel implements FieldItemSelectorModelType {
    name = "itemselector";

    constructor(props) {
        super(props);

        const [fieldFrom, fieldTo] = this.bc.childs;

        this.fieldFrom = {
            height: this.bc.height,
            ...fieldFrom,
        };

        this.fieldTo = {
            height: this.bc.height,
            ...fieldTo,
        };
    }

    getStores = ({fieldFrom, fieldTo}: Object): [?GridModelType, ?GridModelType] => [
        this.pageStore.stores.get(fieldFrom[VAR_RECORD_PAGE_OBJECT_ID]),
        this.pageStore.stores.get(fieldTo[VAR_RECORD_PAGE_OBJECT_ID]),
    ];

    saveAction = action("saveAction", (values: Object, mode: BuilderModeType) =>
        saveAction.call(this, values, mode, {
            actionBc: {
                [VAR_RECORD_NAME]: `${this.bc[VAR_RECORD_NAME]}_button`,
                [VAR_RECORD_OBJECT_ID]: `${this.bc[VAR_RECORD_OBJECT_ID]}_button`,
                [VAR_RECORD_PAGE_OBJECT_ID]: `${this.bc[VAR_RECORD_PAGE_OBJECT_ID]}_button`,
            },
            bc: this.bc,
            pageStore: this.pageStore,
            recordId: this.recordId,
        }),
    );

    applySaveAction = (fromStore: GridModelType, toStore: GridModelType, recs: Object[]) => {
        fromStore.recordsStore.removeRecordsAction(recs, this.bc.column);
        toStore.recordsStore.addRecordsAction(recs);

        toStore.recordsStore.sortRecordsAction();
        fromStore.clearStoreAction();
    };

    moveRecSaveAction = action(
        "moveRecSaveAction",
        async (mode: BuilderModeType, {fieldFrom, fieldTo}, isAll: Boolean) => {
            const [fromStore, toStore] = this.getStores({fieldFrom, fieldTo});

            if (!fromStore || !toStore) {
                return false;
            }

            const recs = isAll ? fromStore.recordsStore.records : getSelectionRecords(fromStore);
            const saveStatus = await this.saveAction(recs, mode);

            if (saveStatus) {
                this.applySaveAction(fromStore, toStore, recs);
            }

            return saveStatus;
        },
    );

    handlers = {
        addAll: () => this.moveRecSaveAction("1", {fieldFrom: this.fieldFrom, fieldTo: this.fieldTo}, true),
        addSelected: () => this.moveRecSaveAction("1", {fieldFrom: this.fieldFrom, fieldTo: this.fieldTo}, false),
        removeSelected: () => this.moveRecSaveAction("3", {fieldFrom: this.fieldTo, fieldTo: this.fieldFrom}, false),
        // eslint-disable-next-line sort-keys
        removeAll: () => this.moveRecSaveAction("3", {fieldFrom: this.fieldTo, fieldTo: this.fieldFrom}, true),
    };
}
