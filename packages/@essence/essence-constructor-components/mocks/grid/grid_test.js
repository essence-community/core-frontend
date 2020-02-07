// @flow
import {
    VAR_RECORD_PAGE_OBJECT_ID,
    VAR_RECORD_OBJECT_ID,
    VAR_RECORD_NAME,
} from "@essence-community/constructor-share/constants";

export const columnDetail = {
    [VAR_RECORD_OBJECT_ID]: "cv_detail",
    [VAR_RECORD_PAGE_OBJECT_ID]: "cv_detail",
    colunm: "cv_detail",
    datatype: "detail",
    type: "IFIELD",
};
export const columnText = {
    [VAR_RECORD_OBJECT_ID]: "cv_value",
    [VAR_RECORD_PAGE_OBJECT_ID]: "cv_value",
    colunm: "cv_value",
    datatype: "text",
    type: "IFIELD",
};
export const gridBc = {
    [VAR_RECORD_NAME]: "grid",
    [VAR_RECORD_OBJECT_ID]: "grid",
    [VAR_RECORD_PAGE_OBJECT_ID]: "grid",
    childwindow: [],
    columns: [columnDetail, columnText],
    orderdirection: "ASC",
    orderproperty: "cv_value",
};
