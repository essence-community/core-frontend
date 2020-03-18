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
// eslint-disable-next-line import/named
import {Lambda, observe, reaction} from "mobx";
import {i18next} from "../../utils";
import {IBuilderConfig, IPageModel, IStoreBaseModel, IRecord} from "../../types";
import {findGetGlobalKey} from "../../utils/findKey";

type DisposerType = () => void;

interface ICheckLoading {
    pageStore: IPageModel | null;
    bc: IBuilderConfig;
    masterId?: string;
}

// 15sec * 1000ms - cycle delay, if global set incoreclty
export const CYCLE_TIMEOUT = 5000;

export class CheckLoading {
    private pageStore: IPageModel | null;

    private bc: IBuilderConfig;

    private masterId?: string;

    private resolve: () => void;

    private reject: (error: Error) => void;

    private checkers: Record<string, Lambda> = {};

    private records: IRecord = {};

    private disposers: DisposerType[] = [];

    private timeoutId: number;

    constructor({pageStore, bc, masterId}: ICheckLoading) {
        this.bc = bc;
        this.masterId = masterId;
        this.pageStore = pageStore;
        this.timeoutId = window.setTimeout(this.handleTimeoutError, CYCLE_TIMEOUT);
    }

    public wait(): Promise<boolean> {
        const master = this.pageStore && this.masterId ? this.pageStore.stores.get(this.masterId) : undefined;

        return new Promise((resolve, reject) => {
            this.resolve = resolve;
            this.reject = reject;

            if (master && master.recordsStore && master.recordsStore.isLoading) {
                // @ts-ignore
                this.initMaster(master);
            }

            if (this.bc.getglobaltostore) {
                this.initGetGlobalToStore(this.bc.getglobaltostore);
            }

            if (Object.keys(this.checkers).length === 0) {
                resolve(true);
                this.clear();
            }
        });
    }

    private initMaster(master: IStoreBaseModel) {
        this.records.master = master.recordsStore?.selectedRecord;
        this.checkers.master = () => "master";

        this.disposers.push(
            reaction(() => master.recordsStore?.isLoading, this.handleFinishedLoading("master", master)),
        );
    }

    private initGetGlobalToStore(getglobaltostore: string) {
        Object.values(findGetGlobalKey(getglobaltostore)).forEach((globaleKey) => {
            if (typeof globaleKey === "string") {
                const stores = this.pageStore ? this.pageStore.globalStores.get(globaleKey) : undefined;
                let isLoadingOne = false;

                if (stores) {
                    stores.forEach((store) => {
                        if (store.recordsStore?.isLoading) {
                            isLoadingOne = true;
                            this.records[globaleKey] = store.recordsStore.selectedRecord;
                            this.disposers.push(
                                reaction(
                                    () => store.recordsStore?.isLoading,
                                    this.handleFinishedLoading(globaleKey, store),
                                ),
                            );
                        }
                    });
                }

                if (isLoadingOne && this.pageStore) {
                    this.checkers[globaleKey] = observe(
                        this.pageStore.globalValues,
                        globaleKey,
                        this.handleReaction(globaleKey),
                    );
                }
            }
        });
    }

    private handleResolve = (name: string) => {
        if (this.checkers[name]) {
            this.checkers[name]();
        }
        delete this.checkers[name];

        if (Object.keys(this.checkers).length === 0) {
            this.clear();
            this.resolve();
        }
    };

    private handleReaction = (name: string) => () => {
        if (typeof this.checkers[name] === "function") {
            this.checkers[name]();
        }

        this.handleResolve(name);
    };

    private handleTimeoutError = () => {
        this.clear();
        Object.values(this.checkers).forEach((dispose) => {
            dispose();
        });
        this.reject(new Error(i18next.t("static:06dfd0c3b97b45e5abc146a14c0fab37")));
    };

    private handleFinishedLoading = (name: string, store: IStoreBaseModel) => (): void => {
        if (this.records[name] === store.recordsStore?.selectedRecord || name === "master") {
            this.handleResolve(name);
        }
    };

    private clear = () => {
        this.disposers.forEach((dispose) => dispose());
        this.disposers = [];
        clearTimeout(this.timeoutId);
    };
}
