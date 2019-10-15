import {IStoreBaseModelProps, IPageModel, FieldValue, IBuilderMode} from "../../types";

/**
 * Конструкотр модели
 *
 * @param {IPageModel} pageStore
 * @param {any} values
 */
export interface IWindowModelConstructor extends IStoreBaseModelProps {
    pageStore: IPageModel;
    values?: Record<string, FieldValue>;
    mode: IBuilderMode;
}
