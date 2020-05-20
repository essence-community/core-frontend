import {IBuilderConfig} from "@essence-community/constructor-share/types";
import {IField} from "@essence-community/constructor-share/Form";
import {isEmpty} from "@essence-community/constructor-share/utils";

export function getTip(bc: IBuilderConfig, field: IField, reqCount: number): string {
    const columnsCount = bc.childs ? bc.childs.length : 0;
    const value = isEmpty(field.value) ? columnsCount : Number(field.value);

    if (value < 0) {
        return `0 / ${value * -1}`;
    }

    return ` ${columnsCount - value} / ${reqCount}`;
}
