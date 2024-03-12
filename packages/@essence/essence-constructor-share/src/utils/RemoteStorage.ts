import {settingsStore} from "../models/SettingsModel";
import {
    META_PAGE_OBJECT,
    VAR_RECORD_RES_ERROR,
    VAR_RECORD_ID,
    VAR_RECORD_CV_VALUE,
    VAR_SETTING_REMOTE_STORAGE_LOAD_QUERY,
    VAR_SETTING_REMOTE_STORAGE_ADD_QUERY,
    VAR_RECORD_CV_ACTION,
    VAR_SETTING_REMOTE_STORAGE_DELETE_QUERY,
    META_PAGE_ID,
} from "../constants/variables";
import {request} from "../request/request";
import {IRecord} from "../types/Base";
import {loggerRoot} from "../constants/base";
import {IStorage} from "../types/Storage";
import {getFromLocalStore} from "./storage";
import {isEmpty} from "./base";

const logger = loggerRoot.extend("RemoteStorage");
const AUTH_KEY = "auth";

export class RemoteStorage implements IStorage {
    private data = new Map();
    private session?: string;
    constructor() {
        this.session = getFromLocalStore(AUTH_KEY, {session: undefined})?.session;
    }
    public setItem(key: string, value: string): void {
        this.data.set(key, value);
        if (!isEmpty(this.session)) {
            request({
                [META_PAGE_OBJECT]: "user_cache",
                json: {
                    data: {
                        [VAR_RECORD_CV_VALUE]: value,
                        [VAR_RECORD_ID]: key,
                    },
                    service: {
                        [VAR_RECORD_CV_ACTION]: "I",
                    },
                },
                list: false,
                query: settingsStore.settings[VAR_SETTING_REMOTE_STORAGE_ADD_QUERY],
                session: this.session,
            })
                .then((response: IRecord) => {
                    logger(response);
                })
                .catch((error: Error) => {
                    logger(error);
                });
        }
    }
    public getItem(key: string): string | null {
        return this.data.get(key);
    }
    public removeItem(key: string): void {
        this.data.delete(key);
        if (!isEmpty(this.session)) {
            request({
                [META_PAGE_OBJECT]: "user_cache",
                json: {
                    data: {
                        [VAR_RECORD_ID]: key,
                    },
                    service: {
                        [VAR_RECORD_CV_ACTION]: "D",
                    },
                },
                list: false,
                query: settingsStore.settings[VAR_SETTING_REMOTE_STORAGE_DELETE_QUERY],
                session: this.session,
            })
                .then((response: IRecord) => {
                    logger(response);
                })
                .catch((error: Error) => {
                    logger(error);
                });
        }
    }
    public removeFromStoreByRegex(reg: RegExp): void {
        for (const key in this.data.keys()) {
            if (reg.test(key)) {
                this.removeItem(key);
            }
        }
    }
    public load(session = this.session) {
        if (isEmpty(session)) {
            this.data.clear();
        }
        this.session = session;
        if (!isEmpty(session)) {
            return request({
                [META_PAGE_ID]: "application",
                [META_PAGE_OBJECT]: "user_cache",
                list: true,
                query: settingsStore.settings[VAR_SETTING_REMOTE_STORAGE_LOAD_QUERY],
                session,
            })
                .then((response: IRecord[]) => {
                    if (response && response.length && isEmpty(response[0][VAR_RECORD_RES_ERROR])) {
                        if (response.length === 1 && isEmpty(response[0][VAR_RECORD_ID])) {
                            Object.entries(response[0]).forEach(([key, value]) => {
                                this.data.set(key, value);
                            });
                        } else {
                            response.forEach((val) => {
                                this.data.set(val[VAR_RECORD_ID], val[VAR_RECORD_CV_VALUE]);
                            });
                        }
                    } else {
                        logger(response);
                    }
                })
                .catch((error: Error) => {
                    logger(error);
                });
        }

        return Promise.resolve();
    }
}
