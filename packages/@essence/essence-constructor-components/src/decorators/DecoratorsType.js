// @flow
import {WithT} from "@essence/essence-constructor-share/utils";
import {type PageModelType} from "../stores/PageModel";
import {type BuilderFieldType} from "../TextField/BuilderFieldType";

export type WithFieldPropsType = WithT & {
    autoremove?: boolean,
    parentKey?: string,
    bc: BuilderFieldType,
    hidden?: boolean,
    disabled?: boolean,
    editing?: boolean,
    pageStore: PageModelType,
    onExpand?: () => void,
};

export type WithFieldInjectPropsType = {
    form: Object | void,
    field: Object | void,
};
