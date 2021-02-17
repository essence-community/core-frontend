/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {action, computed, observable} from "mobx";
import {VALUE_SELF_FIRST} from "@essence-community/constructor-share/constants";
import {
    IStoreBaseModelProps,
    IBuilderMode,
    IBuilderConfig,
    IHandlerOptions,
} from "@essence-community/constructor-share/types";
import {StoreBaseModel, RecordsModel} from "@essence-community/constructor-share/models";
import {isEmpty} from "@essence-community/constructor-share/utils";

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
            {defaultvalue: VALUE_SELF_FIRST, ...this.bc},
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
        switch (mode) {
            case "1":
                this.addAction();
                break;
            case "2":
                this.editAction();
                break;
            case "3":
            case "4":
                await this.recordsStore.saveAction(
                    this.selectedRecord || options.form?.values,
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
                await this.recordsStore.downloadAction(
                    this.selectedRecord || options.form?.values,
                    (bc.modeaction || mode) as IBuilderMode,
                    {
                        ...options,
                        actionBc: bc,
                        query: bc.updatequery,
                    },
                );
                break;
            case "8":
                await this.recordsStore.saveAction(
                    this.selectedRecord || options.form?.values,
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

        return Promise.resolve(true);
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

        const result = await this.recordsStore.saveAction(
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

        return Promise.resolve(!isEmpty(result));
    };

    @action
    closeAction = () => {
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
        onRemove: async (mode: IBuilderMode, btnBc: IBuilderConfig, options: IHandlerOptions) => {
            await this.removeRecordAction(mode, btnBc, options);

            return Promise.resolve(true);
        },
        // Сохранения данных, приходит из метамодели
        onSimpleSave: this.saveAction,
        onUpdate: this.updateBtnAction,
    };
}
