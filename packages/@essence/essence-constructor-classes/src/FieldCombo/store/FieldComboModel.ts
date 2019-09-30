import {extendObservable} from "mobx";
import {
    IStoreBaseModelProps,
    StoreBaseModel,
    IRecordsModel,
    toString,
    camelCaseMemoized,
    debounce,
    FieldValue,
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

    highlightedValue: string;

    highlightedIndex: number;

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
                this.recordsStore.searchAction({[bc.queryparam]: this.inputValue}, {isUserReload: true});
            }
        }, parseInt(bc.querydelay, 10) * 1000);

        extendObservable(this, {
            get highlightedIndex() {
                return this.highlightedValue
                    ? this.suggestions.findIndex((sug: ISuggestion) => sug.value === this.highlightedValue)
                    : 0;
            },
            highlightedValue: "",
            inputValue: "",
            get selectedRecord() {
                return this.recordsState.selectedRecord;
            },
            get suggestions() {
                const suggestions = this.recordsStore.records.map(this.getSuggestion);

                if (
                    bc.allownew === "true" &&
                    this.inputValue &&
                    suggestions.findIndex((suggestion: ISuggestion) => suggestion.value === this.inputValue) === -1
                ) {
                    return [{label: this.inputValue, value: this.inputValue}, ...suggestions];
                }

                return suggestions;
            },
        });
    }

    handleChangeValue = (value: string) => {
        this.inputValue = value;

        if (value.length >= this.valueLength) {
            this.loadDebounce();
        }
    };

    handleChangeSelected = (code: "up" | "down") => {
        if (this.suggestions.length === 0) {
            this.highlightedValue = "";
        } else {
            if (code === "up") {
                const index = Math.max(0, this.suggestions.findIndex((sug) => sug.value === this.highlightedValue) - 1);

                if (this.suggestions[index]) {
                    this.highlightedValue = this.suggestions[index].value;
                }
            }

            if (code === "down") {
                const index = this.suggestions.findIndex((sug) => sug.value === this.highlightedValue) + 1;

                if (this.suggestions[index]) {
                    this.highlightedValue = this.suggestions[index].value;
                }
            }
        }
    };

    handleSetSelected = () => {
        this.handleSetValue(this.highlightedValue);
    };

    handleSetValue = debounce((value: FieldValue, loaded = false, isUserSearch = false) => {
        const stringValue = toString(value);

        if (this.bc.allownew === "true" && !loaded) {
            this.inputValue = stringValue;
        }

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

            if (!isUserSearch) {
                this.inputValue = suggerstion.label;
            }
        } else if (loaded) {
            if (!isUserSearch) {
                this.inputValue = "";
            }
            if (this.recordsStore.selectedRecord) {
                this.recordsStore.setSelectionAction();
            }
        } else {
            this.recordsStore.searchAction({[this.bc.valuefield || this.bc.column || ""]: value});
        }
    }, 0);

    getSuggestion = (record: Record<string, never>): ISuggestion => ({
        label: toString(record[this.displayfield]),
        value: toString(record[this.valuefield]),
    });
}
