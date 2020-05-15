import {IStoreBaseModel} from "@essence-community/constructor-share";

export interface IFieldTableModel extends IStoreBaseModel {
    valueFields: Array<[string, string]>;
    valueField: string;
}
