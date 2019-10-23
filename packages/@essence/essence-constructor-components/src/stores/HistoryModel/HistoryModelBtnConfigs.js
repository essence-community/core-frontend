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
        cvDisplayed: "Добавить",
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
        cvDisplayed: "Клонировать",
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
        confirmquestion: "Удалить?",
        cvDisplayed: "Удалить",
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
        cvDisplayed: "Обновить",
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
        cvDisplayed: "Редактировать",
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
        cvDisplayed: "Предыдущая запись",
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
        cvDisplayed: "Следующая запись",
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
        cvDisplayed: "Информация",
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
    cvDisplayed: "Сохранить",
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
    confirmquestion: "Отменить?",
    cvDisplayed: "Отмена",
    cvName: "Override Cancel Button",
    handler: "onCloseWindow",
    iconfont: styleTheme === "dark" ? "times" : undefined,
    iconsize: "xs",
    type: "BTN",
    uitype: "2",
});
