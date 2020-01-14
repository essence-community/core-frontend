import {IBuilderConfig, IClassProps} from "@essence-community/constructor-share";

export interface ITabBc extends IBuilderConfig {
    value: string;
}
export interface INotificationsTabProps extends IClassProps {
    bc: ITabBc;
    selected: boolean;
}
