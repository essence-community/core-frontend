// @flow
import {type StoreBaseModelInterface, type StoreBaseModelPropsType} from "../StoreBaseModel";
import {type RecordsModelType} from "../RecordsModel";

export interface DefaultRecordsModelInterface extends StoreBaseModelInterface {
    recordsStore: RecordsModelType;
    constructor(props: StoreBaseModelPropsType): void;
}

export type DefaultRecordsModelPropsType = StoreBaseModelPropsType;
export type DefaultRecordsModelType = DefaultRecordsModelInterface;
