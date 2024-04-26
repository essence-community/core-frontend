import {IStoreBaseModel, IRecordsModel, IRecord} from "@essence-community/constructor-share/types";

export interface IFieldTableModel extends IStoreBaseModel {
    valueFields: Array<[string, string]>;
    valueField: string;
    recordsStore: IRecordsModel;
    getLabel: (rec: IRecord) => string;
}
