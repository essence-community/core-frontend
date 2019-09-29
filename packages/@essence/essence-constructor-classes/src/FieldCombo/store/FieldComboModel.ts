import {extendObservable} from "mobx";
import {
    IStoreBaseModelProps,
    StoreBaseModel,
    IRecordsModel,
    toString,
    camelCaseMemoized,
    debounce,
} from "@essence/essence-constructor-share";
import {RecordsModel} from "@essence/essence-constructor-share/models/RecordsModel/RecordsModel";
import {ISuggestion} from "./FieldComboModel.types";

export class FieldComboModel extends StoreBaseModel {
    suggestions: Array<ISuggestion>;

    recordsStore: IRecordsModel;

    displayfield: string;

    valuefield: string;

    inputValue: string;

    valueLength: number;

    loadDebounce: () => void;

    constructor({bc, pageStore}: IStoreBaseModelProps) {
        super({bc, pageStore});

        this.displayfield = camelCaseMemoized(bc.displayfield);
        this.valuefield = camelCaseMemoized(bc.valuefield);
        this.valueLength = parseInt(bc.minchars, 10);

        this.recordsStore = new RecordsModel(bc, pageStore, {
            valueField: this.valuefield,
        });

        this.loadDebounce = debounce(() => {
            if (bc.queryparam) {
                this.recordsStore.searchAction({[bc.queryparam]: this.inputValue});
            }
        }, parseInt(bc.querydelay, 10) * 1000);

        extendObservable(this, {
            inputValue: "",
            get suggestions() {
                return this.recordsStore.records.map(this.getSuggestion);
            },
        });
    }

    handleChangeValue = (value: string) => {
        this.inputValue = value;

        if (value.length >= this.valueLength) {
            this.loadDebounce();
        }
    };

    handleSetValue = (value: never, loaded = false) => {
        const stringValue = toString(value);
        const suggerstionIndex = this.suggestions.findIndex((sug) => sug.value === stringValue);

        if (!value && value !== 0 && this.recordsStore.selectedRecord) {
            this.recordsStore.setSelectionAction();
        }

        if (suggerstionIndex >= 0) {
            const suggerstion = this.suggestions[suggerstionIndex];
            const record = this.recordsStore.records[suggerstionIndex];

            if (record) {
                this.recordsStore.setSelectionAction(record.ckId);
            }

            this.inputValue = suggerstion.label;
        } else if (loaded) {
            this.inputValue = "";
            if (this.recordsStore.selectedRecord) {
                this.recordsStore.setSelectionAction();
            }
        } else {
            this.recordsStore.searchAction({[this.bc.valuefield || this.bc.column || ""]: value});
        }
    };

    getSuggestion = (record: Record<string, never>): ISuggestion => ({
        label: toString(record[this.displayfield]),
        value: toString(record[this.valuefield]),
    });
}
