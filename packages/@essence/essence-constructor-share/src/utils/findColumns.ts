import {IBuilderConfig} from "../types";

/**
 * Get all columns in childs recursively
 *
 * @param bc {IBuilderConfig} Builder Config
 */
export const findColumns = (bc: IBuilderConfig, acc: string[] = []) => {
    if (bc.childs) {
        bc.childs.forEach((childBc) => findColumns(childBc, acc));
    }

    if (bc.columnstart) {
        acc.push(bc.columnstart);
    }

    if (bc.columnend) {
        acc.push(bc.columnend);
    }

    if (bc.column) {
        acc.push(bc.column);
    }

    return acc;
};
