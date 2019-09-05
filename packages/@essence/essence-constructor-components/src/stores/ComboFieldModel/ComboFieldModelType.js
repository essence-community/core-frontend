// @flow
import {type Field} from "mobx-react-form";
import {type BuilderFieldType} from "../../TextField/BuilderFieldType";
import {type PageModelType} from "../PageModel";
import {type RecordsModelType} from "../RecordsModel";

export type ComboConstructorType = {
    bc: BuilderFieldType,
    field: Field,
    pageStore: PageModelType,
};
export type ComboSuggestionType = {
    label: string,
    value: mixed,
};
export type ComboSuggestionsType = Array<ComboSuggestionType>;

export interface ComboFieldModelInterface {
    +displayfield: string;
    +field: Field;
    +valuefield: string;
    +recordsStore: RecordsModelType;
    +suggestions: ComboSuggestionsType;
    +displayText: string;
    +selectedRecord: ?Object;
    +allowFilter: boolean;
    constructor(props: ComboConstructorType): void;
    +getSuggestion: (record: Object) => ComboSuggestionType;
    +changeStringItemAction: (item?: string) => string;
    +changeValueAction: (value: mixed, clearable: boolean) => void;
    +clearSelectedRecord: (clearable: boolean, record: ?Object, value: mixed) => void;
    +setRecord: (record: Object) => void;
    +setAllowFilterAction: (allowFilter: boolean) => void;
    +reloadStoreByOpen: () => void;
}

export type ComboFieldModelType = ComboFieldModelInterface;
