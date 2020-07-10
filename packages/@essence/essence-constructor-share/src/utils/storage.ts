import {settingsStore} from "../models/SettingsModel";
import {VAR_SETTING_GATE_URL, VAR_SETTING_REMOTE_STORAGE} from "../constants/variables";
import {LocalStorage} from "./LocalStorage";
import {RemoteStorage} from "./RemoteStorage";

type ValueType = string | number | any[];

export interface IStorage {
    setItem(key: string, value: string): void;
    getItem(key: string): string | null;
    removeItem(key: string): void;
    removeFromStoreByRegex(key: RegExp): void;
    load(session?: string): Promise<void>;
}
const localStore: IStorage = new LocalStorage();
const store: IStorage =
    settingsStore.settings[VAR_SETTING_REMOTE_STORAGE] === "true" ? new RemoteStorage() : localStore;

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
    return store.load(session);
}
