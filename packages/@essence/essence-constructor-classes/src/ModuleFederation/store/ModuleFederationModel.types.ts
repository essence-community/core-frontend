import {IStoreBaseModelProps} from "@essence-community/constructor-share/types";
import {IGetValue} from "@essence-community/constructor-share/utils/parser";
import {IEventConfig} from "../types";

export declare type TDispatchMessage = (config: IEventConfig, id: string, messageType: string, data?: unknown) => void;

export interface IEventHandle {
    handle: TDispatchMessage;
    config: IEventConfig;
}

export interface IEventHandles {
    [key: string]: IEventHandle[];
}

export interface IModuleFederationModelProps extends IStoreBaseModelProps {
    getValue: IGetValue["get"];
}
