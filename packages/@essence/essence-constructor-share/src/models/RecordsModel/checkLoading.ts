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
import {IBuilderConfig, IPageModel, IRecordsModel} from "../../types";
import {findGetGlobalKey} from "../../utils/findKey";

type DisposerType = () => void;

interface ICheckLoading {
    pageStore: IPageModel;
    bc: IBuilderConfig;
    ckMaster: string;
}

// 15sec * 1000ms - cycle delay, if global set incoreclty
export const CYCLE_TIMEOUT = 5000;

export class CheckLoading {
    private pageStore: IPageModel;

    private bc: IBuilderConfig;

    private ckMaster: string;

    private resolve: () => void;

    private reject: (error: any) => void;

    private checkers: {[$key: string]: Lambda} = {};

    private records: {[$key: string]: any} = {};

    private disposers: DisposerType[] = [];

    private timeoutId: any;

    constructor({pageStore, bc, ckMaster}: ICheckLoading) {
        this.bc = bc;
        this.ckMaster = ckMaster;
        this.pageStore = pageStore;
        this.timeoutId = setTimeout(this.handleTimeoutError, CYCLE_TIMEOUT);
    }

    public wait(): Promise<boolean> {
        const master = this.pageStore.stores.get(this.ckMaster);

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

    private initMaster(master: {recordsStore: IRecordsModel}) {
        this.records.master = master.recordsStore.selectedRecord;
        this.checkers.master = () => "master";

        this.disposers.push(
            reaction(() => master.recordsStore.isLoading, this.handleFinishedLoading("master", master)),
        );
    }

    private initGetGlobalToStore(getglobaltostore: string) {
        for (const globaleKey of findGetGlobalKey(getglobaltostore) as any) {
            if (typeof globaleKey === "string") {
                const stores = this.pageStore.globalStores.get(globaleKey);
                let isLoadingOne = false;

                if (stores) {
                    stores.forEach((store: any) => {
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
        }
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
        for (const dispose of this.checkers as any) {
            dispose();
        }
        this.reject(new Error("Превышено время ожидания"));
    };

    private handleFinishedLoading = (name: string, store: {recordsStore: IRecordsModel}) => (): void => {
        if (this.records[name] === store.recordsStore.selectedRecord || name === "master") {
            this.handleResolve(name);
        }
    };

    private clear = () => {
        this.disposers.forEach((dispose) => dispose());
        this.disposers = [];
        clearTimeout(this.timeoutId);
    };
}
