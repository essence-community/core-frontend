// @flow
import {type DownshiftFindSuggestionsType} from "./FieldComboDownshiftType";

export const getNewSuggestions = ({suggestions, inputValue, selectedItem, querymode}: DownshiftFindSuggestionsType) => {
    const newSuggestion =
        querymode === "local"
            ? suggestions.filter(
                  (suggestion) => suggestion.label.toLowerCase().indexOf(String(inputValue).toLowerCase()) !== -1,
              )
            : [...suggestions];

    if (!newSuggestion.find((suggestion) => suggestion.value === selectedItem)) {
        newSuggestion.push({label: String(inputValue), value: inputValue});
    }

    return newSuggestion;
};

/**
 * TODO: Нужно реализовать правильное поведение для querymode === "local"
 *
 * @param {DownshiftFindSuggestionsType} config Конфигурация поиска
 *
 * @return {Array<Object>} Отсортированный список для вывода
 */
export const getExactSuggestions = ({
    allowFilter,
    displayText,
    suggestions,
    querymode,
}: DownshiftFindSuggestionsType) => {
    if (querymode === "remote") {
        return suggestions;
    }

    if (allowFilter) {
        return suggestions.filter(
            (suggestion) => suggestion.label.toLowerCase().indexOf(String(displayText).toLowerCase()) !== -1,
        );
    }

    return suggestions;
};
