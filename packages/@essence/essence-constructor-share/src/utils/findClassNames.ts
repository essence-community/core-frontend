import {IBuilderConfig} from "../types";

function findClassNamesRecursive(bc: IBuilderConfig, acc: string[]): string[] {
    if (bc.topbtn) {
        bc.topbtn.forEach((childBc) => findClassNamesRecursive(childBc, acc));
    }

    if (bc.bottombtn) {
        bc.bottombtn.forEach((childBc) => findClassNamesRecursive(childBc, acc));
    }

    if (bc.childs) {
        bc.childs.forEach((childBc) => findClassNamesRecursive(childBc, acc));
    }

    if (bc.childwindow) {
        bc.childwindow.forEach((childBc) => findClassNamesRecursive(childBc, acc));
    }

    if (bc.columns) {
        bc.columns.forEach((childBc) => findClassNamesRecursive(childBc, acc));
    }

    /*
     * TODO: editors should be array always
     */
    if (bc.editors && bc.editors !== "false") {
        bc.editors.forEach((childBc) => findClassNamesRecursive(childBc, acc));
    }

    if (bc.filters) {
        bc.filters.forEach((childBc) => findClassNamesRecursive(childBc, acc));
    }

    if (bc.type) {
        if (bc.datatype) {
            acc.push(`${bc.type}.${bc.datatype.toUpperCase()}`);
        } else {
            acc.push(bc.type);
        }
    }

    return acc;
}

/**
 * Get all name's of classes in childs/btns recursively
 *
 * @param bcs {IBuilderConfig[]} Builder Configs
 */
export const findClassNames = (bcs: IBuilderConfig[]): string[] => {
    const classNames: string[] = [];

    bcs.forEach((bc) => {
        classNames.push(...findClassNamesRecursive(bc, []));
    });

    return Array.from(new Set(classNames));
};
