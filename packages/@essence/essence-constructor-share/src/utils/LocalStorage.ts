import {IStorage} from "./storage";

export class LocalStorage implements IStorage {
    public setItem(key: string, value: string): void {
        return localStorage.setItem(key, value);
    }
    public getItem(key: string): string | null {
        return localStorage.getItem(key);
    }
    public removeItem(key: string): void {
        return localStorage.removeItem(key);
    }
    public removeFromStoreByRegex(reg: RegExp): void {
        Object.keys(localStorage).forEach((key: string) => {
            if (reg.test(key)) {
                localStorage.removeItem(key);
            }
        });
    }
    public load() {
        return Promise.resolve();
    }
}
