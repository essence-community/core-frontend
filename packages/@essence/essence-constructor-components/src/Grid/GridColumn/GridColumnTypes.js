// @flow
import * as React from "react";
import {type BuilderBaseType} from "../../BuilderType";
import {type GridModelType} from "../../stores/GridModel";
import {type PageModelType} from "../../stores/PageModel";
import {type BuilderGridType} from "../BuilderGridType";

export type GridColumnLinkType = BuilderBaseType & {
    columnsfilter?: string,
    redirecturl: string,
};

export type GridColumnPropsType = {|
    bc: Object,
    disabled?: boolean,
    hidden?: boolean,
    visible: boolean,
    value?: string | number,
    store: GridModelType,
    record?: Object,
    readOnly?: boolean,
    pageStore: PageModelType,
    qtip?: string,
    className?: string,
    gridBc: BuilderGridType,
    nesting?: number,
    trans?: (name?: string | number) => string,
|};

export type ColumnsMapType = {
    [key: string]: React.ComponentType<GridColumnPropsType>,
};
