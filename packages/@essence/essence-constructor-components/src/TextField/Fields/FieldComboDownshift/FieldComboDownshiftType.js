// @flow
import {type BuilderFieldType, type TextFieldChildProps} from "../../BuilderFieldType";
import {type PageModelType} from "../../../stores/PageModel";
import {ComboFieldModel, type ComboSuggestionsType} from "../../../stores/ComboFieldModel";
import {FieldComboDownshiftStylesDark} from "./FieldComboDownshiftStyles/FieldComboDownshiftStylesDark";

export type DownshiftFindSuggestionsType = {
    allowFilter: boolean,
    suggestions: ComboSuggestionsType,
    inputValue?: string | number,
    selectedItem: null | string | number,
    querymode?: "local" | "remote",
    displayText?: string | number,
};
export type DownshiftContentType = DownshiftFindSuggestionsType & {
    getItemProps: Function,
    getInputProps: Function,
    getRootProps: Function,
    highlightedIndex: number,
    clearSelection: Function,
    toggleMenu: Function,
    isOpen: boolean,
    setHighlightedIndex: (index?: number, otherStateToSet?: Object, cb?: Function) => void,
    selectItem: (item: mixed, otherStateToSet?: Object, cb?: Function) => void,
};

export type OwnPropsType = TextFieldChildProps & {
    classes?: {
        [$Keys<$Call<typeof FieldComboDownshiftStylesDark>>]: string,
    },
    isAutoLoad: boolean,
};
export type StorePropsType = {
    store: ComboFieldModel,
};
export type PropsType = StorePropsType & OwnPropsType;

export type PopupContentPropsType = DownshiftContentType & {
    bc: BuilderFieldType,
    classes?: {
        [$Keys<$Call<typeof FieldComboDownshiftStylesDark>>]: string,
    },
    store: ComboFieldModel,
    field: Object,
    pageStore: PageModelType,
};

export type StateType = {
    isLoading?: boolean,
};
