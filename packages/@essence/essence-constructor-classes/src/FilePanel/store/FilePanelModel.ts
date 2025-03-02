import {action, makeObservable} from "mobx";
import {stringify} from "qs";
import {
    VAR_RECORD_ID,
    VAR_RECORD_MASTER_ID,
    VAR_RECORD_PARENT_ID,
    VAR_RECORD_PAGE_OBJECT_ID,
    VAR_RECORD_DISPLAYED,
    VAR_RECORD_NAME,
    META_PAGE_OBJECT,
    VAR_RECORD_ROUTE_PAGE_ID,
    META_PAGE_ID,
} from "@essence-community/constructor-share/constants";
import {RecordsModel, StoreBaseModel} from "@essence-community/constructor-share/models";
import {
    IBuilderConfig,
    IStoreBaseModelProps,
    IBuilderMode,
    FieldValue,
    IHandlerOptions,
    IRecord,
} from "@essence-community/constructor-share/types";

export interface IFilePanelModelProps extends IStoreBaseModelProps {
    btnsConfig: Record<string, IBuilderConfig>;
}
export class FilePanelModel extends StoreBaseModel {
    private childwindow: IBuilderConfig;

    public recordsStore: RecordsModel;

    public btnsConfig: Record<string, IBuilderConfig>;

    constructor({btnsConfig, ...props}: IFilePanelModelProps) {
        super(props);
        this.btnsConfig = btnsConfig;
        this.childwindow = {
            [VAR_RECORD_DISPLAYED]: "static:6a4c7f4488164e7e8fabd46e0cc01ccc",
            [VAR_RECORD_NAME]: "",
            [VAR_RECORD_PAGE_OBJECT_ID]: `${this.bc[VAR_RECORD_PAGE_OBJECT_ID]}_gridwindow`,
            [VAR_RECORD_PARENT_ID]: this.bc[VAR_RECORD_PAGE_OBJECT_ID],
            bottombtn: [this.btnsConfig["Override Save Button"], this.btnsConfig["Override Cancel Button"]],
            childs: this.bc.childs,
            ckwindow: "add_document",
            columns: this.bc.columns,
            type: "WIN",
        };
        this.recordsStore = new RecordsModel(
            {...this.bc, setrecordtoglobal: undefined},
            {
                applicationStore: this.pageStore.applicationStore,
                pageStore: this.pageStore,
                parentStore: this,
            },
        );
        makeObservable(this);
    }

    @action
    addFileAction = (mode: IBuilderMode, bc: IBuilderConfig) =>
        this.pageStore.createWindowAction({
            ...this.childwindow,
            mode: bc.mode,
        });

    @action
    deleteAction = (mode: IBuilderMode, btnBc: IBuilderConfig, {record, form}: IHandlerOptions) =>
        this.recordsStore.saveAction(record!, (btnBc.modeaction || "3") as IBuilderMode, {
            actionBc: btnBc,
            form,
            query: btnBc.updatequery,
        });

    @action
    reloadStoreAction = () => this.recordsStore.loadRecordsAction();

    @action
    saveAction = async (values: IRecord, mode: IBuilderMode, actionBc: IBuilderConfig, config: IHandlerOptions) => {
        const {files, form} = config;
        const isDownload = mode === "7" || actionBc.mode === "7";

        const result = await this.recordsStore[isDownload ? "downloadAction" : "saveAction"](values, mode, {
            actionBc,
            files,
            form,
            query: actionBc.updatequery,
        });

        return result;
    };

    handlers = {
        onAddFileAction: (mode: IBuilderMode, btnBc: IBuilderConfig) => {
            this.addFileAction(mode, btnBc);

            return Promise.resolve(true);
        },
        onDeleteRecord: async (mode: IBuilderMode, btnBc: IBuilderConfig, options: IHandlerOptions) => {
            await this.deleteAction(mode, btnBc, options);

            return Promise.resolve(true);
        },
        onRefresh: async () => {
            await this.reloadStoreAction();

            return Promise.resolve(true);
        },
        onSaveWindow: async (mode: IBuilderMode, btnBc: IBuilderConfig, options: IHandlerOptions) => {
            if (!options.form) {
                return Promise.resolve(false);
            }

            const res = await this.saveAction(options.form.values, mode, btnBc, options);

            return Boolean(res);
        },
    };
}
