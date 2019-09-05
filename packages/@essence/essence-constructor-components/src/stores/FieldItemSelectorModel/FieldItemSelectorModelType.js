// @flow
import {type StoreBaseModelType, type StoreBaseModelPropsType} from "../StoreBaseModel";
import {type BuilderModeType} from "../../BuilderType";

export interface FieldItemSelectorModelInterface extends StoreBaseModelType {
    hidden: ?boolean;
    disabled: ?boolean;
    constructor(props: StoreBaseModelPropsType): void;
    +getStores: (props: {fieldFrom: Object, fieldTo: Object}) => [?Object, ?Object];
    +saveAction: (values: Object, mode: BuilderModeType) => Boolean;
    +moveRecSaveAction: (mode: BuilderModeType, fields: Object, isAll: boolean) => Boolean;
}

export type FieldItemSelectorModelType = FieldItemSelectorModelInterface;
