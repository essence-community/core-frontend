// @flow
import {Form, Field} from "mobx-react-form";
import {type PageModelType} from "../PageModel/PageModelType";
import {type GridModelType} from "../GridModel/GridModelType";
import {type BuilderBaseType, type BuilderModeType} from "../../BuilderType";
import {type StoreBaseModelInterface} from "../StoreBaseModel";

export type WindowBcType = BuilderBaseType & {
    autobuild?: "true" | "false",
    columns?: Array<BuilderBaseType>,
    childs?: Array<BuilderBaseType>,
    detail?: Array<BuilderBaseType>,
    bottombtn?: Array<BuilderBaseType>,
};
export type WindowModelConfigType = {
    mode: BuilderModeType,
};
export type WindowModelConstructorType = WindowModelConfigType & {
    bc: WindowBcType,
    gridStore?: GridModelType,
    pageStore: PageModelType,
    values?: Object,
};

export type MobxForm = Form & Field;

export type WindowSaveConfigType = {
    form: MobxForm,
    files?: File[],
};

export interface WindowModelInterface extends StoreBaseModelInterface {
    +initialValues: Object;
    +cancel: boolean;
    +addMore: boolean;
    +childs: Array<Object>;
    +windowBc: Object;
    +gridStore: ?GridModelType;
    +config: $ReadOnly<WindowModelConfigType>;
    constructor(props: WindowModelConstructorType): void;
    +closeAction: () => void;
    +setCancelAction: () => void;
    +resetCancelAction: () => void;
    +setAddMoreAction: (value: number | boolean) => void;
}
export type WindowModelType = WindowModelInterface;

export type AddWinowToPagePropsType = {
    btnBc: BuilderBaseType,
    ckWindowDefault?: string,
    gridStore: GridModelType,
    mode: BuilderModeType,
    pageStore: PageModelType,
};
