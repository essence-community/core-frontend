// @flow
import {type RecordsModelType} from "../RecordsModel";
import {type StoreBaseModelInterface, type StoreBaseModelPropsType} from "../StoreBaseModel";

export interface DynamicPanelInterface extends StoreBaseModelInterface {
    +recordsStore: RecordsModelType;
    constructor(props: StoreBaseModelPropsType): void;
    +searchAction: (values: Object, filter?: Array<Object>) => void;
    +setSearchValuesAction: (values: Object) => void;
}

export type DynamicPanelType = DynamicPanelInterface;
