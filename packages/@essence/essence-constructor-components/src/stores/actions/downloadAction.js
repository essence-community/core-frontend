// @flow
import get from "lodash/get";
import isArray from "lodash/isArray";
import {stringify} from "qs";
import {
    VAR_RECORD_ID,
    VAR_RECORD_MASTER_ID,
    VAR_RECORD_PAGE_OBJECT_ID,
    VAR_RECORD_CK_MAIN,
    VAR_RECORD_CL_WARNING,
    VAR_RECORD_CV_ACTION,
} from "@essence-community/constructor-share/constants";
import {isEmpty} from "../../utils/base";
import {type BuilderModeType} from "../../BuilderType";
import {filter, attachGlobalValues, type ConfigType} from "./saveAction";

const baseUrl = process.env.REACT_APP_BASE_URL || "gate_ub_dev";

type InputFormType = {
    form: HTMLFormElement,
    name: string,
    type?: string,
    value: string,
};

const appendInputForm = ({form, name, type = "text", value}: InputFormType) => {
    const input = document.createElement("input");

    input.setAttribute("type", type);
    input.setAttribute("name", name);
    input.setAttribute("value", value);
    form.appendChild(input);
};

// eslint-disable-next-line max-statements, max-lines-per-function
export function downloadAction(values: Object | Array<Object>, mode: BuilderModeType, config: ConfigType) {
    const {actionBc, [VAR_RECORD_CL_WARNING]: warningStatus = 0, query = "Modify", bc, pageStore} = config;
    const {extraplugingate, getglobaltostore} = actionBc;
    const queryStr = {
        action: "file",
        plugin: extraplugingate || bc.extraplugingate,
        query,
    };
    let modeCheck = mode;
    let filteredValues = null;
    let main = null;

    if (bc[VAR_RECORD_MASTER_ID]) {
        main =
            get(pageStore.stores.get(bc[VAR_RECORD_MASTER_ID]), `selectedRecord.${VAR_RECORD_ID}`) ||
            pageStore.fieldValueMaster.get(bc[VAR_RECORD_MASTER_ID]);
    }

    if (isArray(values)) {
        filteredValues = values.map((item: Object) =>
            attachGlobalValues({getglobaltostore, globalValues: pageStore.globalValues, values: filter(item)}),
        );
    } else {
        filteredValues = attachGlobalValues({
            getglobaltostore,
            globalValues: pageStore.globalValues,
            values: filter(values),
        });
        // eslint-disable-next-line require-unicode-regexp
        modeCheck = isEmpty(filteredValues[VAR_RECORD_ID]) && /^\d+$/.test(mode) ? "1" : mode;
    }

    const form = document.createElement("form");

    form.setAttribute("method", "post");
    form.setAttribute("action", `${baseUrl}?${stringify(queryStr)}`);
    appendInputForm({
        form,
        name: "page_object",
        value: bc[VAR_RECORD_PAGE_OBJECT_ID],
    });
    appendInputForm({
        form,
        name: "session",
        value: pageStore.applicationStore.session,
    });
    appendInputForm({
        form,
        name: "json",
        value: JSON.stringify({
            data: filteredValues,
            service: {
                [VAR_RECORD_CK_MAIN]: main,
                [VAR_RECORD_CL_WARNING]: warningStatus,
                [VAR_RECORD_CV_ACTION]: modeCheck === "7" ? "download" : modeCheck,
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
