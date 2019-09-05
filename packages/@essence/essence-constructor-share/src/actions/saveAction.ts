import {forOwn, get, isArray, noop} from "lodash";
import {ObservableMap, toJS} from "mobx";
import {loggerRoot} from "../constants";
import {ProgressModel} from "../models";
import {IBuilderConfig, IBuilderMode, IGridBuilder, IPageModel, IRecordsModel} from "../types";
import {findGetGlobalKey, isEmpty} from "../utils";
import {apiSaveAction} from "./apiSaveAction";
import {setMask} from "./recordsActions";

export interface IConfig {
    actionBc: IBuilderConfig;
    action?: "dml" | "upload";
    query?: string;
    clWarning?: number;
    bc: any;
    pageStore: IPageModel;
    formData?: FormData;
    noReload?: boolean;
}

interface IAttachGlobalValues {
    globalValues: ObservableMap;
    getglobaltostore?: string;
    values: any;
}

const logger = loggerRoot.extend("saveAction");

export const filter = (values: any) => {
    const filteredValues: any = {};

    forOwn(values, (value, key) => {
        if (key.indexOf("builderField") === -1 && (typeof value !== "string" || value.indexOf("auto-") === -1)) {
            filteredValues[key] = value;
        }
    });

    return filteredValues;
};

const findReloadAction = (recordsStore: IRecordsModel, bc: IGridBuilder) => {
    if (bc.reloadmaster === "true") {
        const masterStore = recordsStore.pageStore.stores.get(bc.ckMaster);

        if (masterStore && masterStore.reloadStoreAction) {
            return masterStore.reloadStoreAction;
        }
    }

    return recordsStore.loadRecordsAction;
};

export const attachGlobalValues = ({globalValues, getglobaltostore, values}: IAttachGlobalValues) => {
    if (getglobaltostore) {
        const newValues = {...values};

        forOwn(findGetGlobalKey(getglobaltostore), (globaleKey, fieldName) => {
            if (typeof newValues[fieldName] === "undefined") {
                newValues[fieldName] = toJS(globalValues.get(globaleKey));
            }
        });

        return newValues;
    }

    return values;
};

export function saveAction(values: any[] | FormData, mode: IBuilderMode, config: IConfig) {
    const {actionBc, action, clWarning = 0, query, bc, pageStore, formData, noReload} = config;
    const {extraplugingate, getglobaltostore, timeout} = actionBc;
    const {noglobalmask, ckMaster, ckPageObject} = bc;
    let modeCheck = mode;
    let onUploadProgress = noop;
    let filteredValues = null;
    let ckMain = null;

    if (ckMaster) {
        ckMain = get(pageStore.stores.get(ckMaster), "selectedRecord.ckId") || pageStore.fieldValueMaster.get(ckMaster);
    }

    if (formData) {
        filteredValues = values;
        const {changeProgress} = new ProgressModel({pageStore});

        onUploadProgress = changeProgress;
    } else if (isArray(values)) {
        filteredValues = values.map((item: any) =>
            attachGlobalValues({getglobaltostore, globalValues: pageStore.globalValues, values: filter(item)}),
        );
    } else {
        filteredValues = attachGlobalValues({
            getglobaltostore,
            globalValues: pageStore.globalValues,
            values: filter(values),
        });
        modeCheck = isEmpty(filteredValues.ckId) && /^\d+$/.test(mode) ? "1" : mode;
    }

    setMask(noglobalmask, pageStore, true);

    return apiSaveAction(filteredValues, {
        action,
        ckMain,
        ckPage: pageStore.ckPage,
        ckPageObject,
        clWarning,
        formData,
        mode: modeCheck,
        onUploadProgress,
        plugin: extraplugingate || bc.extraplugingate,
        query,
        session: pageStore.applicationStore.session,
        timeout,
    })
        .then(
            (response: any) =>
                new Promise((resolve) => {
                    const check = pageStore.applicationStore.snackbarStore.checkValidResponseAction(
                        response,
                        pageStore.route,
                        (warningText: string) => {
                            setMask(noglobalmask, pageStore, false);

                            pageStore.openQuestionWindow(warningText, (clWarningNew: number) => {
                                if (clWarningNew === 0) {
                                    resolve(false);
                                } else {
                                    saveAction
                                        .call(this, values, mode, {
                                            action,
                                            actionBc,
                                            bc: config.bc,
                                            clWarning: clWarningNew,
                                            formData: config.formData,
                                            pageStore: config.pageStore,
                                            query: config.query,
                                        })
                                        .then(resolve);
                                }
                            });
                        },
                    );

                    if (check === 1 && noReload) {
                        resolve(response);
                    } else if (check === 1) {
                        const loadRecordsAction = findReloadAction(this, bc as IGridBuilder);
                        const isAttach =
                            bc.refreshallrecords === "false" &&
                            (mode === "1" || mode === "2" || mode === "4") &&
                            !isEmpty(response.ckId);

                        loadRecordsAction
                            ? loadRecordsAction({
                                  selectedRecordId: response.ckId,
                                  status: isAttach ? "attach" : "save-any",
                              }).then(() => {
                                  pageStore.nextStepAction(mode, bc);

                                  resolve(response);
                              })
                            : resolve(response);
                    }

                    if (check === 0) {
                        pageStore.resetStepAction();

                        resolve(false);
                    }
                }),
        )
        .catch((error) => {
            logger("Ошибка при сохранении данных:", error);

            pageStore.applicationStore.snackbarStore.checkExceptResponse(error);
            pageStore.resetStepAction();

            return false;
        })
        .then((res) => {
            setMask(noglobalmask, pageStore, false);

            return res;
        });
}
