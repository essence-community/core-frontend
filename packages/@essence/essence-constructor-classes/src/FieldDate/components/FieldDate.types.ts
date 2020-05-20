import * as moment from "moment";
import {FieldValue, IClassProps, IBuilderConfig} from "@essence-community/constructor-share/types";

export interface IFieldDateProps {
    dateConfig: IDateConfig;
    className?: string;
    onChange: (value: FieldValue) => void;
    disabled?: boolean;
    value?: moment.Moment;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    getDisabledFunction: () => (val?: moment.Moment) => boolean;
}

type Mode = "time" | "date" | "month" | "year" | "decade";

export interface IDateConfig {
    component: React.FC<IFieldDateProps>;
    dateType: string;
    format: string;
    formatText: string;
    inputMask?: string;
    invalidText: (value: string) => string;
    invalidTextValidation: string;
    mode?: Mode;
    serverFormat: string;
    serverFormatEnd: (value: FieldValue) => string;
    withTime?: boolean;
}

export interface IFieldDateBuildConfig extends IBuilderConfig {
    disabledstartdate?: string;
    disabledenddate?: string;
}

export interface IFieldBuildClassProps extends IClassProps {
    bc: IFieldDateBuildConfig;
}
