import {IProcessFormat, ICheckNewMaskReturn} from "../FieldText.types";

export function handleProcessRFormat({value, selection, userInput}: IProcessFormat): ICheckNewMaskReturn {
    const newSelection = {...selection};

    if (value.slice(0, selection.start).indexOf("-") !== -1) {
        const newValue = `${value.slice(0, selection.start - 1)}${userInput.toUpperCase()}${value.slice(
            selection.start - 1,
        )}`;

        return {newSelection, newValue};
    }

    const newValue = `${value.slice(0, selection.start)}${userInput.toUpperCase()}${value.slice(selection.start)}`;

    newSelection.start += 1;

    return {newSelection, newValue};
}
