import {extendObservable} from "mobx";
import {
    IStoreBaseModelProps,
    IRecordsModel,
    toString,
    camelCaseMemoized,
    debounce,
    FieldValue,
    VAR_RECORD_ID,
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

    lastValue: FieldValue;

    isInputChanged: boolean;

    loadDebounce: (value: string, isUserReload: boolean) => void;

    constructor(props: IStoreBaseModelProps) {
        super(props);

        const {bc, pageStore, applicationStore} = props;
        const {column = "", displayfield = "", valuefield = "", minchars = "", querydelay = ""} = bc;

        this.displayfield = camelCaseMemoized(displayfield);
        this.valuefield = camelCaseMemoized(valuefield || column);
        this.valueLength = parseInt(minchars, 10);

        this.recordsStore = new RecordsModel(bc, {
            applicationStore,
            noLoadChilds: Boolean(bc.clIsMaster),
            pageStore,
            valueField: this.valuefield,
        });

        this.loadDebounce = debounce((inputValue: string, isUserReload: boolean) => {
            if (bc.queryparam && toString(inputValue).length >= this.valueLength) {
                this.recordsStore.searchAction({[bc.queryparam]: inputValue}, {isUserReload});
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
            isInputChanged: false,
            lastValue: "",
            get selectedRecord() {
                return this.recordsStore.selectedRecord;
            },
            get suggestions() {
                const inputValueLower = this.inputValue.toLowerCase();
                let suggestions: ISuggestion[] = this.recordsStore.recordsState.records.map(this.getSuggestion);

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

                if (this.isInputChanged) {
                    return suggestions.filter((sug: ISuggestion) => sug.labelLower.indexOf(inputValueLower) !== -1);
                }

                return suggestions;
            },
        });
    }

    reloadStoreAction = (): Promise<object | undefined> => {
        if (!this.recordsStore.isLoading) {
            return this.recordsStore.loadRecordsAction({
                selectedRecordId: this.recordsStore.selectedRecrodValues[VAR_RECORD_ID],
            });
        }

        return Promise.resolve(undefined);
    };

    clearStoreAction = () => this.recordsStore.clearChildsStoresAction();

    handleChangeValue = (value: string, isNew?: boolean) => {
        this.isInputChanged = true;
        this.inputValue = value;

        if (this.bc.allownew) {
            this.lastValue = isNew ? `${this.bc.allownew}${value}` : value;
            this.highlightedValue = value;
        }

        if (value.length >= this.valueLength) {
            this.loadDebounce(value, true);
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
        const suggerstion = this.suggestions.find((sug) => sug.value === value);

        if (suggerstion) {
            this.highlightedValue = suggerstion.value;
        } else {
            this.handleChangeSelected(code);
        }
    };

    handleSetSelected = () => {
        this.handleSetValue(this.highlightedValue, false, false);
    };

    handleSetValueList = (value: FieldValue, loaded: boolean, isUserSearch: boolean) => {
        const stringValue = toString(value);
        const suggestionIndex = this.suggestions.findIndex((sug) => sug.value === stringValue);

        // Cancel loadDebounce when value select from list or press enter from list
        if (!isUserSearch) {
            // @ts-ignore
            this.loadDebounce.cancel();
        }

        if (suggestionIndex >= 0) {
            return this.handleSetSuggestionValue(suggestionIndex, isUserSearch);
        } else if (loaded) {
            if (!isUserSearch) {
                this.inputValue = "";
            }

            return false;
        } else if (!this.recordsStore.isLoading) {
            this.recordsStore.searchAction(this.valueLength ? {[this.valuefield]: value} : {});

            return true;
        }

        return !value && value !== 0;
    };

    handleSetValueNew = (value: FieldValue, loaded: boolean, isUserSearch: boolean): boolean => {
        const {allownew = ""} = this.bc;
        const stringValue = toString(value);
        const isNewValue = stringValue.indexOf(allownew) === 0;
        const stringNewValue = isNewValue ? stringValue.replace(allownew, "") : stringValue;

        this.inputValue = stringNewValue;

        const suggestionIndex = this.suggestions.findIndex((sug) => sug.value === stringValue);

        if (suggestionIndex >= 0) {
            return this.handleSetSuggestionValue(suggestionIndex, isUserSearch);
        } else if (loaded && !isUserSearch) {
            this.inputValue = "";

            return false;
        } else if (!this.recordsStore.isLoading) {
            this.loadDebounce(stringNewValue, false);

            return true;
        }

        return !value && value !== 0;
    };

    handleSetSuggestionValue = (suggestionIndex: number, isUserSearch: boolean): boolean => {
        const suggestion = this.suggestions[suggestionIndex];
        const record = this.recordsStore.records[suggestionIndex];

        if (record && this.recordsStore.selectedRecrodValues[VAR_RECORD_ID] !== record[VAR_RECORD_ID]) {
            this.recordsStore.setSelectionAction(record[VAR_RECORD_ID]);
        }

        if (!isUserSearch) {
            this.inputValue = suggestion.label;
        }

        return true;
    };

    handleSetValue = (value: FieldValue, loaded: boolean, isUserSearch: boolean) => {
        this.lastValue = value === "##first##" || value === "##alwaysfirst##" ? "" : value;
        const prevInputValue = this.inputValue;
        const prevSsInputChanged = this.isInputChanged;

        // Check loadDebounce after user change value in input
        if (!isUserSearch) {
            this.isInputChanged = false;
        }

        const isFound = this.bc.allownew
            ? this.handleSetValueNew(this.lastValue, loaded, isUserSearch)
            : this.handleSetValueList(this.lastValue, loaded, isUserSearch);

        // Check loadDebounce after user change value in input
        if (isUserSearch || prevInputValue === this.inputValue) {
            this.isInputChanged = prevSsInputChanged;
        }

        if (!isFound) {
            if (loaded) {
                if (this.recordsStore.selectedRecord) {
                    this.recordsStore.setSelectionAction(undefined);
                }
            }
        }
    };

    getSuggestion = (record: Record<string, never>): ISuggestion => {
        const label = toString(record[this.displayfield]);

        return {
            label,
            labelLower: label.toLowerCase(),
            value: toString(record[this.valuefield]),
        };
    };
}
