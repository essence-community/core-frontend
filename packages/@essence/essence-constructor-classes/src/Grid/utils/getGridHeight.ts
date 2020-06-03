import {IBuilderConfig} from "@essence-community/constructor-share/types";

export function getGridHeight(bc: IBuilderConfig): number | undefined {
    if (bc.height !== undefined && bc.height.indexOf("px") !== -1) {
        return parseInt(bc.height, 10);
    }

    return undefined;
}
