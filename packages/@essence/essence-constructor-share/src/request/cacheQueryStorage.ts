/* eslint-disable compat/compat */
import md5 from "crypto-js/md5";
import hex from "crypto-js/enc-hex";
import {deepFind, getFromLocalStore, saveToLocalStore} from "../utils";
import {loggerRoot} from "../constants";
import {VAR_CACHE_DATE, VAR_RECORD_ID, VAR_SETTING_VALUE} from "../constants/variables";

const logger = loggerRoot.extend("CacheQueryStorage");

export const cacheType = ["front", "all"];

interface ICacheQuery {
    load(key?: string): Promise<void>;
    getResponse(url: string, query: string, data: Record<string, any>): Promise<any>;
    setResponse(url: string, query: string, data: Record<string, any>, response: any): Promise<void>;
}

class DisableCache implements ICacheQuery {
    async load(key?: string): Promise<void> {
        return;
    }
    async getResponse(url: string, query: string, data: Record<string, any>): Promise<any> {
        return;
    }
    async setResponse(url: string, query: string, data: Record<string, any>, response: any): Promise<void> {
        return;
    }
}

class CacheStore implements ICacheQuery {
    key = "query_cache";
    name: string;
    cache: Cache;
    querySetting: Record<string, string[]> = {};
    isLoaded = false;
    loading?: Promise<Cache>;
    async load(preKey?: string): Promise<void> {
        let key = preKey;

        if (!preKey) {
            const keyObject = (((window as any).SETTINGS as any[]) || []).find(
                (val) => val[VAR_RECORD_ID] === VAR_CACHE_DATE,
            );

            if (keyObject) {
                key = keyObject[VAR_SETTING_VALUE];
            } else {
                key = "default";
            }
        }

        if (this.loading) {
            await this.loading;

            return;
        }

        const name = `${this.key}_${key}`;

        if (name === this.name) {
            return;
        }
        this.name = name;
        this.loading = window.caches.open(name);

        this.cache = await this.loading;
        window.caches.keys().then((arr) =>
            arr.forEach((cacheKey) => {
                if (cacheKey.startsWith(this.key) && cacheKey !== name) {
                    window.caches.delete(cacheKey);
                }
            }),
        );
        this.querySetting = getFromLocalStore(name, {});
        this.isLoaded = true;
        this.loading = undefined;
    }
    async getResponse(url: string, query: string, data: Record<string, any>): Promise<any> {
        if (!this.isLoaded) {
            await this.load();
        }
        const cacheKeyParam = this.querySetting[query];

        if (!cacheKeyParam || !this.cache) {
            return;
        }
        const params = cacheKeyParam.reduce((res, val) => {
            const [isExist, value] = deepFind(data, val);

            if (isExist) {
                res.push(value);
            }

            return res;
        }, []);
        const hash = md5(JSON.stringify(params)).toString(hex);
        const path = `${url}/cache/${query}_${hash}.json`;

        try {
            const response = await this.cache.match(path);

            if (response.status === 200) {
                return await response.json();
            }
        } catch (e) {
            logger(e);
        }

        return;
    }
    async setResponse(url: string, query: string, data: Record<string, any>, response: any): Promise<void> {
        const cacheKeyParam = response.metaData.cache_key_param as string[];

        if (!cacheKeyParam || !this.cache) {
            return;
        }
        const params = cacheKeyParam.reduce((res, val) => {
            const [isExist, value] = deepFind(data, val);

            if (isExist) {
                res.push(value);
            }

            return res;
        }, []);
        const hash = md5(JSON.stringify(params)).toString(hex);
        const responseOptions = {
            headers: {
                "content-type": "application/json",
            },
            status: 200,
        };

        try {
            await this.cache.put(
                `${url}/cache/${query}_${hash}.json`,
                new Response(JSON.stringify(response), responseOptions),
            );
        } catch (e) {
            logger(e);

            return;
        }
        this.querySetting[query] = cacheKeyParam;
        saveToLocalStore(this.name, this.querySetting);

        return;
    }
}

const cacheQueryStorage = window.caches?.open ? new CacheStore() : new DisableCache();

export default cacheQueryStorage;
