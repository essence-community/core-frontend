import {VAR_RECORD_PAGE_OBJECT_ID, VAR_RECORD_DISPLAYED} from "@essence-community/constructor-share/constants";

export default {
    [VAR_RECORD_DISPLAYED]: "static:20732b2df62f4dd5baf97d12cf2a3e9c",
    [VAR_RECORD_PAGE_OBJECT_ID]: "historypanel",
    btnaudit: true,
    childs: [
        {
            [VAR_RECORD_PAGE_OBJECT_ID]: "text_field",
            column: "cv_short",
            datatype: "text",
            maxsize: "10",
            required: "true",
            type: "IFIELD",
        },
    ],
    type: "HISTORYPANEL",
};
