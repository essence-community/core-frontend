// @flow
import {styleTheme} from "../../constants";
import {type BuilderBaseType} from "../../BuilderType";

export function getHistoryAddButtonConfig(bc: BuilderBaseType) {
    return {
        ckObject: `${bc.ckObject}_add`,
        ckPage: bc.ckPage,
        ckPageObject: `${bc.ckPageObject}_add`,
        ckParent: bc.ckPageObject,
        cnOrder: 1e6,
        cvDisplayed: "3a5239ee97d9464c9c4143c18fda9815",
        cvName: "Override Add Button",
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
        ckMaster: bc.ckPageObject,
        ckObject: `${bc.ckObject}_clone`,
        ckPage: bc.ckPage,
        ckPageObject: `${bc.ckPageObject}_clone`,
        cnOrder: 1e6,
        cvDisplayed: "54e15e2eec334f3c839a64cde73c2dcb",
        cvName: "Override Clone Button",
        handler: "cloneAction",
        iconfont: "clone",
        iconfontname: "fa",
        onlyicon: "true",
        type: "BTN",
    };
}

export function getHistoryRemoveButtonConfig(bc: BuilderBaseType) {
    return {
        ckMaster: bc.ckPageObject,
        ckObject: `${bc.ckObject}_remove`,
        ckPage: bc.ckPage,
        ckPageObject: `${bc.ckPageObject}_remove`,
        cnOrder: 1e6,
        confirmquestion: "0cd0fc9bff2641f68f0f9712395f7b82",
        cvDisplayed: "f7e324760ede4c88b4f11f0af26c9e97",
        cvName: "Override Delete Button",
        handler: "removeRecordAction",
        iconfont: "trash-o",
        iconfontname: "fa",
        onlyicon: "true",
        type: "BTN",
    };
}

export function getHistoryRefreshButtonConfig(bc: BuilderBaseType) {
    return {
        ckMaster: bc.ckPageObject,
        ckObject: `${bc.ckObject}_refresh`,
        ckPageObject: `${bc.ckPageObject}_refresh`,
        cnOrder: 1e6,
        cvDisplayed: "33c9b02a9140428d9747299b9a767abb",
        cvName: "Override Refresh Button",
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
        ckMaster: bc.ckPageObject,
        ckObject: `${bc.ckObject}_edit`,
        ckPageObject: `${bc.ckPageObject}_edit`,
        cnOrder: 1e6,
        cvDisplayed: "deb1b07ddddf43c386682b20504fea0d",
        cvName: "Override Edit Button",
        handler: "editAction",
        iconfont: "edit",
        iconfontname: "fa",
        onlyicon: "true",
        type: "BTN",
    };
}

export function getHistoryLeftButtonConfig(bc: BuilderBaseType) {
    return {
        ckMaster: bc.ckPageObject,
        ckObject: `${bc.ckObject}_prev_record`,
        ckPageObject: `${bc.ckPageObject}_prev_record`,
        cnOrder: 1e6,
        cvDisplayed: "d529fbf32aae4b85b9971fca87b4e409",
        cvName: "Override Left Button",
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
        ckMaster: bc.ckPageObject,
        ckObject: `${bc.ckObject}_next_record`,
        ckPageObject: `${bc.ckPageObject}_next_record`,
        cnOrder: 1e6,
        cvDisplayed: "e00978fb845249fdbdf003cd0aa2898e",
        cvName: "Override Right Button",
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
        ckMaster: bc.ckPageObject,
        ckObject: `${bc.ckObject}-audit`,
        ckPageObject: `${bc.ckPageObject}-audit`,
        cnOrder: 1e6,
        cvDisplayed: "627518f4034947aa9989507c5688cfff",
        cvName: "Override Audit Button",
        iconfont: "info",
        iconfontname: "fa",
        onlyicon: "true",
        readonly: "false",
        reqsel: "true",
        type: "BTN",
    };
}

export const getSaveBtnConfig = (bc: BuilderBaseType) => ({
    ckObject: `${bc.ckObject}-save`,
    ckPageObject: `${bc.ckPageObject}-save`,
    ckParent: bc.ckPageObject,
    cnOrder: 1e6,
    cvDisplayed: "8a930c6b5dd440429c0f0e867ce98316",
    cvName: "Override Save Button",
    handler: "onSimpleSave",
    iconfont: styleTheme === "dark" ? "save" : undefined,
    iconsize: "xs",
    type: "BTN",
});

export const getCancelBtnConfig = (bc: BuilderBaseType) => ({
    ckObject: `${bc.ckObject}-cancel`,
    ckPageObject: `${bc.ckPageObject}-cancel`,
    ckParent: bc.ckPageObject,
    cnOrder: 1e6,
    confirmquestion: "9b475e25ae8a40b0b158543b84ba8c08",
    cvDisplayed: "64aacc431c4c4640b5f2c45def57cae9",
    cvName: "Override Cancel Button",
    handler: "onCloseWindow",
    iconfont: styleTheme === "dark" ? "times" : undefined,
    iconsize: "xs",
    type: "BTN",
    uitype: "2",
});
