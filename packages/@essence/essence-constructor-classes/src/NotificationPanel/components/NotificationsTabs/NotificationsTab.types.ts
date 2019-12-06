import {IBuilderConfig, IClassProps} from "@essence/essence-constructor-share";

export interface ITabBc extends IBuilderConfig {
    value: string;
}
export interface INotificationsTabProps extends IClassProps {
    bc: ITabBc;
    selected: boolean;
}
