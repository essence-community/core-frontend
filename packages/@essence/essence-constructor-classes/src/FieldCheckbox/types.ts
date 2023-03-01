import {IBuilderConfig} from "@essence-community/constructor-share/types";

export interface IBuilderClassConfig extends IBuilderConfig {
    valuetype: "boolean" | "integer";
    datatype: "boolean" | "checkbox";
    // Служебный параметр не править
    type: "IFIELD";
}
