import {IBuilderConfig} from "./Builder";
import {IPageModel} from "./PageModel";

export interface IStoreBaseModelProps {
    bc: IBuilderConfig;
    pageStore: IPageModel;
}

export type StoreBaseModelNameType =
    | "base"
    | "grid"
    | "filePanel"
    | "itemselector"
    | "combofield"
    | "panelForm"
    | "window"
    | "filter";

/**
 * Базовая модель для построения сторов
 *
 * reloadStoreAction - Запускается при изменения зависимого стора/поля по ck_master
 *  checkParent - Позволяет обновлять стор вверх
 * clearStoreAction - Запускается при очистки зависимого стора/поля по ck_master
 */
export interface IStoreBaseModel {
    name: StoreBaseModelNameType;
    hidden?: boolean;
    disabled?: boolean;
    pageStore: IPageModel;
    bc: IBuilderConfig;
    afterSelected?: () => void;
    // TODO: разкоментить constructor(props: StoreBaseModelPropsType): void;
    reloadStoreAction: (checkParent?: boolean) => Promise<object | undefined>;
    clearStoreAction: () => void;
}
