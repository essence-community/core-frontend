import {
    VAR_RECORD_OBJECT_ID,
    VAR_RECORD_PAGE_OBJECT_ID,
    VAR_RECORD_NAME,
} from "@essence-community/constructor-share/constants";
import {getBaseBc} from "@essence-community/constructor-share/utils/test";

export const booleanBc = {
    ...getBaseBc("boolean"),
};

export const checkboxBc = {
    ...getBaseBc("checkbox"),
};

export const dateBc = {
    ...getBaseBc("date"),
    format: "y.m.d",
};

export const iconBc = {
    ...getBaseBc("icon"),
    iconfont: "edit",
};

export const textBc = {
    ...getBaseBc("text"),
};

export const numberBc = {
    ...getBaseBc("numeric"),
};

export const integerBc = {
    ...getBaseBc("integer"),
};

export const treeBc = {
    ...getBaseBc("tree"),
    datatypeBase: "integer",
};

export const gridBc = {
    [VAR_RECORD_NAME]: "boolean",
    [VAR_RECORD_OBJECT_ID]: "boolean",
    [VAR_RECORD_PAGE_OBJECT_ID]: "boolean",
    childwindow: [],
    columns: [],
    order: [{direction: "ASC", property: "cv_value"}],
    type: "GRID",
};

export const gridTreeBc = {
    ...gridBc,
    type: "TREEGRID",
};
