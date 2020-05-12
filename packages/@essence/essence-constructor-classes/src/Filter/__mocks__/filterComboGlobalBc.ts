import {
    VAR_RECORD_PAGE_OBJECT_ID,
    VAR_RECORD_OBJECT_ID,
    VAR_RECORD_QUERY_ID,
    VAR_RECORD_NAME,
} from "@essence-community/constructor-share/constants";

export const filterComboGlobalBc = {
    [VAR_RECORD_NAME]: "filter",
    [VAR_RECORD_OBJECT_ID]: "filter",
    [VAR_RECORD_PAGE_OBJECT_ID]: "filter",
    childs: [
        {
            [VAR_RECORD_NAME]: "filter_combo",
            [VAR_RECORD_OBJECT_ID]: "filter_combo",
            [VAR_RECORD_PAGE_OBJECT_ID]: "filter_combo",
            [VAR_RECORD_QUERY_ID]: "jNSIRclOKOPF",
            autoload: "true",
            column: "combo_1",
            datatype: "combo",
            defaultvalue: "first",
            setglobal: "kd_okopf=g_kd_okopf,nm_okopf_abbr=g_nm_okopf_abbr",
            type: "IFIELD",
            valuefield: "kd_okopf",
        },
        {
            [VAR_RECORD_NAME]: "filter_text",
            [VAR_RECORD_OBJECT_ID]: "filter_text",
            [VAR_RECORD_PAGE_OBJECT_ID]: "filter_text",
            column: "value_1",
            datatype: "text",
            getglobal: "g_kd_okopf",
            type: "IFIELD",
        },
        {
            [VAR_RECORD_NAME]: "filter_text2",
            [VAR_RECORD_OBJECT_ID]: "filter_text2",
            [VAR_RECORD_PAGE_OBJECT_ID]: "filter_text2",
            column: "value_2",
            datatype: "text",
            getglobal: "g_nm_okopf_abbr",
            type: "IFIELD",
        },
    ],
    filtervaluessave: "true",
};
