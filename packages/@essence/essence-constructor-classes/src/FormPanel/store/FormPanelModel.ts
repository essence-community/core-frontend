/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {action, computed, observable} from "mobx";
import {VALUE_SELF_ALWAYSFIRST, VAR_RECORD_PAGE_OBJECT_ID} from "@essence-community/constructor-share/constants";
import {
    IStoreBaseModelProps,
    IBuilderMode,
    IBuilderConfig,
    IHandlerOptions,
} from "@essence-community/constructor-share/types";
import {StoreBaseModel, RecordsModel} from "@essence-community/constructor-share/models";
import {createWindowProps, isEmpty} from "@essence-community/constructor-share/utils";
import {getWindowBc} from "@essence-community/constructor-share/utils/window/getWindowBc";

export class FormPanelModel extends StoreBaseModel {
    public recordsStore: RecordsModel;

    @computed
    public get selectedRecord() {
        return this.recordsStore.selectedRecord;
    }

    @observable
    public editing: boolean;

    @observable
    public mode: IBuilderMode;

    public editable: boolean;

    constructor(props: IStoreBaseModelProps) {
        super(props);

        this.editing = this.bc.editing || false;

        this.editable = typeof this.bc.editable === "boolean" ? this.bc.editable : true;

        this.recordsStore = new RecordsModel(
            {defaultvalue: VALUE_SELF_ALWAYSFIRST, ...this.bc},
            {
                applicationStore: props.applicationStore || props.pageStore.applicationStore,
                pageStore: props.pageStore,
            },
        );
    }

    @action
    defaultHandlerBtnAction = async (
        mode: IBuilderMode,
        bc: IBuilderConfig,
        options: IHandlerOptions = {},
    ): Promise<boolean> => {
        let result = true;

        if (bc.ckwindow && getWindowBc(bc, this.pageStore, this)) {
            this.pageStore.createWindowAction(
                createWindowProps({
                    btnBc: bc,
                    mode,
                    pageStore: this.pageStore,
                    parentStore: this,
                }),
            );

            return Promise.resolve(result);
        }
        switch (mode) {
            case "1":
                this.addAction();
                break;
            case "2":
                this.editAction();
                break;
            case "3":
            case "4":
                result = await this.recordsStore.saveAction(
                    options.form?.values || this.selectedRecord || options.record,
                    (bc.modeaction || mode) as IBuilderMode,
                    {
                        ...options,
                        actionBc: bc,
                        query: bc.updatequery,
                    },
                );
                break;
            case "6":
                this.cloneAction();
                break;
            case "7":
                result = await this.recordsStore.downloadAction(
                    options.form?.values || this.selectedRecord || options.record,
                    (bc.modeaction || mode) as IBuilderMode,
                    {
                        ...options,
                        actionBc: bc,
                        query: bc.updatequery,
                    },
                );
                break;
            case "8":
                result = await this.recordsStore.saveAction(
                    options.form?.values || this.selectedRecord || options.record,
                    (bc.modeaction || mode) as IBuilderMode,
                    {
                        ...options,
                        actionBc: bc,
                        query: bc.updatequery,
                    },
                );
                break;
            default:
                return Promise.resolve(false);
        }

        return Promise.resolve(result);
    };

    updateBtnAction = this.defaultHandlerBtnAction;

    @action
    public reloadStoreAction = async () => {
        await this.recordsStore.loadRecordsAction();
        await this.recordsStore.setFirstRecord();

        return undefined;
    };

    @action
    clearStoreAction = () => {
        this.recordsStore.clearChildsStoresAction();
    };

    @action
    setEditing = (editing: boolean) => {
        if (this.editable) {
            this.editing = editing;
        }
    };

    @action
    addAction = () => {
        this.mode = "1";
        this.recordsStore.setSelectionAction();
        this.setEditing(true);
    };

    @action
    editAction = () => {
        this.mode = "2";
        this.setEditing(true);
    };

    @action
    cloneAction = () => {
        this.mode = "6";
        this.setEditing(true);
    };

    @action
    saveAction = async (mode: IBuilderMode, btnBc: IBuilderConfig, {form, ...opt}: IHandlerOptions) => {
        await form?.validate();

        if (!btnBc.skipvalidation && !form?.isValid) {
            return false;
        }

        const isDownload = mode === "7" || btnBc.mode === "7";
        const result = await this.recordsStore[isDownload ? "downloadAction" : "saveAction"](
            form.values,
            (btnBc.modeaction || this.mode) as IBuilderMode,
            {
                ...opt,
                actionBc: btnBc,
                form,
                query: btnBc.updatequery,
            },
        );

        if (result) {
            this.setEditing(false);
        }

        return Promise.resolve(typeof result === "boolean" ? result : !isEmpty(result));
    };

    @action
    closeAction = () => {
        const form = this.pageStore.forms.get(this.bc[VAR_RECORD_PAGE_OBJECT_ID]);

        if (form) {
            form.update(form.initialValues);
        }
        this.recordsStore.setFirstRecord();
        this.setEditing(false);

        return Promise.resolve(true);
    };

    @action
    removeRecordAction = async (mode: IBuilderMode, btnBc: IBuilderConfig, options: IHandlerOptions) => {
        const result = await this.recordsStore.removeSelectedRecordAction({
            ...options,
            actionBc: btnBc,
        });

        if (result) {
            this.recordsStore.setFirstRecord();
        }

        return true;
    };

    @action
    handleNextStepAction = () => {
        if (!this.hidden && !this.disabled) {
            setTimeout(() => {
                this.addAction();
            });
        }
    };

    @action
    loadRecordsAction = async () => {
        await this.recordsStore.loadRecordsAction();

        if (typeof this.recordsStore.selectedRecordId === "undefined") {
            this.recordsStore.setFirstRecord();
        }
    };

    @action
    setNextRecord = () => {
        this.recordsStore.setNextRecord();

        return Promise.resolve(true);
    };

    @action
    setPrevRecord = () => {
        this.recordsStore.setPrevRecord();

        return Promise.resolve(true);
    };

    @action
    setFirstRecord = () => {
        this.recordsStore.setFirstRecord();

        return Promise.resolve(true);
    };

    @action
    setLastRecord = () => {
        this.recordsStore.setLastRecord();

        return Promise.resolve(true);
    };

    handlers = {
        defaultHandlerBtnAction: this.defaultHandlerBtnAction,
        onAdd: () => {
            this.addAction();

            return Promise.resolve(true);
        },
        onClone: () => {
            this.cloneAction();

            return Promise.resolve(true);
        },
        // Закрытие окна редактрования, приходит из метамодели
        onCloseWindow: this.closeAction,
        onEdit: () => {
            this.editAction();

            return Promise.resolve(true);
        },
        onFirstRecord: this.setFirstRecord,
        onLastRecord: this.setLastRecord,
        onNextRecord: this.setNextRecord,
        onPrevRecord: this.setPrevRecord,
        onRefresh: async () => {
            await this.loadRecordsAction();

            return Promise.resolve(true);
        },
        onReloadStores: async () => {
            await this.loadRecordsAction();

            return Promise.resolve(true);
        },
        onRemove: async (mode: IBuilderMode, btnBc: IBuilderConfig, options: IHandlerOptions) => {
            await this.removeRecordAction(mode, btnBc, options);

            return Promise.resolve(true);
        },
        onSaveWindow: this.saveAction,
        // Сохранения данных, приходит из метамодели
        onSimpleSave: this.saveAction,
        onUpdate: this.updateBtnAction,
    };
}
