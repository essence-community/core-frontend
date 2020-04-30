import {IBuilderConfig} from "@essence-community/constructor-share/types";

export interface IButtonInternalProps {
    disabled?: boolean;
    bc: IBuilderConfig;
    open: boolean;
    onClick: (event: React.SyntheticEvent) => void;
}
