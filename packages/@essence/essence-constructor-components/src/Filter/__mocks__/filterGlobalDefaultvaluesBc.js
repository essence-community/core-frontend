// @flow

const filterGlobalDefaultvaluesBc = {
    childs: [
        {
            ckObject: "filter_text",
            ckPageObject: "filter_text",
            column: "value_1",
            cvName: "filter_text",
            datatype: "text",
            defaultvalue: "test",
            setglobal: "g_text_1",
            type: "IFIELD",
        },
        {
            ckObject: "filter_text2",
            ckPageObject: "filter_text2",
            column: "value_2",
            cvName: "filter_text2",
            datatype: "text",
            getglobal: "'t1 - '||g_text_1",
            setglobal: "g_text_2",
            type: "IFIELD",
        },
        {
            ckObject: "filter_text3",
            ckPageObject: "filter_text3",
            column: "value_3",
            cvName: "filter_text3",
            datatype: "text",
            getglobal: "'t2 - '||g_text_2",
            type: "IFIELD",
        },
        {
            ckObject: "filter_date",
            ckPageObject: "filter_date",
            column: "value_date",
            cvName: "filter_date",
            datatype: "date",
            defaultvaluequery: "GetTodayDate",
            format: "3",
            setglobal: "g_date_1",
            type: "IFIELD",
        },
        {
            ckObject: "filter_text_date",
            ckPageObject: "filter_text_date",
            column: "value_text_date",
            cvName: "value_text_date",
            datatype: "text",
            getglobal: "g_date_1",
            type: "IFIELD",
        },
    ],
    ckObject: "filter",
    ckPageObject: "filter",
    cvName: "filter",
};

export default filterGlobalDefaultvaluesBc;
