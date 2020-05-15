import {GetNewValueAndSelectionType, ICheckNewMaskReturn} from "../FieldText.types";
import {handleProcessRFormat} from "./handleProcessRFormat";
import {handleProcessBFormat} from "./handleProcessBFormat";

export function handleGetNewValueAndSelection({
    value,
    oldValue,
    selection,
    formatChars,
    userInput,
}: GetNewValueAndSelectionType): ICheckNewMaskReturn {
    if (userInput && userInput !== userInput.toUpperCase()) {
        if (new RegExp(`^${formatChars.R}$`, "u").test(userInput.toUpperCase())) {
            return handleProcessRFormat({selection, userInput, value});
        }

        if (new RegExp(`^${formatChars.Б}$`, "u").test(userInput.toUpperCase())) {
            return handleProcessBFormat({selection, userInput, value});
        }
    }

    return {
        newSelection: selection,
        newValue:
            userInput && new RegExp(`^${formatChars.R}$`, "u").test(userInput) && value === oldValue
                ? `${value.slice(0, selection.start - 1)}${userInput}${value.slice(selection.start - 1)}`
                : value,
    };
}
