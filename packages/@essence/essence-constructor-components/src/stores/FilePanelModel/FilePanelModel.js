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
import {type BuilderBaseType, type BuilderModeType} from "../../BuilderType";
import {type RecordsModelType} from "../RecordsModel";
import {GridModel} from "../GridModel";
import {StoreBaseModel} from "../StoreBaseModel";
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

    gridStore: GridModel;

    constructor({pageStore, bc}: FilePanelConstructorType) {
        super({bc, pageStore});

        this.btnsConfig = getFilePanelBtnsConfig(bc);
        this.gridStore = new GridModel({
            bc: {
                ...this.bc,
                childwindow: [
                    {
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
                    },
                ],
                orderdirection: "asc",
                orderproperty: VAR_RECORD_ID,
                type: "GRID",
            },
            pageStore: this.pageStore,
        });
        this.recordsStore = this.gridStore.recordsStore;
    }

    addFileAction = action("defaultHandlerBtnAction", (mode: BuilderModeType, bc: BuilderBaseType) =>
        this.gridStore.defaultHandlerBtnAction(mode, bc, {ckwindow: "add_document"}),
    );

    deleteAction = action("deleteAction", (mode: BuilderModeType, btnBc: BuilderBaseType, {record, form}) =>
        this.gridStore.recordsStore.saveAction(record, btnBc.modeaction || "3", {
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
