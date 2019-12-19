// @flow
import {type PageModelType} from "../PageModel";
import {type RecordsModelType} from "../RecordsModel";
import {type StoreBaseModelInterface} from "../StoreBaseModel";

export type PropsType = {
    bc: Object,
    pageStore: PageModelType,
    ck_query: string,
};

export interface BaseMultiFieldModelInterface extends StoreBaseModelInterface {
    +recordsStore: RecordsModelType;
    +selectedRecord: ?Object;
    +isLoading: boolean;
    +_isLoading: boolean;
}

export interface ModelInterface extends BaseMultiFieldModelInterface {
    constructor(props: PropsType): void;
}

export type BaseMultiFieldModelType = BaseMultiFieldModelInterface;
