// @flow
import {type StoreBaseModelInterface, type StoreBaseModelPropsType} from "../StoreBaseModel";
import {type BuilderBaseType} from "../../BuilderType";
import {type RecordsModelType} from "../RecordsModel";

export interface IframeModelInterface extends StoreBaseModelInterface {
    +bc: BuilderBaseType;
    +recordsStore: RecordsModelType;
    constructor(props: StoreBaseModelPropsType): void;
    +reloadStoreAction: () => void;
}

export type IframeModelType = IframeModelInterface;
