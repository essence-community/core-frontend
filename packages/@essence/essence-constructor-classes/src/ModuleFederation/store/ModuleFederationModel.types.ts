import {IEventConfig} from "../types";

export declare type TDispatchMessage = (config: IEventConfig, id: string, messageType: string, data?: unknown) => void;

export interface IEventHandle {
    handle: TDispatchMessage;
    config: IEventConfig;
}

export interface IEventHandles {
    [key: string]: IEventHandle[];
}
