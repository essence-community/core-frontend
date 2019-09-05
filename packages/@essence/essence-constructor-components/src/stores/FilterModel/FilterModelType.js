// @flow
import {type PageModelType} from "../PageModel";
import {type StoreBaseModelInterface} from "../StoreBaseModel";

export type FilterValues = {
    [key: string]: string | number | boolean,
};

export type ConstructorConfigType = {|
    bc: Object,
    pageStore: PageModelType,
|};

export interface FilterModelInterface extends StoreBaseModelInterface {
    +values: null | Object;
    +filterValues: Object;
    +valuesStorageKey: ?string;
    +isFormDirty: boolean;
    constructor(props: ConstructorConfigType): void;
    +setValues: (values: FilterValues) => void;
    +resetValues: () => void;
    +onSetForm: (form: Object) => void;
    +setSearchedAction: (searched: boolean, parentBc?: Object, fireSearch?: boolean) => void;
    +handleGlobals: (values: Object) => void;
    +handleFormStatus: (value: boolean) => void;
}

export type FilterModelType = FilterModelInterface;
