import {IStoreBaseModelProps, IPageModel, FieldValue, IBuilderMode, IApplicationModel} from "../../types";

/**
 * Конструкотр модели
 *
 * @param {IPageModel} pageStore
 * @param {any} values
 */
export interface IWindowModelConstructor extends IStoreBaseModelProps {
    applicationStore: IApplicationModel;
    pageStore: IPageModel;
    values?: Record<string, FieldValue>;
    mode: IBuilderMode;
}
