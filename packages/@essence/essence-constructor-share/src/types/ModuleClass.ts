import {CSSProperties} from "react";
import {IBuilderConfig} from "./Builder";
import {IClassProps} from "./Class";

export type TDispatchMessage = (id: string, messageType: string, data?: unknown) => void;

/**
 * Props for base module class
 */
export interface IModuleClassProps<BC = IBuilderConfig> extends IClassProps<BC> {
    basename?: string;
    dispatchMessage?: TDispatchMessage;
    style?: CSSProperties;
    [key: string]: any;
}
