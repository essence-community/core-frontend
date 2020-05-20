import {IBuilderConfig} from "@essence-community/constructor-share/types";

export function getColumns(childs?: IBuilderConfig[]): string[] {
    if (childs) {
        return childs.map((child) => child.column || "");
    }

    return [];
}
