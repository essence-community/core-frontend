import {settingsStore} from "../models/SettingsModel";
import {VAR_SETTING_GATE_URL, VAR_SETTING_REMOTE_STORAGE} from "../constants/variables";
import {IStorage} from "../types/Storage";
import {LocalStorage} from "./LocalStorage";
import {RemoteStorage} from "./RemoteStorage";

type ValueType = string | number | any[];

const localStore: IStorage = new LocalStorage();
let store: IStorage;

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

export function loadStore(session?: string) {
    if (!store) {
        store = settingsStore.settings[VAR_SETTING_REMOTE_STORAGE] === "true" ? new RemoteStorage() : localStore;
    }

    return store.load(session);
}
