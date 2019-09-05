// @flow
import {type CkIdType} from "../../BuilderType";
import {type RecordsModelType} from "../RecordsModel";
import {type PageModelType} from "../PageModel";
import {type GridModelType} from "../GridModel";

export type RoutesModelPropsType = {
    pageStore: PageModelType,
};

export interface RoutesModelInteface extends GridModelType {
    constructor(props: RoutesModelPropsType): void;
    recordsStore: RecordsModelType;
    +favorits: Map<CkIdType, boolean>;
    +setFavoritsAction: (ckId: CkIdType) => void;
}

export type RoutesModelType = RoutesModelInteface;
