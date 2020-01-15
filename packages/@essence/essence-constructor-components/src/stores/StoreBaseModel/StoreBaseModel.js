// @flow
import {i18next} from "@essence-community/constructor-share/utils";
import {VAR_RECORD_ID} from "@essence-community/constructor-share/constants";
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

    recordId: string;

    constructor({bc, pageStore}: StoreBaseModelPropsType) {
        this.bc = bc;
        this.pageStore = pageStore;
        this.recordId = bc.idproperty || VAR_RECORD_ID;
    }

    reloadStoreAction = (): void => {
        logger(i18next.t("static:83490c56debb4a399f05518608e3bace", {name: this.constructor.name}));
    };

    clearStoreAction = (): void => {
        logger(i18next.t("static:5c3108d6508a4141bdca1e52881e196d", {name: this.constructor.name}));
    };
}
