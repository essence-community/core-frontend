import {IBuilderConfig} from "../types";
import {camelCaseMemoized} from "./transform";

/**
 * Get all columns in childs recursively
 *
 * @param bc {IBuilderConfig} Builder Config
 */
export const findColumns = (bc: IBuilderConfig, camelize = true, acc: string[] = []) => {
    if (bc.childs) {
        bc.childs.forEach((childBc) => findColumns(childBc, camelize, acc));
    }

    if (bc.columnstart) {
        acc.push(camelize ? camelCaseMemoized(bc.columnstart) : bc.columnstart);
    }

    if (bc.columnend) {
        acc.push(camelize ? camelCaseMemoized(bc.columnend) : bc.columnend);
    }

    if (bc.column) {
        acc.push(camelize ? camelCaseMemoized(bc.column) : bc.column);
    }

    return acc;
};
