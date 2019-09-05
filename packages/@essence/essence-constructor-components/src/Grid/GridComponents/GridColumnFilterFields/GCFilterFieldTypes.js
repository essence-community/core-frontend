// @flow
import * as React from "react";
import {type PageModelType} from "../../../stores/PageModel";

type PropsType = {
    isFilled: boolean,
    fieldContent: React.Node,
};

export type GCFilterFieldBaseType = {
    bc: Object,
    form: Object,
    pageStore: PageModelType,
    parentKey?: string,
    visible: boolean,
    renderPopover: (props: PropsType) => React.Node,
};
