import {IBuilderConfig, IPageModel, IStoreBaseModel, IStoreBaseModelProps, StoreBaseModelNameType} from "../../types";

/**
 * Базовая модель для построения сторов
 *
 * reloadStoreAction - Запускается при изменения зависимого стора/поля по ck_master
 * checkParent - Позволяет обновлять стор вверх
 * clearStoreAction - Запускается при очистки зависимого стора/поля по ck_master
 */

export class StoreBaseModel implements IStoreBaseModel {
    public name: StoreBaseModelNameType = "base";
    public disabled?: boolean;
    public hidden?: boolean;
    public bc: IBuilderConfig;
    public pageStore: IPageModel;

    constructor({bc, pageStore}: IStoreBaseModelProps) {
        this.bc = bc;
        this.pageStore = pageStore;
    }

    public reloadStoreAction = (): Promise<undefined | object> => {
        // tslint:disable-next-line:no-console
        console.warn(`Не определана reloadStoreAction для ${this.constructor.name}`);

        return Promise.resolve(undefined);
    };

    public clearStoreAction = (): void => {
        // tslint:disable-next-line:no-console
        console.warn(`Не определана clearStoreAction для ${this.constructor.name}`);
    };
}
