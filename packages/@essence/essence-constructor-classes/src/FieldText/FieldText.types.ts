import {Selection} from "@essence-community/constructor-share/uicomponents/TextFieldMask";

export interface ICkeckNewMaskType {
    formatChars: Record<string, string>;
    mask: string;
    selection: Selection;
    userInput?: string;
    value: string;
    oldValue: string;
}

export interface IProcessFormat {
    selection: Selection;
    userInput: string;
    value: string;
}

export interface ICheckNewMaskReturn {
    newSelection: Selection;
    newValue: string;
}

export type GetNewValueAndSelectionType = ICkeckNewMaskType;
