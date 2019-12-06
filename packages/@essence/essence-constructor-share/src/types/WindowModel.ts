import {IStoreBaseModel, IHandlerOptions, IHandlers} from "./StoreBaseModel";
import {FieldValue, IRecordsModel, IBuilderConfig, IBuilderMode} from ".";

export interface IWindowModel extends IStoreBaseModel {
    initialValues: Record<string, FieldValue>;
    cancel: boolean;
    addMore: boolean;
    windowBc: IBuilderConfig;
    childs: IBuilderConfig[];
    recordsStore: IRecordsModel;
    closeAction(mode: IBuilderMode, btnBc: IBuilderConfig, options: IHandlerOptions): Promise<boolean>;
    resetCancelAction(): void;
    setCancelAction(mode: IBuilderMode, btnBc: IBuilderConfig, options: IHandlerOptions): void;
    setAddMoreAction(value: boolean): void;
    saveAction(mode: IBuilderMode, btnBc: IBuilderConfig, options: IHandlerOptions): Promise<boolean>;
    onPrintExcel(mode: IBuilderMode, btnBc: IBuilderConfig, options: IHandlerOptions): Promise<boolean>;
    handlers: IHandlers;
}
