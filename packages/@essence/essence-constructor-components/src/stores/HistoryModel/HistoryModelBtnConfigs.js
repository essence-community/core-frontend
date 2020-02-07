// @flow
import {
    VAR_RECORD_PARENT_ID,
    VAR_RECORD_MASTER_ID,
    VAR_RECORD_PAGE_OBJECT_ID,
    VAR_RECORD_OBJECT_ID,
    VAR_RECORD_DISPLAYED,
    VAR_RECORD_NAME,
    VAR_RECORD_ROUTE_PAGE_ID,
    VAR_RECORD_CN_ORDER,
} from "@essence-community/constructor-share/constants";
import {styleTheme} from "../../constants";
import {type BuilderBaseType} from "../../BuilderType";

export function getHistoryAddButtonConfig(bc: BuilderBaseType) {
    return {
        [VAR_RECORD_CN_ORDER]: 1e6,
        [VAR_RECORD_DISPLAYED]: "static:3a5239ee97d9464c9c4143c18fda9815",
        [VAR_RECORD_NAME]: "Override Add Button",
        [VAR_RECORD_OBJECT_ID]: `${bc[VAR_RECORD_OBJECT_ID]}_add`,
        [VAR_RECORD_PAGE_OBJECT_ID]: `${bc[VAR_RECORD_PAGE_OBJECT_ID]}_add`,
        [VAR_RECORD_PARENT_ID]: bc[VAR_RECORD_PAGE_OBJECT_ID],
        [VAR_RECORD_ROUTE_PAGE_ID]: bc[VAR_RECORD_ROUTE_PAGE_ID],
        handler: "addAction",
        iconfont: "fa-plus",
        iconfontname: "fa",
        mode: "1",
        onlyicon: "true",
        reqsel: "false",
        type: "BTN",
        uitype: "1",
    };
}

export function getHistoryCloneButtonConfig(bc: BuilderBaseType) {
    return {
        [VAR_RECORD_CN_ORDER]: 1e6,
        [VAR_RECORD_DISPLAYED]: "static:54e15e2eec334f3c839a64cde73c2dcb",
        [VAR_RECORD_MASTER_ID]: bc[VAR_RECORD_PAGE_OBJECT_ID],
        [VAR_RECORD_NAME]: "Override Clone Button",
        [VAR_RECORD_OBJECT_ID]: `${bc[VAR_RECORD_OBJECT_ID]}_clone`,
        [VAR_RECORD_PAGE_OBJECT_ID]: `${bc[VAR_RECORD_PAGE_OBJECT_ID]}_clone`,
        [VAR_RECORD_ROUTE_PAGE_ID]: bc[VAR_RECORD_ROUTE_PAGE_ID],
        handler: "cloneAction",
        iconfont: "clone",
        iconfontname: "fa",
        onlyicon: "true",
        type: "BTN",
    };
}

export function getHistoryRemoveButtonConfig(bc: BuilderBaseType) {
    return {
        [VAR_RECORD_CN_ORDER]: 1e6,
        [VAR_RECORD_DISPLAYED]: "static:f7e324760ede4c88b4f11f0af26c9e97",
        [VAR_RECORD_MASTER_ID]: bc[VAR_RECORD_PAGE_OBJECT_ID],
        [VAR_RECORD_NAME]: "Override Delete Button",
        [VAR_RECORD_OBJECT_ID]: `${bc[VAR_RECORD_OBJECT_ID]}_remove`,
        [VAR_RECORD_PAGE_OBJECT_ID]: `${bc[VAR_RECORD_PAGE_OBJECT_ID]}_remove`,
        [VAR_RECORD_ROUTE_PAGE_ID]: bc[VAR_RECORD_ROUTE_PAGE_ID],
        confirmquestion: "static:0cd0fc9bff2641f68f0f9712395f7b82",
        handler: "removeRecordAction",
        iconfont: "trash-o",
        iconfontname: "fa",
        onlyicon: "true",
        type: "BTN",
    };
}

export function getHistoryRefreshButtonConfig(bc: BuilderBaseType) {
    return {
        [VAR_RECORD_CN_ORDER]: 1e6,
        [VAR_RECORD_DISPLAYED]: "static:33c9b02a9140428d9747299b9a767abb",
        [VAR_RECORD_MASTER_ID]: bc[VAR_RECORD_PAGE_OBJECT_ID],
        [VAR_RECORD_NAME]: "Override Refresh Button",
        [VAR_RECORD_OBJECT_ID]: `${bc[VAR_RECORD_OBJECT_ID]}_refresh`,
        [VAR_RECORD_PAGE_OBJECT_ID]: `${bc[VAR_RECORD_PAGE_OBJECT_ID]}_refresh`,
        handler: "loadRecordsAction",
        iconfont: "refresh",
        iconfontname: "fa",
        onlyicon: "true",
        readonly: "false",
        type: "BTN",
    };
}

export function getHistoryEditButtonConfig(bc: BuilderBaseType) {
    return {
        [VAR_RECORD_CN_ORDER]: 1e6,
        [VAR_RECORD_DISPLAYED]: "static:deb1b07ddddf43c386682b20504fea0d",
        [VAR_RECORD_MASTER_ID]: bc[VAR_RECORD_PAGE_OBJECT_ID],
        [VAR_RECORD_NAME]: "Override Edit Button",
        [VAR_RECORD_OBJECT_ID]: `${bc[VAR_RECORD_OBJECT_ID]}_edit`,
        [VAR_RECORD_PAGE_OBJECT_ID]: `${bc[VAR_RECORD_PAGE_OBJECT_ID]}_edit`,
        handler: "editAction",
        iconfont: "edit",
        iconfontname: "fa",
        onlyicon: "true",
        type: "BTN",
    };
}

export function getHistoryLeftButtonConfig(bc: BuilderBaseType) {
    return {
        [VAR_RECORD_CN_ORDER]: 1e6,
        [VAR_RECORD_DISPLAYED]: "static:d529fbf32aae4b85b9971fca87b4e409",
        [VAR_RECORD_MASTER_ID]: bc[VAR_RECORD_PAGE_OBJECT_ID],
        [VAR_RECORD_NAME]: "Override Left Button",
        [VAR_RECORD_OBJECT_ID]: `${bc[VAR_RECORD_OBJECT_ID]}_prev_record`,
        [VAR_RECORD_PAGE_OBJECT_ID]: `${bc[VAR_RECORD_PAGE_OBJECT_ID]}_prev_record`,
        handler: "setNextRecord",
        iconfont: "chevron-left",
        iconfontname: "fa",
        onlyicon: "true",
        readonly: "false",
        type: "BTN",
    };
}

export function getHistoryRightButtonConfig(bc: BuilderBaseType) {
    return {
        [VAR_RECORD_CN_ORDER]: 1e6,
        [VAR_RECORD_DISPLAYED]: "static:e00978fb845249fdbdf003cd0aa2898e",
        [VAR_RECORD_MASTER_ID]: bc[VAR_RECORD_PAGE_OBJECT_ID],
        [VAR_RECORD_NAME]: "Override Right Button",
        [VAR_RECORD_OBJECT_ID]: `${bc[VAR_RECORD_OBJECT_ID]}_next_record`,
        [VAR_RECORD_PAGE_OBJECT_ID]: `${bc[VAR_RECORD_PAGE_OBJECT_ID]}_next_record`,
        handler: "setPrevRecord",
        iconfont: "chevron-right",
        iconfontname: "fa",
        onlyicon: "true",
        readonly: "false",
        type: "BTN",
    };
}

export function getBtnAuditConfig(bc: BuilderBaseType) {
    return {
        [VAR_RECORD_CN_ORDER]: 1e6,
        [VAR_RECORD_DISPLAYED]: "static:627518f4034947aa9989507c5688cfff",
        [VAR_RECORD_MASTER_ID]: bc[VAR_RECORD_PAGE_OBJECT_ID],
        [VAR_RECORD_NAME]: "Override Audit Button",
        [VAR_RECORD_OBJECT_ID]: `${bc[VAR_RECORD_OBJECT_ID]}-audit`,
        [VAR_RECORD_PAGE_OBJECT_ID]: `${bc[VAR_RECORD_PAGE_OBJECT_ID]}-audit`,
        iconfont: "info",
        iconfontname: "fa",
        onlyicon: "true",
        readonly: "false",
        reqsel: "true",
        type: "BTN",
    };
}

export const getSaveBtnConfig = (bc: BuilderBaseType) => ({
    [VAR_RECORD_CN_ORDER]: 1e6,
    [VAR_RECORD_DISPLAYED]: "static:8a930c6b5dd440429c0f0e867ce98316",
    [VAR_RECORD_NAME]: "Override Save Button",
    [VAR_RECORD_OBJECT_ID]: `${bc[VAR_RECORD_OBJECT_ID]}-save`,
    [VAR_RECORD_PAGE_OBJECT_ID]: `${bc[VAR_RECORD_PAGE_OBJECT_ID]}-save`,
    [VAR_RECORD_PARENT_ID]: bc[VAR_RECORD_PAGE_OBJECT_ID],
    handler: "onSimpleSave",
    iconfont: styleTheme === "dark" ? "save" : undefined,
    iconsize: "xs",
    type: "BTN",
});

export const getCancelBtnConfig = (bc: BuilderBaseType) => ({
    [VAR_RECORD_CN_ORDER]: 1e6,
    [VAR_RECORD_DISPLAYED]: "static:64aacc431c4c4640b5f2c45def57cae9",
    [VAR_RECORD_NAME]: "Override Cancel Button",
    [VAR_RECORD_OBJECT_ID]: `${bc[VAR_RECORD_OBJECT_ID]}-cancel`,
    [VAR_RECORD_PAGE_OBJECT_ID]: `${bc[VAR_RECORD_PAGE_OBJECT_ID]}-cancel`,
    [VAR_RECORD_PARENT_ID]: bc[VAR_RECORD_PAGE_OBJECT_ID],
    confirmquestion: "static:9b475e25ae8a40b0b158543b84ba8c08",
    handler: "onCloseWindow",
    iconfont: styleTheme === "dark" ? "times" : undefined,
    iconsize: "xs",
    type: "BTN",
    uitype: "2",
});
