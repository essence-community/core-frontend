import {IBuilderConfig} from "@essence-community/constructor-share/types";
import {ILoadRemoteModuleOptions} from "@essence-community/constructor-share/utils/federationModule";

export interface IConfigMF extends ILoadRemoteModuleOptions {
    className?: string;
}

export interface IEventConfig extends Record<string, any> {
    messageType: string;
    handle: string;
}

export interface IBuilderClassConfig extends IBuilderConfig {
    mfconfig?: IConfigMF;
    mfconfigfail?: IConfigMF;
    mfconfigrule?: IConfigMF;
    mfcomponentconfig?: Record<string, any>;
    mfcomponentconfigrule?: string;
    mfeventconfig?: IEventConfig[];
    // Служебный параметр не править
    type: "MODULE_FEDERATION";
}
