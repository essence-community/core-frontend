/* eslint-disable max-statements */
import {StoreBaseModel, RecordsModel, snackbarStore} from "@essence-community/constructor-share/models";
import {
    IRecordsModel,
    IStoreBaseModelProps,
    IBuilderMode,
    IBuilderConfig,
    IHandlerOptions,
    IRecord,
    FieldValue,
} from "@essence-community/constructor-share/types";
import {createWindowProps} from "@essence-community/constructor-share/utils/window";
import {computed, action} from "mobx";
import {deepFind, makeRedirect, parseMemoize} from "@essence-community/constructor-share/utils";
import {IForm, IParentFieldContext} from "@essence-community/constructor-share/Form";
import {IWindowContext} from "@essence-community/constructor-share/context";
import {loggerRoot} from "@essence-community/constructor-share/constants";
import {IBuilderClassConfig, IEventConfig} from "../types";
import {IEventHandles} from "./ModuleFederationModel.types";

const logger = loggerRoot.extend("ModuleFederationModel");

export class ModuleFederationModel extends StoreBaseModel {
    recordsStore: IRecordsModel;

    @computed get selectedRecord() {
        return this.recordsStore.selectedRecord;
    }

    private eventHandle: IEventHandles = {};

    private formContext?: IForm;
    private recordContext?: IRecord;
    private parentFieldContext?: IParentFieldContext;
    private windowContext?: IWindowContext;

    setFormContext = (formContext?: IForm) => {
        this.formContext = formContext;
    };

    setRecordContext = (recordContext?: IRecord) => {
        this.recordContext = recordContext;
    };

    setParentFieldContext = (parentFieldContext?: IParentFieldContext) => {
        this.parentFieldContext = parentFieldContext;
    };

    setWindowContext = (windowContext?: IWindowContext) => {
        this.windowContext = windowContext;
    };

    constructor(props: IStoreBaseModelProps) {
        super(props);

        this.recordsStore = new RecordsModel(props.bc, {
            applicationStore: props.applicationStore,
            pageStore: props.pageStore,
        });

        (this.bc as IBuilderClassConfig).mfeventconfig?.forEach((config) => {
            const handle = this.handleEvents[config.handle];

            if (handle) {
                const cfg = {
                    config,
                    handle,
                };

                if (this.eventHandle[config.messageType]) {
                    this.eventHandle[config.messageType].push(cfg);
                } else {
                    this.eventHandle[config.messageType] = [cfg];
                }
            }
        });
    }

    getValue = (name: string) => {
        if (name.charAt(0) === "g") {
            return this.pageStore.globalValues.get(name);
        }

        if (this.recordContext) {
            const [isExistRecord, recValue] = deepFind(this.recordContext, name);

            if (isExistRecord) {
                return recValue;
            }
        }

        if (this.formContext) {
            const values = this.formContext.values;

            if (this.parentFieldContext) {
                const [isExistParent, val] = deepFind(values, `${this.parentFieldContext.key}.${name}`);

                if (isExistParent) {
                    return val;
                }
            }

            const [isExist, val] = deepFind(values, name);

            if (isExist) {
                return val;
            }
        }

        return undefined;
    };

    calcData = (id: string, messageType: string, code: string, data: any) => {
        const getValue = (name: string) => {
            if (name === "jt_data") {
                return data;
            }
            if (name === "jv_component_id") {
                return id;
            }
            if (name === "jv_message_type") {
                return messageType;
            }

            return this.getValue(name);
        };

        return parseMemoize(code).runer({get: getValue}) as any;
    };

    @action
    checkRule = (config: IEventConfig, id: string, messageType: string, data?: any): boolean => {
        if (config.checkrule) {
            return this.calcData(id, messageType, config.datarule, data);
        }

        return true;
    };

    @action
    handleEventComponent = (id: string, messageType: string, data?: any): void => {
        const handle = this.eventHandle[messageType];

        logger("MF CallBack id: %s, messageType: %s, data: %j", id, messageType, data);
        if (handle) {
            return handle
                .filter((cfg) => this.checkRule(cfg.config, id, messageType, data))
                .forEach((cfg) => cfg.handle.call(this, cfg.config, id, messageType, data));
        }
    };

    @action
    saveAction = (config: IEventConfig, id: string, messageType: string, data?: any): void => {
        let dataPre = data;

        if (config.datarule) {
            dataPre = this.calcData(id, messageType, config.datarule, data);
        }

        this.recordsStore.saveAction(dataPre, config.mode, {
            actionBc: this.bc,
            query: config.query,
        });
    };

    @action
    createWindowAction = (config: IEventConfig, id: string, messageType: string, data?: any): void => {
        let dataPre = data;

        if (config.datarule) {
            dataPre = this.calcData(id, messageType, config.datarule, data);
        }

        this.pageStore.createWindowAction(
            createWindowProps({
                btnBc: {...this.bc, ckwindow: config.ckwindow},
                initValues: dataPre,
                mode: config.mode,
                pageStore: this.pageStore,
                parentStore: this,
            }),
        );
    };

    @action
    closeWindowAction = (config: IEventConfig): void => {
        if (this.windowContext) {
            if (config.isQuestion) {
                this.windowContext.onQuestionClose();
            } else {
                this.windowContext.onClose();
            }
        }
    };

    @action
    redirectAction = (config: IEventConfig, id: string, messageType: string, data?: any): void => {
        let dataPre = data;

        if (config.datarule) {
            dataPre = this.calcData(id, messageType, config.datarule, data);
        }
        makeRedirect(
            {
                ...this.bc,
                columnsfilter: config.columnsfilter,
                redirecturl: config.redirecturl,
                redirectusequery: config.redirectusequery,
            },
            this.pageStore,
            dataPre,
        );
    };

    @action
    setGlobalAction = (config: IEventConfig, id: string, messageType: string, data?: any): void => {
        let dataPre = data;

        if (config.datarule) {
            dataPre = this.calcData(id, messageType, config.datarule, data);
        }
        const globalValues: Record<string, FieldValue> = {};

        config.setGlobal?.forEach(({in: keyIn, out, calcIn}) => {
            if (calcIn) {
                globalValues[out] = this.calcData(id, messageType, calcIn, data);
            } else {
                const [, resForm] = deepFind(dataPre, keyIn);

                globalValues[out] = resForm;
            }
        });

        this.pageStore.updateGlobalValues(globalValues);
    };

    @action
    errorAction = (config: IEventConfig, id: string, messageType: string, data?: any): void => {
        let error = "";

        if (config.errorrule) {
            error = this.calcData(id, messageType, config.errorrule, data);
        }
        if (typeof error === "string") {
            snackbarStore.snackbarOpenAction(
                {
                    status: "error",
                    text: error,
                },
                this.pageStore.route,
            );
        }

        if (typeof error === "object") {
            snackbarStore.checkValidResponseAction(error);
        }
    };

    handleEvents = {
        closeWindowAction: this.closeWindowAction,
        createWindowAction: this.createWindowAction,
        errorAction: this.errorAction,
        redirectAction: this.redirectAction,
        saveAction: this.saveAction,
        setGlobalAction: this.setGlobalAction,
    };

    @action
    reloadStoreAction = () => this.recordsStore.loadRecordsAction({});
    @action
    clearStoreAction = () => this.recordsStore.clearChildsStoresAction();

    @action
    defaultHandlerBtnAction = async (
        mode: IBuilderMode,
        bc: IBuilderConfig,
        options: IHandlerOptions = {},
    ): Promise<boolean> => {
        switch (mode) {
            case "7":
                await this.recordsStore.downloadAction(this.selectedRecord!, (bc.modeaction || mode) as IBuilderMode, {
                    ...options,
                    actionBc: bc,
                    query: bc.updatequery,
                });
                break;
            default:
                await this.recordsStore.saveAction(this.selectedRecord!, (bc.modeaction || mode) as IBuilderMode, {
                    ...options,
                    actionBc: bc,
                    query: bc.updatequery,
                });
        }

        return Promise.resolve(true);
    };

    handlers = {
        defaultHandlerBtnAction: this.defaultHandlerBtnAction,
    };
}
