// @flow
import {type PageModelType} from "../../../stores/PageModel";
import {type BuilderBaseType} from "../../../BuilderType";
import {type BuilderFieldPropsType} from "../../BuilderFieldType";

export type PropsType = BuilderFieldPropsType & {
    bc: BuilderBaseType,
    disabled: boolean,
    pageStore: PageModelType,
    visible: boolean,
    parentBc?: BuilderBaseType,
    readOnly: boolean,
    updateglobal: string,
};
