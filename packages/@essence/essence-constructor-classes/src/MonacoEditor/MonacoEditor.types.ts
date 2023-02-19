import {IBuilderConfig} from "@essence-community/constructor-share/types";

export interface IMonacoBuilderClassConfig extends IBuilderConfig {
    monacotheme?: string;
    monacothemerule?: string;
    monacolanguage?: string;
    monacolanguagerule?: string;
    monacoline?: string | number;
    monacolinerule?: string;
    monacooptions?: Record<string, any>;
    monacooptionsrule?: string;
    // Служебный параметр не править
    type: "MONACO_EDITOR" | "MONACO_DIFF_EDITOR";
}

export interface IMonacoDiffBuilderClassConfig extends IMonacoBuilderClassConfig {
    childs: IMonacoBuilderClassConfig[];
    // Служебный параметр не править
    type: "MONACO_DIFF_EDITOR";
}
