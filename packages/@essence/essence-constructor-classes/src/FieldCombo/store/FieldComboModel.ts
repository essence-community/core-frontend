/* eslint-disable max-lines */
import {computed, observable} from "mobx";
import {
    IStoreBaseModelProps,
    IRecordsModel,
    toString,
    debounce,
    FieldValue,
    IRecord,
} from "@essence-community/constructor-share";
import {VAR_RECORD_CL_IS_MASTER} from "@essence-community/constructor-share/constants";
import {i18next, isEmpty} from "@essence-community/constructor-share/utils";
import {StoreBaseModel, RecordsModel} from "@essence-community/constructor-share/models";
import {ISuggestion} from "./FieldComboModel.types";

export class FieldComboModel extends StoreBaseModel {
    recordsStore: IRecordsModel;

    displayfield: string;

    valuefield: string;

    valueLength: number;

    loadDebounce: (value: string, isUserReload: boolean) => void;

    @computed get highlightedIndex(): number {
        return this.highlightedValue
            ? this.suggestions.findIndex((sug: ISuggestion) => sug.value === this.highlightedValue)
            : 0;
    }

    @observable highlightedValue = "";

    @observable inputValue = "";

    @observable isInputChanged = false;

    @observable lastValue: FieldValue = "";

    // Duplicate from i18next to control suggestions
    @observable language: string = i18next.language;

    @computed get selectedRecord() {
        return this.recordsStore.selectedRecord;
    }

    @computed get suggestions(): Array<ISuggestion> {
        const inputValueLower = this.inputValue.toLowerCase();
        const getSuggestion = this.bc.localization && this.language ? this.getSuggestionWithTrans : this.getSuggestion;
        let suggestions: ISuggestion[] = this.recordsStore.recordsState.records.map(getSuggestion);

        if (
            this.bc.allownew &&
            this.inputValue &&
            suggestions.findIndex(
                (suggestion: ISuggestion) =>
                    suggestion.labelLower === inputValueLower || suggestion.value === this.inputValue,
            ) === -1
        ) {
            suggestions = [
                {
                    id: -1,
                    isNew: true,
                    label: this.inputValue,
                    labelLower: inputValueLower,
                    value: this.inputValue,
                },
                ...suggestions,
            ];
        }

        if (this.isInputChanged) {
            return suggestions.filter((sug: ISuggestion) => sug.labelLower.indexOf(inputValueLower) !== -1);
        }

        return suggestions;
    }

    constructor(props: IStoreBaseModelProps) {
        super(props);

        const {bc, pageStore} = props;
        const {column = "", displayfield = "", valuefield = "", minchars = "", querydelay = ""} = bc;

        this.displayfield = displayfield;
        this.valuefield = valuefield || column;
        this.valueLength = parseInt(minchars, 10);

        this.recordsStore = new RecordsModel(bc, {
            applicationStore: pageStore.applicationStore,
            noLoadChilds: Boolean(bc[VAR_RECORD_CL_IS_MASTER]),
            pageStore,
            valueField: this.valuefield,
        });

        this.loadDebounce = debounce((inputValue: string, isUserReload: boolean) => {
            if (bc.queryparam && toString(inputValue).length >= this.valueLength) {
                this.recordsStore.searchAction({[bc.queryparam]: inputValue}, {isUserReload});
            }
        }, parseInt(querydelay, 10) * 1000);
    }

    reloadStoreAction = (): Promise<IRecord | undefined> => {
        if (!this.recordsStore.isLoading) {
            const selectedRecordId = this.recordsStore.selectedRecordValues[this.recordsStore.recordId];

            return this.recordsStore.loadRecordsAction({
                selectedRecordId:
                    selectedRecordId === null || typeof selectedRecordId === "object"
                        ? undefined
                        : (selectedRecordId as "string" | "number"),
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
        const suggestion = this.suggestions.find((sug) => sug.value === stringValue);

        // Cancel loadDebounce when value select from list or press enter from list
        if (!isUserSearch) {
            // @ts-ignore
            this.loadDebounce.cancel();
        }

        if (suggestion) {
            return this.handleSetSuggestionValue(suggestion, isUserSearch);
        } else if (isEmpty(value) && !isUserSearch) {
            // Clear value when user close the combo without value
            this.inputValue = "";
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

        const suggestion = this.suggestions.find((sug) => sug.value === stringValue);

        if (suggestion) {
            return this.handleSetSuggestionValue(suggestion, isUserSearch);
        } else if (loaded && !isUserSearch) {
            this.inputValue = "";

            return false;
        } else if (!this.recordsStore.isLoading && !isNewValue) {
            // Load only necessary data while minchars more then 0
            if (this.valueLength) {
                if (toString(stringNewValue).length >= this.valueLength) {
                    this.recordsStore.searchAction({[this.valuefield]: value}, {isUserReload: false});
                } else if (isEmpty(value)) {
                    /*
                     * Check click "Clear" button
                     * This come when use click by "Clear" button and not in isUserSearch mode
                     */
                    this.inputValue = "";
                }

                return true;
            } else if (this.bc.queryparam) {
                this.loadDebounce(stringNewValue, false);

                return true;
            }
        }

        this.inputValue = stringNewValue;

        return !value && value !== 0;
    };

    handleSetSuggestionValue = (suggestion: ISuggestion, isUserSearch: boolean): boolean => {
        if (this.recordsStore.selectedRecordValues[this.recordsStore.recordId] !== suggestion.id) {
            const rec: any = suggestion.id;

            this.recordsStore.setSelectionAction(rec, this.recordsStore.recordId);
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

    handleChangeLanguage = (value: FieldValue, language: string) => {
        const stringValue = toString(value);

        this.language = language;

        if (stringValue) {
            // Reload suggestios and reselect value into input
            const suggestion = this.suggestions.find((sug) => sug.value === stringValue);

            if (suggestion) {
                this.inputValue = suggestion.label;
            } else {
                // Leave previes value. Something strange happens.
            }
        }
    };

    getSuggestion = (record: IRecord): ISuggestion => {
        const label = toString(record[this.displayfield]);

        return {
            id: record[this.recordsStore.recordId],
            label,
            labelLower: label.toLowerCase(),
            value: toString(record[this.valuefield]),
        };
    };

    getSuggestionWithTrans = (record: IRecord): ISuggestion => {
        const label = i18next.t(toString(record[this.displayfield]), {ns: this.bc.localization});

        return {
            id: record[this.recordsStore.recordId],
            label,
            labelLower: label.toLowerCase(),
            value: toString(record[this.valuefield]),
        };
    };
}
