import {IBuilderConfig} from "@essence/essence-constructor-share";

export interface IFieldTextareaInputProps {
    height: number;
    onChangeHeight: (height: number) => void;
    bc: IBuilderConfig;
    editing?: boolean;
}
