// @flow
import {
    VAR_RECORD_OBJECT_ID,
    VAR_RECORD_PAGE_OBJECT_ID,
    VAR_RECORD_NAME,
} from "@essence/essence-constructor-share/constants";

const getBaseColumnBc = (name) => ({
    [VAR_RECORD_NAME]: name,
    [VAR_RECORD_OBJECT_ID]: name,
    [VAR_RECORD_PAGE_OBJECT_ID]: name,
    datatype: name,
});

export const booleanBc = {
    ...getBaseColumnBc("boolean"),
};

export const checkboxBc = {
    ...getBaseColumnBc("checkbox"),
};

export const dateBc = {
    ...getBaseColumnBc("date"),
    format: "y.m.d",
};

export const iconBc = {
    ...getBaseColumnBc("icon"),
    iconfont: "edit",
};

export const textBc = {
    ...getBaseColumnBc("text"),
};

export const numberBc = {
    ...getBaseColumnBc("numeric"),
};

export const integerBc = {
    ...getBaseColumnBc("integer"),
};

export const treeBc = {
    ...getBaseColumnBc("tree"),
    datatypeBase: "integer",
};

export const gridBc = {
    [VAR_RECORD_NAME]: "boolean",
    [VAR_RECORD_OBJECT_ID]: "boolean",
    [VAR_RECORD_PAGE_OBJECT_ID]: "boolean",
    childwindow: [],
    columns: [],
    orderdirection: "ASC",
    orderproperty: "cv_value",
    type: "GRID",
};

export const gridTreeBc = {
    ...gridBc,
    type: "TREEGRID",
};
