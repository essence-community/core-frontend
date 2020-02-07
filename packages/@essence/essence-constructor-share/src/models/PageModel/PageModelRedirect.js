// @flow
import forOwn from "lodash/forOwn";
import {runInAction, when} from "mobx";
import {Field, Form} from "mobx-react-form";
// $FlowFixMe
import {i18next} from "../../utils";
// $FlowFixMe
import {loggerRoot, VALUE_SELF_FIRST, VAR_RECORD_MASTER_ID} from "../../constants";
// $FlowFixMe
import {isEmpty} from "../../utils/base";

const logger = loggerRoot.extend("PageModelRedirect");
const AWAIT_DELAY = 5000;

/**
 * Дожидается установки поля
 *
 * @param {Field} field Поля формы
 * @param {boolean} skipCheckMaster Флаг
 *
 * @return {Promise<void>} Ожидание применения поля
 */
function awaitFieldFilter(field: Field, skipCheckMaster: boolean): Promise<void> {
    const {store, options} = field;
    const bc = options && options.bc;

    if (skipCheckMaster && bc && bc[VAR_RECORD_MASTER_ID]) {
        return Promise.resolve();
    }

    if (
        field.value === "defaultvaluequery" ||
        (field.value === VALUE_SELF_FIRST && bc.defaultvalue === VALUE_SELF_FIRST)
    ) {
        return when(() => field.value !== "defaultvaluequery" && field.value !== VALUE_SELF_FIRST);
    }

    if (store && store.recordsStore.isLoading) {
        return when(() => !store.recordsStore.isLoading);
    }

    return Promise.resolve();
}

export function awaitFormFilter(form: Form, skipCheckMaster: boolean): Promise<void> {
    return new Promise((resolve) => {
        const timerID = setTimeout(() => {
            logger(i18next.t("static:5327513a9d344e2184cca94cde783a52"));
            resolve();
        }, AWAIT_DELAY);

        Promise.all(form.map((field) => awaitFieldFilter(field, skipCheckMaster))).then(() => {
            clearTimeout(timerID);
            resolve();
        });
    });
}

function applyFieldFilter(field: Field, params: Record<string, any>) {
    if (Object.prototype.hasOwnProperty.call(params, field.key)) {
        const value = params[field.key];

        isEmpty(value) ? field.clear() : field.set(value);

        delete params[field.key];
    }
}

function runFormFilter(form: Form, params: Record<string, any>): Promise<void> {
    return awaitFormFilter(form, true).then(() => {
        form.each((field) => {
            applyFieldFilter(field, params);
        });
    });
}

function filterAllForms(forms: Array<Form>, params: Record<string, any>): Promise<Record<string, any>> {
    const notFieldParams = {...params};

    return Promise.all(forms.map((form: Form) => runFormFilter(form, notFieldParams))).then(() => notFieldParams);
}

export async function redirectToPage(page: any, params: Record<string, any>) {
    page.isActiveRedirect = true;

    // При переходе все поля нужно сбрасывать в значения по умолчанию.
    runInAction("PageModelRedirect.clear|reset form", () => {
        page.formFilters.forEach((form: Form) => {
            form.clear();
            form.reset();
        });
    });

    // При переходе все окна нужно закрывать
    runInAction("PageModelRedirect.clear windows", () => {
        page.windowsOne.clear();
    });

    // $FlowFixMe
    const forms = page.formFilters.filter((form: Form) => !form.hasMaster);
    const notFieldParams = await filterAllForms(forms, params);
    const emptyValues: Record<string, any> = {};

    forOwn(notFieldParams, (fieldValue: mixed, fieldName: string) => {
        emptyValues[fieldName] = null;
    });

    runInAction("PageModelRedirect.set_global_values", () => {
        // Что бы запустился autorun, очистим, а потом установим
        page.globalValues.merge(emptyValues);
        page.globalValues.merge(notFieldParams);
    });

    page.isActiveRedirect = false;

    // Дожидаемся загрузки данных, потом делаем скрол к записи
    return Promise.all(forms.map((form: Form) => form.execHook("onFilterRedirect"))).then(() => {
        page.scrollToRecordAction(params);
    });
}
