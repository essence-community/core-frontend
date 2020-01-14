// @flow
import {type PageModelType} from "../PageModel";

export type StoreBaseModelPropsType = {
    bc: Object,
    pageStore: PageModelType,
};

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
export interface StoreBaseModelInterface {
    hidden: ?boolean;
    disabled: ?boolean;
    +name: StoreBaseModelNameType;
    +pageStore: PageModelType;
    +bc: Object;
    // TODO: разкоментить constructor(props: StoreBaseModelPropsType): void;
    +reloadStoreAction: (checkParent?: boolean) => void;
    +clearStoreAction: () => void;
    +recordId: string;
}

export type StoreBaseModelType = StoreBaseModelInterface;
