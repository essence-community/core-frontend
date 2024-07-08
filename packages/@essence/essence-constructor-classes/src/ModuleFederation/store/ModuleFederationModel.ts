/* eslint-disable max-statements */
import {StoreBaseModel, RecordsModel, snackbarStore} from "@essence-community/constructor-share/models";
import {
    IRecordsModel,
    IBuilderMode,
    IBuilderConfig,
    IHandlerOptions,
    FieldValue,
} from "@essence-community/constructor-share/types";
import {createWindowProps} from "@essence-community/constructor-share/utils/window";
import {computed, action, observable} from "mobx";
import {deepFind, makeRedirect, parseMemoize} from "@essence-community/constructor-share/utils";
import {IWindowContext} from "@essence-community/constructor-share/context";
import {loggerRoot} from "@essence-community/constructor-share/constants";
import {IGetValue} from "@essence-community/constructor-share/utils/parser";
import {IBuilderClassConfig, IEventConfig} from "../types";
import {IEventHandles, IModuleFederationModelProps} from "./ModuleFederationModel.types";

const logger = loggerRoot.extend("ModuleFederationModel");

export class ModuleFederationModel extends StoreBaseModel {
    recordsStore: IRecordsModel;

    @computed get selectedRecord() {
        return this.recordsStore.selectedRecord;
    }

    private eventHandle: IEventHandles = {};

    public getValue: IGetValue["get"];
    private windowContext?: IWindowContext;

    @observable
    public isFullScreen = false;

    setGetValue = (getValue: IGetValue["get"]): void => {
        this.getValue = getValue;
    };

    setWindowContext = (windowContext?: IWindowContext): void => {
        this.windowContext = windowContext;
    };

    constructor(props: IModuleFederationModelProps) {
        super(props);

        this.getValue = props.getValue;

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
    saveMfAction = (config: IEventConfig, id: string, messageType: string, data?: any): void => {
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
    showFullScreen = (config: IEventConfig, id: string, messageType: string, data?: any): void => {
        if (config.datarule) {
            const dataPre = this.calcData(id, messageType, config.datarule, data);

            this.isFullScreen = dataPre;

            return;
        }
        this.isFullScreen = !this.isFullScreen;
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
        saveAction: this.saveMfAction,
        setGlobalAction: this.setGlobalAction,
        showFullScreen: this.showFullScreen,
    };

    @action
    reloadStoreAction = () => this.recordsStore.loadRecordsAction();
    @action
    clearStoreAction = () => this.recordsStore.clearChildsStoresAction();

    @action
    defaultHandlerBtnAction = async (
        mode: IBuilderMode,
        bc: IBuilderConfig,
        options: IHandlerOptions = {},
    ): Promise<boolean> => {
        let result = true;

        switch (mode) {
            case "7":
                result = await this.recordsStore.downloadAction(
                    this.selectedRecord!,
                    (bc.modeaction || mode) as IBuilderMode,
                    {
                        ...options,
                        actionBc: bc,
                        query: bc.updatequery,
                    },
                );
                break;
            default:
                result = await this.recordsStore.saveAction(
                    this.selectedRecord!,
                    (bc.modeaction || mode) as IBuilderMode,
                    {
                        ...options,
                        actionBc: bc,
                        query: bc.updatequery,
                    },
                );
        }

        return Promise.resolve(result);
    };

    handlers = {
        defaultHandlerBtnAction: this.defaultHandlerBtnAction,
    };
}
