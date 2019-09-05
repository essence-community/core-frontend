import {camelCaseMemoized} from "./transform";

export const findGetGlobalKey = (str: string): {[$key: string]: string} =>
    str.split(",").reduce((acc: {[$key: string]: string}, item) => {
        const keys = item.split("=");

        acc[camelCaseMemoized(keys[1] || keys[0])] = camelCaseMemoized(keys[0]);

        return acc;
    }, {});
