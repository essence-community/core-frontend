import {
    VAR_RECORD_PARENT_ID,
    VAR_RECORD_PAGE_OBJECT_ID,
    VAR_RECORD_OBJECT_ID,
    VAR_RECORD_DISPLAYED,
    VAR_RECORD_NAME,
    VAR_RECORD_MASTER_ID,
    VAR_RECORD_QUERY_ID,
} from "@essence-community/constructor-share/constants";
import {mergeComponents} from "@essence-community/constructor-share/utils";
import {IBuilderConfig} from "@essence-community/constructor-share/types";

const getAddBtnConfig = (bc: IBuilderConfig, layoutTheme: number): IBuilderConfig => ({
    [VAR_RECORD_DISPLAYED]: "static:3a5239ee97d9464c9c4143c18fda9815",
    [VAR_RECORD_NAME]: "Add Document Button",
    [VAR_RECORD_OBJECT_ID]: `${bc[VAR_RECORD_OBJECT_ID]}_add`,
    [VAR_RECORD_PAGE_OBJECT_ID]: `${bc[VAR_RECORD_PAGE_OBJECT_ID]}_add`,
    [VAR_RECORD_PARENT_ID]: bc[VAR_RECORD_PAGE_OBJECT_ID],
    handler: "onAddFileAction",
    hidden: layoutTheme === 1 ? undefined : false,
    iconfont: "fa-plus",
    iconfontname: "fa",
    mode: "1",
    onlyicon: layoutTheme === 1 ? undefined : true,
    reqsel: false,
    type: "BTN",
    uitype: "4",
});

export const getSaveBtnConfig = (bc: IBuilderConfig): IBuilderConfig => ({
    [VAR_RECORD_DISPLAYED]: "static:0e55e1e9994c44f7978f3b76f5bd819f",
    [VAR_RECORD_NAME]: "Override Save Button",
    [VAR_RECORD_OBJECT_ID]: `${bc[VAR_RECORD_OBJECT_ID]}_gridwindow-save`,
    [VAR_RECORD_PAGE_OBJECT_ID]: `${bc[VAR_RECORD_PAGE_OBJECT_ID]}_gridwindow-save`,
    [VAR_RECORD_PARENT_ID]: `${bc[VAR_RECORD_PAGE_OBJECT_ID]}_gridwindow`,
    filemode: bc.filemode,
    filetypes: "doc,docx,pdf,zip,txt,ods,odt,xls,xlsx",
    handler: "onSaveFile",
    maxfile: 5242880,
    mode: "8",
    type: "BTN",
});

export const getCancelBtnConfig = (bc: IBuilderConfig): IBuilderConfig => ({
    [VAR_RECORD_DISPLAYED]: "static:64aacc431c4c4640b5f2c45def57cae9",
    [VAR_RECORD_OBJECT_ID]: `${bc[VAR_RECORD_OBJECT_ID]}_gridwindow-cancel`,
    [VAR_RECORD_PAGE_OBJECT_ID]: `${bc[VAR_RECORD_PAGE_OBJECT_ID]}_gridwindow-cancel`,
    [VAR_RECORD_PARENT_ID]: `${bc[VAR_RECORD_PAGE_OBJECT_ID]}_gridwindow`,
    confirmquestion: "static:9b475e25ae8a40b0b158543b84ba8c08",
    confirmquestionposition: "top",
    handler: "onCloseWindow",
    readonly: false,
    type: "BTN",
    uitype: "2",
});

export const getDownloadBtnConfig = (bc: IBuilderConfig): IBuilderConfig => ({
    [VAR_RECORD_DISPLAYED]: "static:02260da507494f2f9956ba9e0f37b1f1",
    [VAR_RECORD_OBJECT_ID]: `${bc[VAR_RECORD_OBJECT_ID]}-download`,
    [VAR_RECORD_PAGE_OBJECT_ID]: `${bc[VAR_RECORD_PAGE_OBJECT_ID]}-download`,
    [VAR_RECORD_PARENT_ID]: bc[VAR_RECORD_PAGE_OBJECT_ID],
    readonly: false,
    type: "BTN",
});

const getDeleteButton = (bc: IBuilderConfig): IBuilderConfig => ({
    [VAR_RECORD_DISPLAYED]: "static:f7e324760ede4c88b4f11f0af26c9e97",
    [VAR_RECORD_OBJECT_ID]: `${bc[VAR_RECORD_OBJECT_ID]}-cancel`,
    [VAR_RECORD_PAGE_OBJECT_ID]: `${bc[VAR_RECORD_PAGE_OBJECT_ID]}-cancel`,
    [VAR_RECORD_PARENT_ID]: bc[VAR_RECORD_PAGE_OBJECT_ID],
    handler: "onDeleteRecord",
    iconfont: "times",
    iconfontname: "fa",
    onlyicon: true,
    type: "BTN",
});

const getBtnAuditConfig = (bc: IBuilderConfig): IBuilderConfig => ({
    [VAR_RECORD_DISPLAYED]: "static:627518f4034947aa9989507c5688cfff",
    [VAR_RECORD_MASTER_ID]: bc[VAR_RECORD_PAGE_OBJECT_ID],
    [VAR_RECORD_PAGE_OBJECT_ID]: `${bc[VAR_RECORD_PAGE_OBJECT_ID]}-audit`,
    [VAR_RECORD_PARENT_ID]: bc[VAR_RECORD_PAGE_OBJECT_ID],
    iconfont: "info",
    iconfontname: "fa",
    onlyicon: true,
    readonly: false,
    reqsel: true,
    type: "AUDIT_INFO",
    uitype: "11",
});

const getBtnRefreshConfig = (bc: IBuilderConfig): IBuilderConfig => ({
    [VAR_RECORD_DISPLAYED]: "static:33c9b02a9140428d9747299b9a767abb",
    [VAR_RECORD_MASTER_ID]: bc[VAR_RECORD_PAGE_OBJECT_ID],
    [VAR_RECORD_PAGE_OBJECT_ID]: `${bc[VAR_RECORD_PAGE_OBJECT_ID]}-refresh`,
    [VAR_RECORD_PARENT_ID]: bc[VAR_RECORD_PAGE_OBJECT_ID],
    handler: "onRefresh",
    iconfont: "refresh",
    iconfontname: "fa",
    onlyicon: true,
    readonly: false,
    type: "BTN",
    uitype: "11",
});

export const getFilePanelBtnsConfig = (bc: IBuilderConfig, layoutTheme: number) => {
    const topBtn = bc.topbtn?.map((bcBtn) => {
        if (bcBtn.type === "AUDIT_INFO") {
            return {
                ...bcBtn,
                [VAR_RECORD_NAME]: "Override Audit Button",
            };
        }

        return bcBtn;
    });
    const {overrides} = mergeComponents(
        topBtn,
        {
            "Override Add Button": getAddBtnConfig(bc, layoutTheme),
            "Override Audit Button": getBtnAuditConfig(bc),
            "Override Cancel Button": getCancelBtnConfig(bc),
            "Override Delete Button": getDeleteButton(bc),
            "Override Download Button": getDownloadBtnConfig(bc),
            "Override Refresh Button": getBtnRefreshConfig(bc),
            "Override Save Button": getSaveBtnConfig(bc),
        },
        {
            include: ["setglobal", "valuefield", "idproperty", VAR_RECORD_QUERY_ID],
        },
    );

    return overrides;
};
