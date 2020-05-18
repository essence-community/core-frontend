import {runInAction, when} from "mobx";
import {i18next} from "../../utils";
import {
    loggerRoot,
    VALUE_SELF_FIRST,
    VAR_RECORD_MASTER_ID,
    VAR_RECORD_PAGE_OBJECT_ID,
    VAR_RECORD_PARENT_ID,
} from "../../constants";
import {isEmpty} from "../../utils/base";
import {FieldValue, IPageModel, IRecord} from "../../types";
import {IForm, IField} from "../../Form";

const logger = loggerRoot.extend("PageModelRedirect");
const AWAIT_DELAY = 5000;

function isHasMaster(pageStore: IPageModel, form: IForm) {
    const parentStore = form.bc && pageStore.stores.get(form.bc[VAR_RECORD_PARENT_ID]);
    const parentBc = parentStore?.bc;

    return (
        form.bc &&
        parentBc &&
        Boolean(parentBc[VAR_RECORD_MASTER_ID]) &&
        parentBc[VAR_RECORD_MASTER_ID] !== form.bc[VAR_RECORD_PAGE_OBJECT_ID]
    );
}

/**
 * Дожидается установки поля
 *
 * @param {Field} field Поля формы
 * @param {boolean} skipCheckMaster Флаг
 *
 * @return {Promise<void>} Ожидание применения поля
 */
function awaitFieldFilter(pageStore: IPageModel, field: IField, skipCheckMaster: boolean): Promise<void> {
    if (skipCheckMaster && field.bc[VAR_RECORD_MASTER_ID]) {
        return Promise.resolve();
    }

    if (
        field.value === "defaultvaluequery" ||
        (field.value === VALUE_SELF_FIRST && field.bc.defaultvalue === VALUE_SELF_FIRST)
    ) {
        return when(() => field.value !== "defaultvaluequery" && field.value !== VALUE_SELF_FIRST);
    }

    const store = pageStore.stores.get(field.bc[VAR_RECORD_PAGE_OBJECT_ID]);
    const recordsStore = store && store.recordsStore;

    if (recordsStore && recordsStore.isLoading) {
        return when(() => !recordsStore.isLoading);
    }

    return Promise.resolve();
}

export function awaitFormFilter(pageStore: IPageModel, form: IForm, skipCheckMaster: boolean): Promise<void> {
    return new Promise((resolve) => {
        const timerID = setTimeout(() => {
            logger(i18next.t("static:5327513a9d344e2184cca94cde783a52"));
            resolve();
        }, AWAIT_DELAY);

        const promises: Promise<void>[] = [];

        for (const field of form.fields.values()) {
            promises.push(awaitFieldFilter(pageStore, field, skipCheckMaster));
        }

        Promise.all(promises).then(() => {
            clearTimeout(timerID);
            resolve();
        });
    });
}

function applyFieldFilter(field: IField, params: Record<string, FieldValue>) {
    if (Object.prototype.hasOwnProperty.call(params, field.key)) {
        const value = params[field.key];

        isEmpty(value) ? field.clear() : field.onChange(value);

        delete params[field.key];
    }
}

async function runFormFilter(pageStore: IPageModel, form: IForm, params: IRecord): Promise<void> {
    await awaitFormFilter(pageStore, form, true);

    for (const field of form.fields.values()) {
        applyFieldFilter(field, params);
    }
}

async function filterAllForms(
    pageStore: IPageModel,
    forms: IForm[],
    params: IRecord,
): Promise<Record<string, FieldValue>> {
    const notFieldParams = {...params};

    await Promise.all(forms.map((form: IForm) => runFormFilter(pageStore, form, notFieldParams)));

    return notFieldParams;
}

function waitForStores(page: IPageModel) {
    const awaitStores: Promise<void>[] = [];

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

export async function redirectToPage(pageStore: IPageModel, params: Record<string, FieldValue>) {
    const formFilters: IForm[] = [];

    pageStore.isActiveRedirect = true;

    for (const form of pageStore.forms.values()) {
        if (form.placement === "filter") {
            formFilters.push(form);
        }
    }

    // При переходе все поля нужно сбрасывать в значения по умолчанию.
    runInAction("PageModelRedirect.clear|reset form", () => {
        formFilters.forEach((form: IForm) => {
            form.clear();
            form.reset();
        });
    });

    // При переходе все окна нужно закрывать
    runInAction("PageModelRedirect.clear windows", () => {
        pageStore.windows.clear();
    });

    const forms = formFilters.filter((form: IForm) => !isHasMaster(pageStore, form));
    const notFieldParams = await filterAllForms(pageStore, forms, params);
    const emptyValues: IRecord = {};

    for (const fieldName in notFieldParams) {
        if (Object.prototype.hasOwnProperty.call(notFieldParams, fieldName)) {
            emptyValues[fieldName] = null;
        }
    }

    runInAction("PageModelRedirect.set_global_values", () => {
        // Что бы запустился autorun, очистим, а потом установим
        pageStore.globalValues.merge(emptyValues);
        pageStore.globalValues.merge(notFieldParams);
    });

    // eslint-disable-next-line require-atomic-updates
    pageStore.isActiveRedirect = false;

    await waitForStores(pageStore);

    // Дожидаемся загрузки данных, потом делаем скрол к записи
    return Promise.all(forms.map((form: IForm) => form.hooks.onFilterRedirect?.(form))).then(() => {
        pageStore.scrollToRecordAction(params);
    });
}
