/*
 * TODO: Переделать удаление и загрузку, нужно перенести в рекордс или реквест
 * @flow
 */
import {action} from "mobx";
import {stringify} from "qs";
import noop from "lodash/noop";
import {snakeCaseKeys} from "@essence/essence-constructor-share/utils";
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
                        bottombtn: [
                            this.btnsConfig.overrides["Override Save Button"],
                            this.btnsConfig.overrides["Override Cancel Button"],
                        ],
                        childs: this.bc.childs,
                        ckPage: this.bc.ckPage,
                        ckPageObject: `${this.bc.ckPageObject}_gridwindow`,
                        ckParent: this.bc.ckPageObject,
                        ckwindow: "add_document",
                        columns: this.bc.columns,
                        cvDisplayed: "6a4c7f4488164e7e8fabd46e0cc01ccc",
                        cvName: "",
                    },
                ],
                orderdirection: "asc",
                orderproperty: "ck_id",
                type: "GRID",
            },
            pageStore: this.pageStore,
        });
        this.recordsStore = this.gridStore.recordsStore;
    }

    addFileAction = action("defaultHandlerBtnAction", (mode: BuilderModeType, bc: BuilderBaseType) =>
        this.gridStore.defaultHandlerBtnAction(mode, bc, {ckwindow: "add_document"}),
    );

    deleteAction = action("deleteAction", (mode: BuilderModeType, btnBc: BuilderBaseType, {values}) =>
        this.gridStore.recordsStore.saveAction(values, btnBc.modeaction || "3", {
            actionBc: btnBc,
            query: btnBc.updatequery,
        }),
    );

    getDownloadQueryParams = (fileId: string | number) => {
        const btnBc = this.btnsConfig.overrides["Override Download Button"];

        const url = {
            action: "file",
            json: JSON.stringify(
                snakeCaseKeys({
                    filter: {
                        ckId: fileId,
                    },
                }),
            ),
            pageObject: this.bc.ckPageObject,
            plugin: btnBc.extraplugingate || this.bc.extraplugingate,
            query: btnBc.updatequery,
            session: this.pageStore.applicationStore.session,
        };

        return stringify(snakeCaseKeys(url));
    };

    clearStoreAction = noop;

    reloadStoreAction = action("reloadStoreAction", () => this.recordsStore.loadRecordsAction());
}
