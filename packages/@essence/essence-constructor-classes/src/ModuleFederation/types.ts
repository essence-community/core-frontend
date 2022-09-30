import {IBuilderConfig} from "@essence-community/constructor-share/types";
import {ILoadRemoteModuleOptions} from "@essence-community/constructor-share/utils/federationModule";

export interface IConfigMF extends ILoadRemoteModuleOptions {
    className?: string;
}

export interface IBuilderClassConfig extends IBuilderConfig {
    mfconfig?: IConfigMF;
    mfcomponentconfig?: Record<string, any>;
    mfcomponentconfigrule?: string;
    // Служебный параметр не править
    type: "MODULE_FEDERATION";
}
