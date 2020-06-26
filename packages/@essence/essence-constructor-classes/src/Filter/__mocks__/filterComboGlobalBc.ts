import {
    VAR_RECORD_PAGE_OBJECT_ID,
    VAR_RECORD_OBJECT_ID,
    VAR_RECORD_QUERY_ID,
    VAR_RECORD_NAME,
    VAR_RECORD_PARENT_ID,
} from "@essence-community/constructor-share/constants";
import {IBuilderConfig} from "@essence-community/constructor-share/types";

export const filterComboGlobalBc: IBuilderConfig = {
    [VAR_RECORD_NAME]: "filter",
    [VAR_RECORD_OBJECT_ID]: "filter",
    [VAR_RECORD_PAGE_OBJECT_ID]: "filter",
    [VAR_RECORD_PARENT_ID]: "mock",
    childs: [
        {
            [VAR_RECORD_NAME]: "filter_combo",
            [VAR_RECORD_OBJECT_ID]: "filter_combo",
            [VAR_RECORD_PAGE_OBJECT_ID]: "filter_combo",
            [VAR_RECORD_PARENT_ID]: "filter",
            [VAR_RECORD_QUERY_ID]: "jNSIRclOKOPF",
            autoload: true,
            column: "combo_1",
            datatype: "combo",
            defaultvalue: "first",
            setglobal: [
                {in: "kd_okopf", out: "g_kd_okopf"},
                {in: "nm_okopf_abbr", out: "g_nm_okopf_abbr"},
            ],
            type: "IFIELD",
            valuefield: [{in: "kd_okopf"}],
        },
        {
            [VAR_RECORD_NAME]: "filter_text",
            [VAR_RECORD_OBJECT_ID]: "filter_text",
            [VAR_RECORD_PAGE_OBJECT_ID]: "filter_text",
            [VAR_RECORD_PARENT_ID]: "filter",
            column: "value_1",
            datatype: "text",
            getglobal: "g_kd_okopf",
            type: "IFIELD",
        },
        {
            [VAR_RECORD_NAME]: "filter_text2",
            [VAR_RECORD_OBJECT_ID]: "filter_text2",
            [VAR_RECORD_PAGE_OBJECT_ID]: "filter_text2",
            [VAR_RECORD_PARENT_ID]: "filter",
            column: "value_2",
            datatype: "text",
            getglobal: "g_nm_okopf_abbr",
            type: "IFIELD",
        },
    ],
    filtervaluessave: true,
    type: "FILTER",
};
