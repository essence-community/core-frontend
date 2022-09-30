/* eslint-disable max-lines */
import {computed, observable, action} from "mobx";
import {IRecordsModel, toString, debounce, FieldValue, IRecord} from "@essence-community/constructor-share";
import {VALUE_SELF_FIRST, VALUE_SELF_ALWAYSFIRST} from "@essence-community/constructor-share/constants";
import {deepChange, deepFind, i18next, isEmpty, parseMemoize} from "@essence-community/constructor-share/utils";
import {StoreBaseModel, RecordsModel} from "@essence-community/constructor-share/models";
import {IParseReturnType} from "@essence-community/constructor-share/utils/parser";
import {IField} from "@essence-community/constructor-share/Form/types";
import {ISuggestion, IFieldComboModelProps} from "./FieldComboModel.types";

export const CLEAR_VALUE = undefined;
export class FieldComboModel extends StoreBaseModel {
    recordsStore: IRecordsModel;

    displayfield: string;

    valuefield: string;

    valueLength: number;

    field: IField;

    loadDebounce: (value: string, isUserReload: boolean) => void;

    @computed get highlightedIndex(): number {
        return this.highlightedValue
            ? this.suggestions.findIndex((sug: ISuggestion) => sug.value === this.highlightedValue)
            : 0;
    }

    @observable highlightedValue = "";

    @observable inputValue = "";

    @observable isInputChanged = false;

    @observable lastValue: FieldValue = CLEAR_VALUE;

    // Duplicate from i18next to control suggestions
    @observable language: string = i18next.language;

    @computed get selectedRecord() {
        return this.recordsStore.selectedRecord;
    }

    @computed get preSuggestions(): Array<ISuggestion> {
        const getSuggestion = this.bc.localization && this.language ? this.getSuggestionWithTrans : this.getSuggestion;

        return this.recordsStore.recordsState.records.map(getSuggestion);
    }

    @computed get suggestions(): Array<ISuggestion> {
        const inputValueLower = this.inputValue.toLowerCase();
        let suggestions: ISuggestion[] = this.preSuggestions;

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

        if (this.isInputChanged && this.bc.querymode === "local" && !isEmpty(inputValueLower)) {
            return suggestions.filter((sug: ISuggestion) => sug.labelLower.indexOf(inputValueLower) !== -1);
        }

        return suggestions;
    }

    parserLabel?: IParseReturnType;

    constructor(props: IFieldComboModelProps) {
        super(props);

        const {bc, pageStore, field} = props;
        const {column = "", displayfield = "", valuefield, minchars = 0, querydelay = 0} = bc;

        this.field = field;
        this.displayfield = displayfield;
        this.valuefield = valuefield?.[0]?.in || column;
        this.valueLength = minchars;

        if (displayfield) {
            try {
                this.parserLabel = parseMemoize(displayfield);
            } catch (e) {}
        }

        this.recordsStore = new RecordsModel(bc, {
            applicationStore: pageStore.applicationStore,
            noLoadChilds: true,
            pageStore,
            valueField: this.valuefield,
        });

        this.loadDebounce = debounce((inputValue: string, isUserReload: boolean) => {
            if (toString(inputValue).length >= this.valueLength) {
                this.recordsStore.searchAction({[bc.queryparam || this.displayfield]: inputValue}, {isUserReload});
            }
        }, querydelay * 1000);
    }

    reloadStoreAction = async (): Promise<IRecord | undefined> => {
        if (!this.recordsStore.isLoading) {
            const selectedRecordId = this.recordsStore.selectedRecordValues[this.recordsStore.recordId];

            const res = await this.recordsStore.loadRecordsAction({
                selectedRecordId:
                    selectedRecordId === null || typeof selectedRecordId === "object"
                        ? undefined
                        : (selectedRecordId as "string" | "number"),
            });

            if (selectedRecordId != this.recordsStore.selectedRecordValues[this.recordsStore.recordId]) {
                this.field.onClear();
            }

            if (
                this.recordsStore.recordsState.records.length &&
                (this.bc.defaultvalue === VALUE_SELF_FIRST || this.bc.defaultvalue === VALUE_SELF_ALWAYSFIRST)
            ) {
                const id = this.recordsStore.recordsState.records[0][this.recordsStore.recordId];

                this.recordsStore.setSelectionAction(id);
                this.field.onChange(this.recordsStore.recordsState.records[0][this.valuefield]);
                this.patchForm(this.field, this.recordsStore.recordsState.records[0]);
            }

            return res;
        }

        return Promise.resolve(undefined);
    };

    clearStoreAction = () => this.recordsStore.clearChildsStoresAction();

    patchForm = (field: IField, record: IRecord) => {
        const patchValues: IRecord = {};
        let parentKey = "";

        if (field.key.indexOf(".") > -1) {
            const arrKey = field.key.split(".");

            parentKey = arrKey.slice(0, arrKey.length - 1).join(".");
        }

        this.bc.valuefield.forEach(({in: recordField, out: fieldKey}) => {
            if (recordField && fieldKey && fieldKey !== this.bc.column) {
                deepChange(patchValues, `${parentKey ? `${parentKey}.` : ""}${fieldKey}`, record[recordField]);
            }
        });

        field.form.patch(patchValues, true);
    };

    @action
    resetAction = () => {
        this.inputValue = "";
        this.lastValue = CLEAR_VALUE;
        this.recordsStore.searchAction({}, {reset: true});
        this.recordsStore.setSelectionAction(undefined);
        if (this.bc.valuefield && this.bc.valuefield.length > 1) {
            this.patchForm(this.field, {});
        }
    };

    @action
    clearAction = () => {
        this.inputValue = "";
        this.lastValue = CLEAR_VALUE;
        this.recordsStore.searchAction({}, {noLoad: true, reset: true});
        this.recordsStore.setSelectionAction(undefined);
        if (this.bc.valuefield && this.bc.valuefield.length > 1) {
            this.patchForm(this.field, {});
        }
    };

    @action
    handleChangeValue = (value: string, isNew?: boolean) => {
        this.isInputChanged = true;
        this.inputValue = value;

        if (this.bc.allownew) {
            this.lastValue = isNew ? `${this.bc.allownew}${value}` : value;
            this.highlightedValue = value;
        }

        if (this.bc.querymode === "remote") {
            this.loadDebounce(value, true);
        }
    };

    @action
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

    @action
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

    @action
    handleSetValueList = (value: FieldValue, loaded: boolean, isUserSearch: boolean) => {
        const stringValue = toString(value);
        const suggestion = this.suggestions.find((sug) => sug.value === stringValue);

        // Cancel loadDebounce when value select from list or press enter from list
        if (!isUserSearch) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
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

    @action
    handleSetValueNew = (value: FieldValue, loaded: boolean, isUserSearch: boolean): boolean => {
        const {allownew = ""} = this.bc;
        const stringValue = toString(value);
        const isNewValue =
            stringValue.indexOf(allownew) === 0 && this.suggestions.findIndex((sug) => sug.value === allownew) === -1;
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
            } else if (this.bc.querymode === "remote") {
                this.loadDebounce(stringNewValue, false);

                return true;
            }
        }

        this.inputValue = stringNewValue;

        return !value && value !== 0;
    };

    @action
    handleSetSuggestionValue = (suggestion: ISuggestion, isUserSearch: boolean): boolean => {
        if (this.bc.valuefield && this.bc.valuefield.length > 1) {
            const record = this.recordsStore.records.find((rec) => rec[this.recordsStore.recordId] === suggestion.id);

            this.patchForm(this.field, record || {});
        }
        if (this.recordsStore.selectedRecordValues[this.recordsStore.recordId] !== suggestion.id) {
            const rec: any = suggestion.id;

            this.recordsStore.setSelectionAction(rec, this.recordsStore.recordId);
        }

        if (!isUserSearch) {
            this.inputValue = suggestion.label;
        }

        return true;
    };

    @action
    handleSetValue = (value: FieldValue, loaded: boolean, isUserSearch: boolean) => {
        if ((value === VALUE_SELF_FIRST || value === VALUE_SELF_ALWAYSFIRST) && this.bc.defaultvalue === value) {
            this.lastValue = CLEAR_VALUE;
        } else {
            this.lastValue = value;
        }
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

    @action
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
        const [isExistForm, resForm] = deepFind(record, this.valuefield);
        const [isExistDisplay, display] = deepFind(record, this.displayfield);
        const label = isExistDisplay
            ? toString(display)
            : (this.parserLabel?.runer({
                  get: (name: string) => {
                      return toString(record[name] || "");
                  },
              }) as string) || toString(record[this.displayfield]);

        return {
            id: record[this.recordsStore.recordId],
            label,
            labelLower: label.toLowerCase(),
            value: toString(isExistForm ? resForm : record[this.valuefield]),
        };
    };

    getSuggestionWithTrans = (record: IRecord): ISuggestion => {
        const [isExistForm, resForm] = deepFind(record, this.valuefield);
        const [isExistDisplay, display] = deepFind(record, this.displayfield);
        const label = isExistDisplay
            ? i18next.t(toString(display), {ns: this.bc.localization}) || toString(record[this.displayfield])
            : (this.parserLabel?.runer({
                  get: (name: string) => {
                      return (
                          i18next.t(toString(record[name]), {ns: this.bc.localization}) || toString(record[name] || "")
                      );
                  },
              }) as string) || toString(record[this.displayfield]);

        return {
            id: record[this.recordsStore.recordId],
            label,
            labelLower: label.toLowerCase(),
            value: toString(isExistForm ? resForm : record[this.valuefield]),
        };
    };
}
