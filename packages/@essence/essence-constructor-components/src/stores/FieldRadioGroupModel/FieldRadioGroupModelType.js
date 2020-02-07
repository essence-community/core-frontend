// @flow
import {type BuilderFieldType} from "../../TextField/BuilderFieldType";
import {type PageModelType} from "../PageModel";
import {type RecordsModelType} from "../RecordsModel";

export type RadioConstructorType = {
    bc: BuilderFieldType,
    pageStore: PageModelType,
};
export type RadioSuggestionType = {
    label: string,
    value: string,
};
export type RadioSuggestionsType = Array<RadioSuggestionType>;

export interface FieldRadioGroupModelInterface {
    +displayfield: string;
    +valuefield: string;
    +recordsStore: RecordsModelType;
    +suggestions: RadioSuggestionsType;
    constructor(props: RadioConstructorType): void;
    +getSuggestion: (record: Object) => RadioSuggestionType;
    +setSelectRecord: (value: string) => void;
}

export type FieldRadioGroupModelType = FieldRadioGroupModelInterface;
