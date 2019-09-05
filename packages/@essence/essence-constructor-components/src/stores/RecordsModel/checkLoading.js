// @flow
/**
 * Механизм проверки загрузки данных
 * Исходные данные:
 *      1. isLoading - статус загрузки данных из сервера
 *      2. globalValues - глобальные переменные, которые могут быть выставлены после загрузки
 * Ограничения:
 *      1. globalValues могут не изменится, если выбранная запись не была измнена (установилась из пустоты в пустоту)
 * Слежение:
 *      1. за измнением статуса загрузки master
 *      2. за изменением globalValues
 * Принцип работы:
 *      1. Подписываемся на окончание загрузки
 *      2. Подписываемся на измнения globalValues по getglobaltostore
 *      3. Отслеживаем окончания всех обновлений по master и getglobaltostore
 *
 * TODO:
 *      1. При autoload нет возможности ожидать установки значения в selectedRecord
 */
import forOwn from "lodash/forOwn";
import {observe, reaction} from "mobx";
import {findGetGlobalKey} from "../../utils/findKey";
import {type PageModelType} from "../PageModel";
import {type RecordsModelType} from "./RecordsModelType";

type CheckLoadingType = {|
    pageStore: PageModelType,
    bc: $PropertyType<RecordsModelType, "bc">,
    ckMaster: string,
|};

// 15sec * 1000ms - cycle delay, if global set incoreclty
export const CYCLE_TIMEOUT = 5000;

export class CheckLoading {
    pageStore: PageModelType;

    resolve: () => void;

    reject: (error: any) => void;

    checkers = {};

    records = {};

    disposers: Array<Function> = [];

    timeoutId: TimeoutID;

    constructor({pageStore, bc, ckMaster}: CheckLoadingType): Promise<any> {
        const master = pageStore.stores.get(ckMaster);

        this.pageStore = pageStore;
        this.timeoutId = setTimeout(this.handleTimeoutError, CYCLE_TIMEOUT);

        return new Promise((resolve, reject) => {
            this.resolve = resolve;
            this.reject = reject;

            if (master && master.recordsStore && master.recordsStore.isLoading) {
                this.initMaster(master);
            }

            if (bc.getglobaltostore) {
                this.initGetGlobalToStore(bc.getglobaltostore);
            }

            if (Object.keys(this.checkers).length === 0) {
                resolve();
                this.clear();
            }
        });
    }

    initMaster(master: {recordsStore: RecordsModelType}) {
        this.records.master = master.recordsStore.selectedRecord;
        this.checkers.master = () => "master";

        this.disposers.push(
            reaction(() => master.recordsStore.isLoading, this.handleFinishedLoading("master", master)),
        );
    }

    initGetGlobalToStore(getglobaltostore: string) {
        forOwn(findGetGlobalKey(getglobaltostore), (globaleKey) => {
            if (typeof globaleKey === "string") {
                const stores = this.pageStore.globalStores.get(globaleKey);
                let isLoadingOne = false;

                if (stores) {
                    stores.forEach((store) => {
                        if (store.recordsStore.isLoading) {
                            isLoadingOne = true;
                            this.records[globaleKey] = store.recordsStore.selectedRecord;
                            this.disposers.push(
                                reaction(
                                    () => store.recordsStore.isLoading,
                                    this.handleFinishedLoading(globaleKey, store),
                                ),
                            );
                        }
                    });
                }

                if (isLoadingOne) {
                    this.checkers[globaleKey] = observe(
                        this.pageStore.globalValues,
                        globaleKey,
                        this.handleReaction(globaleKey),
                    );
                }
            }
        });
    }

    handleResolve = (name: string) => {
        this.checkers[name] && this.checkers[name]();
        delete this.checkers[name];

        if (Object.keys(this.checkers).length === 0) {
            this.clear();
            this.resolve();
        }
    };

    handleReaction = (name: string) => () => {
        if (typeof this.checkers[name] === "function") {
            this.checkers[name]();
        }

        this.handleResolve(name);
    };

    handleTimeoutError = () => {
        this.clear();
        forOwn(this.checkers, (dispose) => dispose());
        this.reject(new Error("Превышено время ожидания"));
    };

    handleFinishedLoading = (name: string, store: {recordsStore: RecordsModelType}) => (): void => {
        if (this.records[name] === store.recordsStore.selectedRecord || name === "master") {
            this.handleResolve(name);
        }
    };

    clear = () => {
        this.disposers.forEach((dispose) => dispose());
        this.disposers = [];
        clearTimeout(this.timeoutId);
    };
}
