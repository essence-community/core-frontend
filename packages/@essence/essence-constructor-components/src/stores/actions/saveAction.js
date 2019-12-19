// @flow
import get from "lodash/get";
import forOwn from "lodash/forOwn";
import isArray from "lodash/isArray";
import noop from "lodash/noop";
import {toJS, type ObservableMap} from "mobx";
import {snackbarStore} from "@essence/essence-constructor-share/models";
import {i18next} from "@essence/essence-constructor-share/utils";
import {
    VAR_RECORD_ID,
    VAR_RECORD_MASTER_ID,
    VAR_RECORD_PAGE_OBJECT_ID,
    VAR_RECORD_ROUTE_PAGE_ID,
    VAR_RECORD_CK_MAIN,
    VAR_RECORD_CL_WARNING,
} from "@essence/essence-constructor-share/constants";
import {findGetGlobalKey} from "../../utils/findKey";
import {loggerRoot} from "../../constants";
import {isEmpty} from "../../utils/base";
import {apiSaveAction} from "../../request/serviceApiActions";
import {type PageModelType} from "../PageModel";
import {type BuilderModeType, type BuilderBaseType} from "../../BuilderType";
import {type GridBuilderType} from "../GridModel/GridModelType";
import {setMask} from "../RecordsModel/loadRecordsAction";
import ProgressModel from "../ProgressModel/ProgressModel";

export type ConfigType = {|
    actionBc: BuilderBaseType,
    action?: "dml" | "upload",
    query?: string,
    cl_warning?: number,
    bc: Object,
    pageStore: PageModelType,
    formData?: FormData,
    noReload?: boolean,
    filesNames?: Array<string>,
|};

type AttachGlobalValuesType = {|
    globalValues: ObservableMap<string, mixed>,
    getglobaltostore?: string,
    values: Object,
|};

const logger = loggerRoot.extend("saveAction");

export const filter = (values: Object) => {
    const filteredValues = {};

    forOwn(values, (value, key) => {
        if (key.indexOf("builderField") === -1 && (typeof value !== "string" || value.indexOf("auto-") === -1)) {
            filteredValues[key] = value;
        }
    });

    return filteredValues;
};

const findReloadAction = (recordsStore, bc: GridBuilderType) => {
    if (bc.reloadmaster === "true") {
        const masterStore = recordsStore.pageStore.stores.get(bc[VAR_RECORD_MASTER_ID]);

        if (masterStore && masterStore.reloadStoreAction) {
            return masterStore.reloadStoreAction;
        }
    }

    return recordsStore.loadRecordsAction;
};

export const attachGlobalValues = ({globalValues, getglobaltostore, values}: AttachGlobalValuesType) => {
    if (getglobaltostore) {
        const newValues = {...values};

        forOwn(findGetGlobalKey(getglobaltostore), (globaleKey, fieldName) => {
            if (typeof newValues[fieldName] === "undefined") {
                // $FlowFixMe
                newValues[fieldName] = toJS(globalValues.get(globaleKey));
            }
        });

        return newValues;
    }

    return values;
};

// eslint-disable-next-line max-statements, max-lines-per-function
export function saveAction(values: Object | Array<Object> | FormData, mode: BuilderModeType, config: ConfigType) {
    const {
        actionBc,
        action,
        [VAR_RECORD_CL_WARNING]: warningStatus = 0,
        query,
        bc,
        pageStore,
        formData,
        noReload,
        filesNames,
    } = config;
    const {extraplugingate, getglobaltostore, timeout} = actionBc;
    let modeCheck = mode;
    let onUploadProgress = noop;
    let filteredValues = null;
    let main = null;
    let snackbarId = null;

    if (bc[VAR_RECORD_MASTER_ID]) {
        main =
            get(pageStore.stores.get(bc[VAR_RECORD_MASTER_ID]), `selectedRecord.${VAR_RECORD_ID}`) ||
            pageStore.fieldValueMaster.get(bc[VAR_RECORD_MASTER_ID]);
    }

    if (formData) {
        filteredValues = values;
        const {changeProgress, snackbarIdentifier} = new ProgressModel({filesNames, pageStore});

        snackbarId = snackbarIdentifier;
        onUploadProgress = changeProgress;
    } else if (isArray(values)) {
        filteredValues = values.map((item: Object) =>
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
        mode: modeCheck,
        onUploadProgress,
        plugin: extraplugingate || bc.extraplugingate,
        query,
        session: pageStore.applicationStore.session,
        timeout,
    })
        .then(
            // eslint-disable-next-line max-lines-per-function
            (response) =>
                // eslint-disable-next-line max-statements, max-lines-per-function
                new Promise((resolve) => {
                    const check = snackbarStore.checkValidResponseAction(
                        response,
                        pageStore.route,
                        (warningText) => {
                            setMask(bc.noglobalmask, pageStore, false);

                            pageStore.openQuestionWindow(warningText, (warningStatusNew) => {
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
                        pageStore.applicationStore,
                    );

                    if (formData) {
                        snackbarStore.snackbarChangeStatusAction(
                            snackbarId,
                            check === 1 || check === 2 ? "uploaded" : "errorUpload",
                        );
                    }

                    if (check === 1 && noReload) {
                        resolve(true);
                    } else if (check === 1) {
                        const loadRecordsAction = findReloadAction(this, bc);
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

                                  resolve(true);
                              })
                            : resolve(true);
                    }

                    if (check === 0) {
                        pageStore.resetStepAction();

                        resolve(false);
                    }
                }),
        )
        .catch((error) => {
            logger(i18next.t("27a9d844da20453195f59f75185d7c99"), error);

            if (formData) {
                snackbarStore.snackbarChangeStatusAction(snackbarId, "errorUpload");
            }

            snackbarStore.checkExceptResponse(error, undefined, pageStore.applicationStore);
            pageStore.resetStepAction();

            return false;
        })
        .then((res) => {
            setMask(bc.noglobalmask, pageStore, false);

            return res;
        });
}
