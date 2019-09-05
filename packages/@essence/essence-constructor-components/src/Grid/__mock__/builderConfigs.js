// @flow
const getBaseColumnBc = (name) => ({
    ckObject: name,
    ckPageObject: name,
    cvName: name,
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
    childwindow: [],
    ckObject: "boolean",
    ckPageObject: "boolean",
    columns: [],
    cvName: "boolean",
    orderdirection: "ASC",
    orderproperty: "cv_value",
    type: "GRID",
};

export const gridTreeBc = {
    ...gridBc,
    type: "TREEGRID",
};
