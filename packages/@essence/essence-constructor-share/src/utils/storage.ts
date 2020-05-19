import {settingsStore} from "../models/SettingsModel";
import {VAR_SETTING_GATE_URL} from "../constants/variables";

type ValueType = string | number | any[];

function makeKey(key: string): string {
    return `${settingsStore.settings[VAR_SETTING_GATE_URL]}_${key}`;
}

export function saveToStore<T>(key: string, value: T) {
    return localStorage.setItem(makeKey(key), JSON.stringify(value));
}

export function getFromStore<T = ValueType>(key: string, defaultValue?: T): T | undefined {
    const value = localStorage.getItem(makeKey(key));

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
    localStorage.removeItem(makeKey(key));
}

export function removeFromStoreByRegex(reg: RegExp) {
    Object.keys(localStorage).forEach((key: string) => {
        if (reg.test(key)) {
            localStorage.removeItem(key);
        }
    });
}
