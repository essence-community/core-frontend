// @flow
import get from "lodash/get";
import isArray from "lodash/isArray";
import {snakeCaseKeys} from "@essence/essence-constructor-share/utils";
import {stringify} from "qs";
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
    const {actionBc, clWarning = 0, query = "Modify", bc, pageStore} = config;
    const {extraplugingate, getglobaltostore} = actionBc;
    const {ckMaster, ckPageObject} = bc;
    const queryStr = {
        action: "file",
        plugin: extraplugingate || bc.extraplugingate,
        query,
    };
    let modeCheck = mode;
    let filteredValues = null;
    let ckMain = null;

    if (ckMaster) {
        ckMain = get(pageStore.stores.get(ckMaster), "selectedRecord.ckId") || pageStore.fieldValueMaster.get(ckMaster);
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
        modeCheck = isEmpty(filteredValues.ckId) && /^\d+$/.test(mode) ? "1" : mode;
    }

    const form = document.createElement("form");

    form.setAttribute("method", "post");
    form.setAttribute("action", `${baseUrl}?${stringify(snakeCaseKeys(queryStr))}`);
    appendInputForm({
        form,
        name: "page_object",
        value: ckPageObject,
    });
    appendInputForm({
        form,
        name: "session",
        value: pageStore.applicationStore.session,
    });
    appendInputForm({
        form,
        name: "json",
        value: JSON.stringify(
            snakeCaseKeys({
                data: filteredValues,
                service: {
                    ckMain,
                    clWarning,
                    cvAction: modeCheck === "7" ? "download" : modeCheck,
                },
            }),
        ),
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
