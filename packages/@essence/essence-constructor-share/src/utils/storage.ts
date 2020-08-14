import {settingsStore} from "../models/SettingsModel";
import {VAR_SETTING_GATE_URL, VAR_SETTING_REMOTE_STORAGE} from "../constants/variables";
import {IStorage} from "../types/Storage";
import {LocalStorage} from "./LocalStorage";
import {RemoteStorage} from "./RemoteStorage";

type ValueType = string | number | any[];
type CallBackLoadedType = () => Promise<void>;

const localStore: IStorage = new LocalStorage();
let store: IStorage = localStore;
let callbackLoaded: CallBackLoadedType[] = [];

function makeKey(key: string): string {
    return `${settingsStore.settings[VAR_SETTING_GATE_URL]}_${key}`;
}

export function saveToLocalStore<T>(key: string, value: T) {
    return localStore.setItem(makeKey(key), JSON.stringify(value));
}

export function getFromLocalStore<T = ValueType>(key: string, defaultValue?: T): T | undefined {
    const value = localStore.getItem(makeKey(key));

    if (value) {
        try {
            return JSON.parse(value);
        } catch (error) {
            return defaultValue;
        }
    }

    return defaultValue;
}

export function saveToStore<T>(key: string, value: T) {
    return store.setItem(makeKey(key), JSON.stringify(value));
}

export function getFromStore<T = ValueType>(key: string, defaultValue?: T): T | undefined {
    const value = store.getItem(makeKey(key));

    if (value) {
        try {
            return JSON.parse(value);
        } catch (error) {
            return defaultValue;
        }
    }

    return defaultValue;
}

export function removeFromStore(key: string) {
    return store.removeItem(makeKey(key));
}

export function removeFromStoreByRegex(reg: RegExp) {
    return store.removeFromStoreByRegex(reg);
}

export function addListenLoaded(fn: CallBackLoadedType) {
    callbackLoaded.push(fn);
}

export function remListenLoaded(fnDel: CallBackLoadedType) {
    callbackLoaded = callbackLoaded.filter((fn) => fn !== fnDel);
}

export async function initStorage() {
    store = settingsStore.settings[VAR_SETTING_REMOTE_STORAGE] === "true" ? new RemoteStorage() : localStore;

    await store.load();

    return Promise.all(callbackLoaded.map((fn) => fn()));
}

export async function loadStore(session?: string) {
    await store.load(session);

    return Promise.all(callbackLoaded.map((fn) => fn()));
}
