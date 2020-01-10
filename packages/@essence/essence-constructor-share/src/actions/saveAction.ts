import {forOwn, get, isArray, noop} from "lodash";
import {ObservableMap, toJS} from "mobx";
import {
    VAR_RECORD_ID,
    VAR_RECORD_MASTER_ID,
    VAR_RECORD_PAGE_OBJECT_ID,
    VAR_RECORD_ROUTE_PAGE_ID,
    loggerRoot,
    VAR_RECORD_CK_MAIN,
    VAR_RECORD_CL_WARNING,
} from "../constants";
import {ProgressModel, snackbarStore} from "../models";
import {IBuilderConfig, IBuilderMode, IGridBuilder, IPageModel, IRecordsModel, ILoadRecordsProps} from "../types";
import {findGetGlobalKey, isEmpty, i18next} from "../utils";
import {getMasterObject} from "../utils/getMasterObject";
import {apiSaveAction} from "./apiSaveAction";
import {setMask} from "./recordsActions";

export interface IConfig {
    actionBc: IBuilderConfig;
    action?: "dml" | "upload";
    query?: string;
    [VAR_RECORD_CL_WARNING]?: number;
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
    const masterId = bc[VAR_RECORD_MASTER_ID];

    if (bc.reloadmaster === "true" && recordsStore.pageStore && masterId) {
        const masterStore = recordsStore.pageStore.stores.get(masterId);

        if (masterStore && masterStore.reloadStoreAction) {
            return () => masterStore.reloadStoreAction(true);
        }
    }

    return (props: ILoadRecordsProps) => recordsStore.loadRecordsAction(props);
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

// eslint-disable-next-line max-params
export function saveAction(this: IRecordsModel, values: any[] | FormData, mode: IBuilderMode, config: IConfig) {
    const {
        actionBc,
        action,
        [VAR_RECORD_CL_WARNING]: warningStatus = 0,
        query,
        bc,
        pageStore,
        formData,
        noReload,
    } = config;
    const {extraplugingate, getglobaltostore, getmastervalue, timeout} = actionBc;
    let master = undefined;
    let modeCheck = mode;
    let onUploadProgress = noop;
    let filteredValues = null;
    const getMasterValue = getmastervalue || bc.getmastervalue;
    let main = null;

    if (bc[VAR_RECORD_MASTER_ID]) {
        main =
            get(pageStore.stores.get(bc[VAR_RECORD_MASTER_ID]), `selectedRecord.${VAR_RECORD_ID}`) ||
            pageStore.fieldValueMaster.get(bc[VAR_RECORD_MASTER_ID]);
        master = getMasterObject(bc[VAR_RECORD_MASTER_ID], pageStore, getMasterValue);
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
        modeCheck = isEmpty(filteredValues[VAR_RECORD_ID]) && /^\d+$/u.test(mode) ? "1" : mode;
    }

    setMask(bc.noglobalmask, pageStore, true);

    return apiSaveAction(filteredValues, {
        [VAR_RECORD_CK_MAIN]: main,
        [VAR_RECORD_CL_WARNING]: warningStatus,
        [VAR_RECORD_PAGE_OBJECT_ID]: bc[VAR_RECORD_PAGE_OBJECT_ID],
        [VAR_RECORD_ROUTE_PAGE_ID]: pageStore.pageId,
        action,
        formData,
        master,
        mode: modeCheck,
        onUploadProgress,
        plugin: extraplugingate || bc.extraplugingate,
        query,
        session: (this.applicationStore && this.applicationStore.authStore.userInfo.session) || "",
        timeout,
    })
        .then(
            (response: any) =>
                new Promise((resolve) => {
                    const check = snackbarStore.checkValidResponseAction(
                        response,
                        pageStore.route,
                        (warningText: string) => {
                            setMask(bc.noglobalmask, pageStore, false);

                            pageStore.openQuestionWindow(warningText, (warningStatusNew: number) => {
                                if (warningStatusNew === 0) {
                                    resolve(false);
                                } else {
                                    saveAction
                                        .call(this, values, mode, {
                                            [VAR_RECORD_CL_WARNING]: warningStatusNew,
                                            action,
                                            actionBc,
                                            bc: config.bc,
                                            formData: config.formData,
                                            pageStore: config.pageStore,
                                            query: config.query,
                                        })
                                        .then(resolve);
                                }
                            });
                        },
                        this.applicationStore,
                    );

                    if (check === 1 && noReload) {
                        resolve(response);
                    } else if (check === 1) {
                        const loadRecordsAction = findReloadAction(this, bc as IGridBuilder);
                        const isAttach =
                            bc.refreshallrecords === "false" &&
                            (mode === "1" || mode === "2" || mode === "4") &&
                            !isEmpty(response[VAR_RECORD_ID]);

                        loadRecordsAction
                            ? loadRecordsAction({
                                  selectedRecordId: response[VAR_RECORD_ID],
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
            logger(i18next.t("static:27a9d844da20453195f59f75185d7c99"), error);

            snackbarStore.checkExceptResponse(error, undefined, this.applicationStore);
            pageStore.resetStepAction();

            return false;
        })
        .then((res) => {
            setMask(bc.noglobalmask, pageStore, false);

            return res;
        });
}
