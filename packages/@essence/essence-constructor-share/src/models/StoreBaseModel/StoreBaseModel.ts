import {
    IBuilderConfig,
    IPageModel,
    IStoreBaseModel,
    IStoreBaseModelProps,
    StoreBaseModelNameType,
    IHandlers,
    IApplicationModel,
} from "../../types";
import {loggerRoot} from "../../constants";

const logger = loggerRoot("StoreBaseModel");

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

    public handlers: IHandlers = {};

    public applicationStore?: IApplicationModel;

    constructor({bc, pageStore, applicationStore, disabled, hidden}: IStoreBaseModelProps) {
        this.bc = bc;
        this.pageStore = pageStore;
        this.applicationStore = applicationStore;
        this.disabled = disabled;
        this.hidden = hidden;
    }

    public reloadStoreAction = (): Promise<undefined | object> => {
        logger(`Не определана reloadStoreAction для ${this.constructor.name}`);

        return Promise.resolve(undefined);
    };

    public clearStoreAction = (): void => {
        logger(`Не определана clearStoreAction для ${this.constructor.name}`);
    };
}
