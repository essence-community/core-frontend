import {IField} from "@essence-community/constructor-share/Form";
import {IBuilderConfig} from "@essence-community/constructor-share/types/Builder";

export function isIncorrect(bc: IBuilderConfig, field: IField, reqCount: number): boolean {
    const value = Number(field.value);
    const columnsCount = bc.childs ? bc.childs.length : 0;

    return columnsCount - value < reqCount;
}
