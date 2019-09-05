// @flow
import {extendObservable, action} from "mobx";
import {Field} from "mobx-react-form";
import camelCase from "lodash/camelCase";
import toString from "lodash/toString";
import {isEmpty} from "../../utils/base";
import {RecordsModel, type RecordsModelType} from "../RecordsModel";
import {StoreBaseModel} from "../StoreBaseModel/StoreBaseModel";
import {
    type ComboConstructorType,
    type ComboSuggestionsType,
    type ComboSuggestionType,
    type ComboFieldModelInterface,
} from "./ComboFieldModelType";

export class ComboFieldModel extends StoreBaseModel implements ComboFieldModelInterface {
    name = "combofield";

    displayfield: string;

    field: Field;

    valuefield: string;

    recordsStore: RecordsModelType;

    suggestions: ComboSuggestionsType;

    displayText: string;

    selectedRecord: ?Object;

    allowFilter: boolean;

    constructor({bc, pageStore, field}: ComboConstructorType) {
        super({bc, pageStore});

        const noLoadChilds = Boolean(bc.clIsMaster);

        this.displayfield = camelCase(bc.displayfield);
        this.valuefield = camelCase(bc.valuefield);
        this.field = field;
        this.bc = bc;

        this.recordsStore = new RecordsModel(bc, pageStore, {
            noLoadChilds,
            valueField: this.valuefield,
        });

        extendObservable(this, {
            allowFilter: false,
            displayText: "",
            selectedRecord: undefined,
            get suggestions() {
                return this.recordsStore.records.map(this.getSuggestion);
            },
        });
    }

    getSuggestion = (record: Object): ComboSuggestionType => ({
        label: toString(record[this.displayfield]),
        value: toString(record[this.valuefield]),
    });

    reloadStoreAction = action(
        "reloadStoreAction",
        async (): Promise<void> => {
            if (!this.recordsStore.isLoading) {
                await this.recordsStore.loadRecordsAction();
                await this.changeValueAction(this.field.get("value"), true);
            }
        },
    );

    clearStoreAction = action(
        "clearStoreAction",
        async (): Promise<void> => {
            await this.recordsStore.clearChildsStoresAction();
            this.selectedRecord = this.recordsStore.selectedRecord;
        },
    );

    changeStringItemAction = action(
        "changeStringItemAction",
        (item?: string): string => {
            this.displayText = item || "";
            this.allowFilter = true;

            return this.displayText;
        },
    );

    changeValueAction = action(
        "changeValueAction",
        (value: mixed, clearable: boolean = false): void => {
            const stringValue = toString(value);
            const record: ?Object = this.suggestions.find((suggestion) => suggestion.value === stringValue);

            this.clearSelectedRecord(clearable, record, value);

            if (!record && this.selectedRecord && toString(this.selectedRecord[this.valuefield]) === stringValue) {
                this.displayText = this.selectedRecord[this.displayfield];
            } else if (record) {
                this.setRecord(record);
            } else if (this.bc.allownew === "true") {
                this.displayText = stringValue;
            } else {
                this.displayText = "";
            }

            this.allowFilter = true;
        },
    );

    clearSelectedRecord = (clearable: boolean, record: ?Object, value: mixed): void => {
        if (clearable && !record && !isEmpty(value)) {
            this.selectedRecord = undefined;
            this.field.clear();
            this.field.resetValidation();
        }
    };

    setRecord = (record: Object): void => {
        this.displayText = record.label;
        this.recordsStore.setSelectionAction(record.value, this.valuefield);
        this.selectedRecord = this.recordsStore.selectedRecord;
    };

    setAllowFilterAction = action(
        "setAllowFilterAction",
        (allowFilter: boolean): void => {
            this.allowFilter = allowFilter;
        },
    );

    reloadStoreByOpen = () => {
        if (this.bc.reloadservice !== "true") {
            return;
        }

        this.reloadStoreAction();
    };
}
