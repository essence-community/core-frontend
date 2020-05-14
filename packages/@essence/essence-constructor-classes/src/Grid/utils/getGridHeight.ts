import {IBuilderConfig} from "@essence-community/constructor-share/types";

export function getGridHeight(bc: IBuilderConfig): number | undefined {
    if (bc.height !== undefined) {
        return parseInt(bc.height, 10);
    }

    return undefined;
}
