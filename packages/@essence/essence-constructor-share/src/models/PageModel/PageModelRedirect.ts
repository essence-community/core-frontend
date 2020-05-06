/* eslint-disable @typescript-eslint/no-explicit-any */
import forOwn from "lodash/forOwn";
import {runInAction, when} from "mobx";
import {i18next} from "../../utils";
import {loggerRoot, VALUE_SELF_FIRST, VAR_RECORD_MASTER_ID} from "../../constants";
import {isEmpty} from "../../utils/base";
import {FieldValue, IPageModel} from "../../types";

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
function awaitFieldFilter(field: any, skipCheckMaster: boolean): Promise<void> {
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

export function awaitFormFilter(form: any, skipCheckMaster: boolean): Promise<void> {
    return new Promise((resolve) => {
        const timerID = setTimeout(() => {
            logger(i18next.t("static:5327513a9d344e2184cca94cde783a52"));
            resolve();
        }, AWAIT_DELAY);

        Promise.all(form.map((field: any) => awaitFieldFilter(field, skipCheckMaster))).then(() => {
            clearTimeout(timerID);
            resolve();
        });
    });
}

function applyFieldFilter(field: any, params: Record<string, FieldValue>) {
    if (Object.prototype.hasOwnProperty.call(params, field.key)) {
        const value = params[field.key];

        isEmpty(value) ? field.clear() : field.onChange(value);

        delete params[field.key];
    }
}

async function runFormFilter(form: any, params: Record<string, any>): Promise<void> {
    await awaitFormFilter(form, true);

    form.each((field: any) => {
        applyFieldFilter(field, params);
    });
}

async function filterAllForms(forms: any[], params: Record<string, FieldValue>): Promise<Record<string, FieldValue>> {
    const notFieldParams = {...params};

    await Promise.all(forms.map((form: any) => runFormFilter(form, notFieldParams)));

    return notFieldParams;
}

function waitForStores(page: IPageModel) {
    const awaitStores: Promise<any>[] = [];

    for (const store of page.stores.values()) {
        if (store.recordsStore?.isLoading) {
            awaitStores.push(when(() => !store.recordsStore?.isLoading));
        }
    }

    if (awaitStores.length === 0) {
        return Promise.resolve(true);
    }

    return new Promise((resolve) => {
        const timerID = setTimeout(() => {
            logger(i18next.t("static:5327513a9d344e2184cca94cde783a52"));
            resolve(false);
        }, AWAIT_DELAY);

        Promise.all(awaitStores).then(() => {
            clearTimeout(timerID);
            resolve(true);
        });
    });
}

export async function redirectToPage(page: any, params: Record<string, FieldValue>) {
    page.isActiveRedirect = true;

    // При переходе все поля нужно сбрасывать в значения по умолчанию.
    runInAction("PageModelRedirect.clear|reset form", () => {
        page.formFilters.forEach((form: any) => {
            form.clear();
            form.reset();
        });
    });

    // При переходе все окна нужно закрывать
    runInAction("PageModelRedirect.clear windows", () => {
        page.windowsOne.clear();
    });

    // $FlowFixMe
    const forms = page.formFilters.filter((form: any) => !form.hasMaster);
    const notFieldParams = await filterAllForms(forms, params);
    const emptyValues: Record<string, any> = {};

    forOwn(notFieldParams, (_fieldValue: FieldValue, fieldName: string) => {
        emptyValues[fieldName] = null;
    });

    runInAction("PageModelRedirect.set_global_values", () => {
        // Что бы запустился autorun, очистим, а потом установим
        page.globalValues.merge(emptyValues);
        page.globalValues.merge(notFieldParams);
    });

    // eslint-disable-next-line require-atomic-updates
    page.isActiveRedirect = false;

    await waitForStores(page);

    // Дожидаемся загрузки данных, потом делаем скрол к записи
    return Promise.all(forms.map((form: any) => form.onFilterRedirect)).then(() => {
        page.scrollToRecordAction(params);
    });
}
