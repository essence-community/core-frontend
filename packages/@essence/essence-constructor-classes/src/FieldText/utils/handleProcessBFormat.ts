import {IProcessFormat, ICheckNewMaskReturn} from "../FieldText.types";

export function handleProcessBFormat({value, selection, userInput}: IProcessFormat): ICheckNewMaskReturn {
    const newValue = `${value.slice(0, selection.start)}${userInput.toUpperCase()}${value.slice(selection.start)}`;
    const newSelection = {...selection};

    newSelection.start += 1;

    return {newSelection, newValue};
}
