// @flow
import {loggerRoot} from "../../constants";
import {type PageModelType} from "../PageModel";
import {type StoreBaseModelInterface, type StoreBaseModelPropsType} from "./StoreBaseModelTypes";

const logger = loggerRoot.extend("StoreBaseModel");

/**
 * Базовая модель для построения сторов
 *
 * reloadStoreAction - Запускается при изменения зависимого стора/поля по ck_master
 *  checkParent - Позволяет обновлять стор вверх
 * clearStoreAction - Запускается при очистки зависимого стора/поля по ck_master
 */

export class StoreBaseModel implements StoreBaseModelInterface {
    name = "base";

    disabled: ?boolean;

    hidden: ?boolean;

    bc: Object;

    pageStore: PageModelType;

    constructor({bc, pageStore}: StoreBaseModelPropsType) {
        this.bc = bc;
        this.pageStore = pageStore;
    }

    reloadStoreAction = (): void => {
        logger(`Не определана reloadStoreAction для ${this.constructor.name}`);
    };

    clearStoreAction = (): void => {
        logger(`Не определана clearStoreAction для ${this.constructor.name}`);
    };
}
