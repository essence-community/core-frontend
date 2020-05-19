/*
 * TODO: Переделать удаление и загрузку, нужно перенести в рекордс или реквест
 * @flow
 */
import {action} from "mobx";
import {stringify} from "qs";
import noop from "lodash/noop";
import {
    VAR_RECORD_ID,
    VAR_RECORD_PARENT_ID,
    VAR_RECORD_PAGE_OBJECT_ID,
    VAR_RECORD_DISPLAYED,
    VAR_RECORD_NAME,
    VAR_RECORD_ROUTE_PAGE_ID,
    META_PAGE_OBJECT,
} from "@essence-community/constructor-share/constants";
import {RecordsModel, StoreBaseModel} from "@essence-community/constructor-share/models";
import {type BuilderBaseType, type BuilderModeType} from "../../BuilderType";
import {getFilePanelBtnsConfig} from "./FilePanelModelBtnConfigs";
import {
    type FilePanelModelType,
    type FilePanelConstructorType,
    type FilePanelBcType,
    type FilePanelBtnsConfigType,
} from "./FilePanelModelTypes";

export class FilePanelModel extends StoreBaseModel implements FilePanelModelType {
    name = "filePanel";

    bc: FilePanelBcType;

    recordsStore: RecordsModelType;

    btnsConfig: FilePanelBtnsConfigType;

    childwindow: FilePanelBcType;

    constructor({pageStore, bc}: FilePanelConstructorType) {
        super({bc, pageStore});

        this.btnsConfig = getFilePanelBtnsConfig(bc);
        this.childwindow = {
            [VAR_RECORD_DISPLAYED]: "static:6a4c7f4488164e7e8fabd46e0cc01ccc",
            [VAR_RECORD_NAME]: "",
            [VAR_RECORD_PAGE_OBJECT_ID]: `${this.bc[VAR_RECORD_PAGE_OBJECT_ID]}_gridwindow`,
            [VAR_RECORD_PARENT_ID]: this.bc[VAR_RECORD_PAGE_OBJECT_ID],
            [VAR_RECORD_ROUTE_PAGE_ID]: this.bc[VAR_RECORD_ROUTE_PAGE_ID],
            bottombtn: [
                this.btnsConfig.overrides["Override Save Button"],
                this.btnsConfig.overrides["Override Cancel Button"],
            ],
            childs: this.bc.childs,
            ckwindow: "add_document",
            columns: this.bc.columns,
        };
        this.recordsStore = new RecordsModel(
            {...this.bc, setrecordtoglobal: undefined},
            {
                pageStore: this.pageStore,
                parentStore: this,
            },
        );
    }

    addFileAction = action("defaultHandlerBtnAction", (mode: BuilderModeType, bc: BuilderBaseType) =>
        this.pageStore.createWindowAction({
            ...this.childwindow,
            mode: bc.mode,
        }),
    );

    saveAction = action("saveAction", (values, config) => {
        const {actionBc, files, mode, form} = config;

        return this.recordsStore.saveAction(values, mode, {
            actionBc,
            files,
            form,
            query: actionBc.updatequery,
        });
    });

    deleteAction = action("deleteAction", (mode: BuilderModeType, btnBc: BuilderBaseType, {values, form}) =>
        this.recordsStore.saveAction(values, btnBc.modeaction || "3", {
            actionBc: btnBc,
            form,
            query: btnBc.updatequery,
        }),
    );

    getDownloadQueryParams = (fileId: string | number) => {
        const btnBc = this.btnsConfig.overrides["Override Download Button"];

        const url = {
            [META_PAGE_OBJECT]: this.bc[VAR_RECORD_PAGE_OBJECT_ID],
            action: "file",
            json: JSON.stringify({
                filter: {
                    [VAR_RECORD_ID]: fileId,
                },
            }),
            plugin: btnBc.extraplugingate || this.bc.extraplugingate,
            query: btnBc.updatequery,
            session: this.pageStore.applicationStore.session,
        };

        return stringify(url);
    };

    clearStoreAction = noop;

    reloadStoreAction = action("reloadStoreAction", () => this.recordsStore.loadRecordsAction());
}
