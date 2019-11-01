import {extendObservable} from "mobx";
import {
    IStoreBaseModelProps,
    IRecordsModel,
    toString,
    camelCaseMemoized,
    debounce,
    FieldValue,
} from "@essence/essence-constructor-share";
import {StoreBaseModel, RecordsModel} from "@essence/essence-constructor-share/models";
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

    isFocus = false;

    isListChanged: boolean;

    loadDebounce: () => void;

    constructor(props: IStoreBaseModelProps) {
        super(props);

        const {bc, pageStore, applicationStore} = props;
        const {column = "", displayfield = "", valuefield = "", minchars = "", querydelay = ""} = bc;

        this.displayfield = camelCaseMemoized(displayfield);
        this.valuefield = camelCaseMemoized(valuefield || column);
        this.valueLength = parseInt(minchars, 10);

        this.recordsStore = new RecordsModel(bc, {
            applicationStore,
            pageStore,
            valueField: this.valuefield,
        });

        this.loadDebounce = debounce(() => {
            if (bc.queryparam && toString(this.inputValue).length >= this.valueLength) {
                this.recordsStore.searchAction({[bc.queryparam]: this.inputValue}, {isUserReload: true});
            }
        }, parseInt(querydelay, 10) * 1000);

        extendObservable(this, {
            get highlightedIndex() {
                return this.highlightedValue
                    ? this.suggestions.findIndex((sug: ISuggestion) => sug.value === this.highlightedValue)
                    : 0;
            },
            highlightedValue: "",
            inputValue: "",
            isListChanged: false,
            get selectedRecord() {
                return this.recordsStore.selectedRecord;
            },
            get suggestions() {
                const inputValueLower = this.inputValue.toLowerCase();
                let suggestions: ISuggestion[] = this.recordsStore.records.map(this.getSuggestion);

                if (
                    bc.allownew &&
                    this.inputValue &&
                    suggestions.findIndex(
                        (suggestion: ISuggestion) =>
                            suggestion.labelLower === inputValueLower || suggestion.value === this.inputValue,
                    ) === -1
                ) {
                    suggestions = [
                        {isNew: true, label: this.inputValue, labelLower: inputValueLower, value: this.inputValue},
                        ...suggestions,
                    ];
                }

                if (this.isListChanged) {
                    return suggestions.filter((sug: ISuggestion) => sug.labelLower.indexOf(inputValueLower) !== -1);
                }

                return suggestions;
            },
        });
    }

    handleSetListChanged = (isListChanged: boolean) => {
        this.isListChanged = isListChanged;
    };

    handleChangeValue = (value: string) => {
        const isEqual = value === this.inputValue;

        if (!isEqual) {
            this.isListChanged = true;
            this.inputValue = value;

            if (this.bc.allownew) {
                this.highlightedValue = value;
            }
        }

        if (value.length >= this.valueLength && !isEqual) {
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

    handleRestoreSelected = (value: FieldValue, code: "up" | "down") => {
        const cleanValue = this.bc.allownew && typeof value === "string" ? value.replace(this.bc.allownew, "") : value;
        const suggerstion = this.suggestions.find((sug) => sug.value === cleanValue);

        if (suggerstion) {
            this.highlightedValue = suggerstion.value;
        } else {
            this.handleChangeSelected(code);
        }
    };

    handleSetSelected = () => {
        this.handleSetValue(this.highlightedValue);
    };

    handleSetIsFocus = (isFocus: boolean) => {
        this.isFocus = isFocus;
    };

    // eslint-disable-next-line complexity
    handleSetValue = debounce((value: FieldValue, loaded = false, isUserSearch = false) => {
        const stringValue =
            this.bc.allownew && typeof value === "string" ? value.replace(this.bc.allownew, "") : toString(value);
        const isEqual = stringValue === this.inputValue;
        const isFocusNew = this.bc.allownew && this.isFocus;

        if (this.bc.allownew && !loaded && !this.isFocus) {
            this.inputValue = stringValue;
        }

        const suggerstionIndex = this.suggestions.findIndex((sug) => sug.value === stringValue);

        if (!value && value !== 0 && this.recordsStore.selectedRecord) {
            this.recordsStore.setSelectionAction(undefined);
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
            if (!isUserSearch && !isFocusNew) {
                this.inputValue = "";
            }
            if (this.recordsStore.selectedRecord) {
                this.recordsStore.setSelectionAction(undefined);
            }
        } else if (!isEqual && !this.recordsStore.isLoading) {
            this.recordsStore.searchAction(
                this.valueLength ? {[this.bc.allownew ? this.bc.queryparam || "" : this.valuefield]: value} : {},
            );
        }
    }, 0);

    getSuggestion = (record: Record<string, never>): ISuggestion => {
        const label = toString(record[this.displayfield]);

        return {
            label,
            labelLower: label.toLowerCase(),
            value: toString(record[this.valuefield]),
        };
    };
}
