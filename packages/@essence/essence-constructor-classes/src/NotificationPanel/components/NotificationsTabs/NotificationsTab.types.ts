import {IBuilderConfig, IClassProps} from "@essence/essence-constructor-share";

export interface INotificationsTabProps extends IClassProps {
    bc: IBuilderConfig & {
        value: string;
    };
    selected: boolean;
}
