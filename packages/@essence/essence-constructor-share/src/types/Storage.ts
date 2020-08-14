export interface IStorage {
    setItem(key: string, value: string): void;
    getItem(key: string): string | null;
    removeItem(key: string): void;
    removeFromStoreByRegex(key: RegExp): void;
    load(session?: string): Promise<void>;
}
