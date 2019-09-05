// @flow
import {Field, Form} from "mobx-react-form";
import {type BuilderFieldType, type BuilderFieldHanlers} from "../../TextField/BuilderFieldType";
import {type RecordsModelType} from "../RecordsModel";
import {type PageModelType} from "../PageModel";
import {type StoreBaseModelInterface} from "../StoreBaseModel";

export type ConstructorType = {
    bc: BuilderFieldType,
    pageStore: PageModelType,
    form: Form,
    field: Field,
    fieldHandlers: BuilderFieldHanlers,
};

export interface TableFieldModelInterface extends StoreBaseModelInterface {
    recordsStore: RecordsModelType;
    constructor(props: ConstructorType): void;
    +builderConfigs: Array<Object>;
    +openField: boolean;
    +gridBc: any;
    +selectedRecord: Object | null | void;
    +selectedRecordValue: ?string;
    +valueFields: ?Array<[string, string]>;
    +valueField: string;
    +selectAction: () => void;
    +closeAction: () => void;
    +clearAction: () => void;
    +openFieldAction: () => void;
    +setDefaultRecordAction: (value: any) => void;
    +dbSelectAction: () => void;
    +restoreSelectedAction: () => void;
}

export type TableFieldModelType = TableFieldModelInterface;
