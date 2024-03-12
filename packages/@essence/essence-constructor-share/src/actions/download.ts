/* eslint-disable max-len */
/* eslint-disable prettier/prettier */
/* eslint-disable max-statements */
/* eslint-disable max-lines-per-function */
/* eslint-disable require-unicode-regexp */
import {stringify} from "qs";
import axios, {AxiosRequestConfig} from "axios";
import {
    VAR_RECORD_ID,
    VAR_RECORD_MASTER_ID,
    VAR_RECORD_PAGE_OBJECT_ID,
    VAR_RECORD_CK_MAIN,
    VAR_RECORD_CL_WARNING,
    VAR_RECORD_CV_ACTION,
    VAR_RECORD_ROUTE_PAGE_ID,
    VAR_SETTING_GATE_URL,
    META_PAGE_ID,
    META_PAGE_OBJECT,
    VAR_ERROR_CODE,
    VAR_ERROR_ID,
    VAR_ERROR_TEXT,
    MILLISECOND,
    loggerRoot,
} from "../constants";
import {IRecord, IBuilderMode, IPageModel, IBuilderConfig, IRecordsModel} from "../types";
import {getMasterObject, isEmpty} from "../utils";
import {settingsStore} from "../models/SettingsModel";
import {IForm} from "../Form";
import {setMask, snackbarStore} from "../models";
import {filter, attachGlobalValues} from "./saveAction";

const logger = loggerRoot.extend("download");

interface IInputFormType {
    form: HTMLFormElement;
    name: string;
    type?: string;
    value?: string;
    files?: File[];
}

interface IDownloadOptions {
    actionBc: IBuilderConfig;
    recordId: string;
    [VAR_RECORD_CL_WARNING]?: number;
    query?: string;
    bc: IBuilderConfig;
    pageStore: IPageModel | null;
    formData?: FormData;
    form?: IForm;
    files?: File[];
}

let getDataTransfer: any = () => new DataTransfer();

try {
    getDataTransfer();
} catch {
    getDataTransfer = () => new ClipboardEvent("").clipboardData;
}

export const appendInputForm = ({form, name, type = "text", value, files}: IInputFormType) => {
    const input = document.createElement("input");

    input.setAttribute("type", type);
    input.setAttribute("name", name);
    if (typeof value === "string") {
        input.setAttribute("value", value);
    } else if (files) {
        const dataTransfer = getDataTransfer();

        files.forEach((file) => {
            dataTransfer.items.add(file);
        });
        input.setAttribute("value", "");
        input.setAttribute("multiple", "");
        input.files = dataTransfer.files;
    } else {
        input.setAttribute("value", "");
    }
    form.appendChild(input);
};

export function downloadXhr(config: AxiosRequestConfig, pageStore?: IPageModel | null, noglobalmask?: boolean) {
    config.responseType = "arraybuffer";
    setMask(true, noglobalmask, pageStore);

    return axios(config)
        .then((response) => {
            const contentType = response.headers["content-type"];
            const contentDisposition = response.headers["content-disposition"];
            let isError = false;
            const responseJSON: Record<string, any> = {
                [VAR_ERROR_CODE]: 500,
                [VAR_ERROR_ID]: "",
                [VAR_ERROR_TEXT]: "",
                metaData: {},
                success: false,
            };

            if (response.status === 401) {
                responseJSON[VAR_ERROR_CODE] = 201;
                isError = true;
            }
            if (response.status === 403) {
                responseJSON[VAR_ERROR_CODE] = 403;
                isError = true;
            }
            if (response.status > 299 || response.status < 200) {
                isError = true;
            }
            if (isError) {
                snackbarStore.checkExceptResponse(responseJSON, pageStore?.route, pageStore?.applicationStore);

                return;
            }

            if (!contentDisposition && contentType && contentType.indexOf("application/json") > -1) {
                const enc = new TextDecoder("utf-8");
                const arr = new Uint8Array(response.data);
                const result = JSON.parse(enc.decode(arr));

                if (result.success) {
                    snackbarStore.checkValidResponseAction(result.data?.[0] || {}, {applicationStore: pageStore?.applicationStore, route: pageStore?.route});
                } else {
                    snackbarStore.checkExceptResponse(responseJSON, pageStore?.route, pageStore?.applicationStore);
                }

                return;
            } else {
                let filename = "";

                if (contentDisposition.indexOf("filename") > -1) {
                    const FIND_NAME = new RegExp("filename\\*?=(?<check>UTF-8'')?\\\"?(?<filename>[^\\\"$]+)\\\"?", "gi");

                    filename = decodeURIComponent(FIND_NAME.exec(contentDisposition)?.groups?.filename as string || "");
                }
                const tempLink = document.createElement("a");

                tempLink.style.display = "none";
                tempLink.href = URL.createObjectURL(
                    new Blob([response.data], {
                        type: contentType,
                    }),
                );
                tempLink.setAttribute("download", `${filename || ""}`);

                if (typeof tempLink.download === "undefined") {
                    tempLink.setAttribute("target", "_blank");
                }
                document.body.appendChild(tempLink);
                tempLink.click();
                document.body.removeChild(tempLink);
            }
        })
        .catch((err) => {
            logger(err);
            throw err;
        })
        .finally(() => {
            setMask(false, noglobalmask, pageStore);
        });
}

// eslint-disable-next-line max-statements
export function download(
    this: IRecordsModel,
    values: IRecord | Array<IRecord>,
    mode: IBuilderMode,
    config: IDownloadOptions,
) {
    const {
        actionBc,
        recordId = VAR_RECORD_ID,
        [VAR_RECORD_CL_WARNING]: warningStatus = 0,
        query = "Modify",
        bc,
        pageStore,
        form: formPanel,
        files,
        formData = formPanel && formPanel.isExistFile ? formPanel.valuesFile : null,
    } = config;
    const masterKey = bc[VAR_RECORD_MASTER_ID];
    const {extraplugingate, getglobaltostore, getmastervalue} = actionBc;
    const queryStr = {
        action: actionBc.actiongate || "file",
        plugin: extraplugingate || bc.extraplugingate,
        query,
    };
    const modeBtn = actionBc.mode;
    const timeout = actionBc.timeout || bc.timeout || 30;
    let master = undefined;
    let filteredValues = null;
    let main = null;

    if (masterKey) {
        const masterStore = masterKey && pageStore && pageStore.stores.get(masterKey);

        main = masterStore
            ? masterStore.selectedRecord?.[masterStore.recordId]
            : pageStore?.fieldValueMaster.get(masterKey);
        master = getMasterObject(bc[VAR_RECORD_MASTER_ID], pageStore, getmastervalue || bc.getmastervalue);
    }

    if (pageStore) {
        if (modeBtn === "1" ? false : Array.isArray(values)) {
            filteredValues = (values as any[]).map((item: IRecord) =>
                attachGlobalValues({
                    getValue: this.getValue,
                    getglobaltostore,
                    globalValues: pageStore.globalValues,
                    values: filter(item),
                }),
            );
        } else {
            filteredValues = attachGlobalValues({
                getValue: this.getValue,
                getglobaltostore,
                globalValues: pageStore.globalValues,
                values: filter(modeBtn === "1" ? {} as any : values),
            });
        }
    }

    const modeCheck =
        !Array.isArray(filteredValues) && filteredValues && isEmpty(filteredValues[recordId]) && /^\d+$/.test(mode)
            ? "1"
            : mode;

    if (typeof URL.createObjectURL === "function") {
        let bodyFormData: FormData | null = formData;
        const data = {
            [META_PAGE_ID]: pageStore?.pageId,
            [META_PAGE_OBJECT]: bc[VAR_RECORD_PAGE_OBJECT_ID].replace(
                // eslint-disable-next-line prefer-named-capture-group, no-useless-escape
                /^.*?[{(]?([0-9A-F]{8}[-]?([0-9A-F]{4}[-]?){3}[0-9A-F]{12})[\)\}]?.*?$/giu,
                "$1",
            ),
            json: JSON.stringify({
                data: filteredValues,
                master,
                service: {
                    [VAR_RECORD_CK_MAIN]: main,
                    [VAR_RECORD_CL_WARNING]: warningStatus,
                    [VAR_RECORD_CV_ACTION]: modeCheck === "7" ? "download" : modeCheck,
                    [VAR_RECORD_PAGE_OBJECT_ID]: bc[VAR_RECORD_PAGE_OBJECT_ID],
                    [VAR_RECORD_ROUTE_PAGE_ID]: pageStore?.pageId,
                },
            }),
            session: pageStore?.applicationStore.authStore.userInfo.session || "",
        };

        if (files && files.length) {
            if (!bodyFormData) {
                bodyFormData = new FormData();
            }
            files.forEach((file) => {
                bodyFormData?.append("upload_file", file, file.name);
            })
        }

        if (bodyFormData) {
            Object.entries(data).forEach(([key, val]) => {
                bodyFormData?.append(key, val || "");
            });
        }

        return downloadXhr(
            {
                data: bodyFormData ? bodyFormData : stringify(data),
                method: "POST",
                ...(bodyFormData
                    ? {}
                    : {
                          headers: {
                              "Content-type": "application/x-www-form-urlencoded",
                          },
                      }),
                timeout: timeout * MILLISECOND,
                url: `${settingsStore.settings[VAR_SETTING_GATE_URL]}?${stringify(queryStr)}`,
                validateStatus: () => true,
            },
            pageStore,
            typeof actionBc.noglobalmask === "boolean" ? actionBc.noglobalmask : bc.noglobalmask,
        ).then(() => true);
    }
    const form = document.createElement("form");

    form.setAttribute("method", "post");
    form.setAttribute("action", `${settingsStore.settings[VAR_SETTING_GATE_URL]}?${stringify(queryStr)}`);
    if (files && files.length) {
        form.setAttribute("enctype", "multipart/form-data");
        appendInputForm({
            files,
            form,
            name: "upload_file",
            type: "file",
        });
    }
    if (formData) {
        form.setAttribute("enctype", "multipart/form-data");
        if ((formData as any).keys) {
            for (const key of (formData as any).keys()) {
                const value = (formData as any).getAll(key);

                if (typeof value[0] === "object") {
                    appendInputForm({
                        files: value,
                        form,
                        name: key,
                        type: "file",
                    });
                } else {
                    appendInputForm({
                        form,
                        name: key,
                        value: value[0],
                    });
                }
            }
        }
    }
    appendInputForm({
        form,
        name: "page_object",
        value: bc[VAR_RECORD_PAGE_OBJECT_ID],
    });
    appendInputForm({
        form,
        name: META_PAGE_ID,
        value: pageStore?.pageId,
    });
    appendInputForm({
        form,
        name: "session",
        value: pageStore?.applicationStore.authStore.userInfo.session || "",
    });
    appendInputForm({
        form,
        name: "json",
        value: JSON.stringify({
            data: filteredValues,
            master,
            service: {
                [VAR_RECORD_CK_MAIN]: main,
                [VAR_RECORD_CL_WARNING]: warningStatus,
                [VAR_RECORD_CV_ACTION]: modeCheck === "7" ? "download" : modeCheck,
                [VAR_RECORD_PAGE_OBJECT_ID]: bc[VAR_RECORD_PAGE_OBJECT_ID],
                [VAR_RECORD_ROUTE_PAGE_ID]: pageStore?.pageId,
            },
        }),
    });
    if (document.body) {
        document.body.appendChild(form);
    }
    form.submit();
    if (document.body) {
        document.body.removeChild(form);
    }

    return Promise.resolve(true);
}
