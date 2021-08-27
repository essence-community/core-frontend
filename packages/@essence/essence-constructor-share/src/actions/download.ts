/* eslint-disable require-unicode-regexp */
import {stringify} from "qs";
import {
    VAR_RECORD_ID,
    VAR_RECORD_MASTER_ID,
    VAR_RECORD_PAGE_OBJECT_ID,
    VAR_RECORD_CK_MAIN,
    VAR_RECORD_CL_WARNING,
    VAR_RECORD_CV_ACTION,
    VAR_RECORD_ROUTE_PAGE_ID,
    VAR_SETTING_GATE_URL,
} from "../constants";
import {IRecord, IBuilderMode, IPageModel, IBuilderConfig} from "../types";
import {getMasterObject, isEmpty} from "../utils";
import {settingsStore} from "../models/SettingsModel";
import {IForm} from "../Form";
import {filter, attachGlobalValues} from "./saveAction";

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

// eslint-disable-next-line max-statements
export function download(values: IRecord | Array<IRecord>, mode: IBuilderMode, config: IDownloadOptions) {
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
        action: "file",
        plugin: extraplugingate || bc.extraplugingate,
        query,
    };
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
        if (Array.isArray(values)) {
            filteredValues = values.map((item: IRecord) =>
                attachGlobalValues({getglobaltostore, globalValues: pageStore.globalValues, values: filter(item)}),
            );
        } else {
            filteredValues = attachGlobalValues({
                getglobaltostore,
                globalValues: pageStore.globalValues,
                values: filter(values),
            });
        }
    }

    const modeCheck =
        !Array.isArray(filteredValues) && filteredValues && isEmpty(filteredValues[recordId]) && /^\d+$/.test(mode)
            ? "1"
            : mode;

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
