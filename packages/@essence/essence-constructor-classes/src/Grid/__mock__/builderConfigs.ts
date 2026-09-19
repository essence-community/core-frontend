import {
    VAR_RECORD_OBJECT_ID,
    VAR_RECORD_PAGE_OBJECT_ID,
    VAR_RECORD_NAME,
} from "@essence-community/constructor-share/constants";
import {getBaseBc} from "@essence-community/constructor-share/utils/test";

export const booleanBc = {
    ...getBaseBc("boolean"),
    column: "cv_value",
};

export const checkboxBc = {
    ...getBaseBc("checkbox"),
    column: "cv_value",
};

export const dateBc = {
    ...getBaseBc("date"),
    column: "cv_value",
    format: "y.m.d",
};

export const iconBc = {
    ...getBaseBc("icon"),
    column: "cv_value",
    iconfont: "edit",
};

export const textBc = {
    ...getBaseBc("text"),
    column: "cv_value",
};

export const numberBc = {
    ...getBaseBc("numeric"),
    column: "cv_value",
};

export const integerBc = {
    ...getBaseBc("integer"),
    column: "cv_value",
};

export const treeBc = {
    ...getBaseBc("tree"),
    column: "cv_value",
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
