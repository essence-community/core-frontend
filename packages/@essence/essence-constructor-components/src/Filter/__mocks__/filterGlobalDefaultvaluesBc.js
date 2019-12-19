// @flow
import {
    VAR_RECORD_PAGE_OBJECT_ID,
    VAR_RECORD_OBJECT_ID,
    VAR_RECORD_NAME,
} from "@essence/essence-constructor-share/constants";

const filterGlobalDefaultvaluesBc = {
    [VAR_RECORD_NAME]: "filter",
    [VAR_RECORD_OBJECT_ID]: "filter",
    [VAR_RECORD_PAGE_OBJECT_ID]: "filter",
    childs: [
        {
            [VAR_RECORD_NAME]: "filter_text",
            [VAR_RECORD_OBJECT_ID]: "filter_text",
            [VAR_RECORD_PAGE_OBJECT_ID]: "filter_text",
            column: "value_1",
            datatype: "text",
            defaultvalue: "test",
            setglobal: "g_text_1",
            type: "IFIELD",
        },
        {
            [VAR_RECORD_NAME]: "filter_text2",
            [VAR_RECORD_OBJECT_ID]: "filter_text2",
            [VAR_RECORD_PAGE_OBJECT_ID]: "filter_text2",
            column: "value_2",
            datatype: "text",
            getglobal: "'t1 - '||g_text_1",
            setglobal: "g_text_2",
            type: "IFIELD",
        },
        {
            [VAR_RECORD_NAME]: "filter_text3",
            [VAR_RECORD_OBJECT_ID]: "filter_text3",
            [VAR_RECORD_PAGE_OBJECT_ID]: "filter_text3",
            column: "value_3",
            datatype: "text",
            getglobal: "'t2 - '||g_text_2",
            type: "IFIELD",
        },
        {
            [VAR_RECORD_NAME]: "filter_date",
            [VAR_RECORD_OBJECT_ID]: "filter_date",
            [VAR_RECORD_PAGE_OBJECT_ID]: "filter_date",
            column: "value_date",
            datatype: "date",
            defaultvaluequery: "GetTodayDate",
            format: "3",
            setglobal: "g_date_1",
            type: "IFIELD",
        },
        {
            [VAR_RECORD_NAME]: "value_text_date",
            [VAR_RECORD_OBJECT_ID]: "filter_text_date",
            [VAR_RECORD_PAGE_OBJECT_ID]: "filter_text_date",
            column: "value_text_date",
            datatype: "text",
            getglobal: "g_date_1",
            type: "IFIELD",
        },
    ],
};

export default filterGlobalDefaultvaluesBc;
