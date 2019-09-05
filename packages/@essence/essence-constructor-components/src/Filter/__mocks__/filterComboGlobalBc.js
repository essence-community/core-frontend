// @flow

const filterComboGlobalBc = {
    childs: [
        {
            autoload: "true",
            ckObject: "filter_combo",
            ckPageObject: "filter_combo",
            ckQuery: "jNSIRclOKOPF",
            column: "combo_1",
            cvName: "filter_combo",
            datatype: "combo",
            defaultvalue: "first",
            setglobal: "kd_okopf=g_kd_okopf,nm_okopf_abbr=g_nm_okopf_abbr",
            type: "IFIELD",
            valuefield: "kd_okopf",
        },
        {
            ckObject: "filter_text",
            ckPageObject: "filter_text",
            column: "value_1",
            cvName: "filter_text",
            datatype: "text",
            getglobal: "g_kd_okopf",
            type: "IFIELD",
        },
        {
            ckObject: "filter_text2",
            ckPageObject: "filter_text2",
            column: "value_2",
            cvName: "filter_text2",
            datatype: "text",
            getglobal: "g_nm_okopf_abbr",
            type: "IFIELD",
        },
    ],
    ckObject: "filter",
    ckPageObject: "filter",
    cvName: "filter",
    filtervaluessave: "true",
};

export default filterComboGlobalBc;
