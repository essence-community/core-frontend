// @flow
import {type ObservableMap} from "mobx";
import {parseMemoize, getMasterObject, prepareUrl} from "@essence-community/constructor-share/utils";
import {snackbarStore} from "@essence-community/constructor-share/models";
import {
    VAR_RECORD_ID,
    VAR_RECORD_PAGE_OBJECT_ID,
    VAR_RECORD_RES_ERROR,
    VAR_RECORD_URL,
    VAR_RECORD_MASTER_ID,
    META_PAGE_OBJECT,
    VAR_RECORD_CK_D_ENDPOINT,
    SESSION_PREFIX,
} from "@essence-community/constructor-share/constants";
import forOwn from "lodash/forOwn";
import qs from "qs";
import {type PageModelType} from "../stores/PageModel";
import {sendRequest} from "../request/baseRequest";
import {findSetKey, findGetGlobalKey} from "./findKey";

type BcType = {
    columnsfilter?: string,
    redirecturl?: string,
    redirectusequery?: string,
};

/**
 * Преобразование пути
 * @param {string} pathname формула
 * @param {Object} globalValues глобальные переменные
 * @param {Object} record - Модель с данными.
 * @returns {string|null} URL
 */
export function choiceUrl(pathname: string, globalValues: ObservableMap<string, mixed>, record: Object): string | void {
    const getValue = (name: string) => (record && name.charAt(0) !== "g" ? record[name] : globalValues.get(name));
    const url = parseMemoize(pathname).runer({get: getValue});

    if (typeof url === "string") {
        return url;
    }

    return undefined;
}

/**
 * Получаем query params из записи.
 *
 * @param {string} [columnsName] - Названия колонок, через запятую, которые можно получить с record.
 * @param {Ext.data.Model} [record] - Модель с данными.
 *
 * @return {Object} queryParams
 */
export function getQueryParams({
    columnsName,
    record = {},
    globalValues,
}: {
    columnsName: string,
    record?: Object,
    globalValues: ObservableMap<string, mixed>,
}) {
    const keys = findSetKey(columnsName);
    const values = {};

    forOwn(keys, (fieldName, globaleKey) => {
        const value = record[fieldName] || globalValues.get(fieldName);

        if (value !== undefined) {
            values[globaleKey] = value;
        }
    });

    return values;
}

/**
 * Создание линки для перехода
 *
 * @param {object} props - параметры для функциии
 * @param {object} props.bc - конфиг поля.
 * @param {string} props.redirecturl - URL адрес страницы.
 * @param {string} [props.columnsName] - Названия колонок, через запятую, которые можно получить с record.
 * @param {Object} [props.record] - Модель с данными.
 * @param {Object} [props.globalValues] - Объект с глобальными даннами
 *
 * @returns {Object} url
 */
// eslint-disable-next-line max-lines-per-function
export function makeRedirectUrl(props: {
    authData: Object,
    bc: Object,
    redirecturl: string,
    columnsName?: string,
    record?: Object,
    globalValues: ObservableMap<string, mixed>,
}): {blank: boolean, pathname?: string} {
    const {redirecturl, columnsName, record = {}, globalValues, authData} = props;

    const url = {
        blank: false,
        pathname:
            redirecturl.indexOf("?") > -1 && redirecturl.indexOf("\x22") > -1
                ? choiceUrl(redirecturl, globalValues, record)
                : redirecturl,
    };

    if (!url.pathname) {
        return url;
    }

    // eslint-disable-next-line require-unicode-regexp,  prefer-named-capture-group
    url.pathname = url.pathname.replace(/{([^}]+)}/g, (match, pattern) => {
        if (pattern.indexOf(SESSION_PREFIX) === 0) {
            return authData[pattern.substring(SESSION_PREFIX.length)];
        }

        if (pattern in record) {
            return record[pattern];
        }

        const globalValue = globalValues.get(pattern);

        if (typeof globalValue === "string") {
            return globalValue;
        }

        return "";
    });

    if (url.pathname && url.pathname.indexOf("_blank") > -1) {
        const queryParams = columnsName ? getQueryParams({columnsName, globalValues, record}) : {};

        url.blank = true;
        url.pathname = `${url.pathname.replace("_blank", "")}${
            Object.keys(queryParams).length ? `?${qs.stringify(queryParams)}` : ""
        }`;
    }

    return url;
}

// eslint-disable-next-line max-lines-per-function
export const redirectUseQuery = ({
    bc,
    query,
    pageStore,
    values,
    record,
}: {
    bc: Object,
    query: string,
    pageStore: PageModelType,
    values: Object,
    record: Object,
}) =>
    sendRequest({
        [META_PAGE_OBJECT]: bc[VAR_RECORD_PAGE_OBJECT_ID],
        action: "dml",
        gate: bc[VAR_RECORD_CK_D_ENDPOINT],
        json: {
            filter: values,
            master: getMasterObject(bc[VAR_RECORD_MASTER_ID], pageStore, bc.getmastervalue),
        },
        plugin: bc.extraplugingate,
        query,
        session: pageStore.applicationStore.session,
        timeout: bc.timeout,
    })
        .then((res) => {
            const isValid = snackbarStore.checkValidResponseAction(
                res,
                pageStore.route,
                undefined,
                pageStore.applicationStore,
            );

            const url = res[VAR_RECORD_URL];

            if (isValid && url) {
                window.open(prepareUrl(url, pageStore, record));
            }

            return isValid;
        })
        .catch(() => {
            snackbarStore.checkValidResponseAction(
                {
                    [VAR_RECORD_ID]: null,
                    [VAR_RECORD_RES_ERROR]: {
                        // $FlowFixMe
                        1000: [],
                    },
                },
                pageStore.route,
                undefined,
                pageStore.applicationStore,
            );

            return false;
        });

function redirectToUrl({
    redirecturl,
    values,
    pageStore,
    record,
}: {
    redirecturl: string,
    values: Object,
    pageStore: PageModelType,
    record: Object,
}) {
    const url = parseMemoize(redirecturl).runer(values);

    window.open(prepareUrl(url, pageStore, record));
}

export const makeRedirect = (bc: BcType, pageStore: PageModelType, record: Object = {}): void => {
    const {redirecturl, redirectusequery, columnsfilter = ""} = bc;
    const {globalValues} = pageStore;

    const keys = findGetGlobalKey(columnsfilter);
    const values = {};

    forOwn(keys, (fieldName: string, globaleKey: string) => {
        const value = record[fieldName] || globalValues.get(fieldName);

        if (value !== undefined) {
            values[globaleKey] = value;
        }
    });

    if (redirecturl) {
        if (redirecturl.indexOf("/") >= 0) {
            redirectToUrl({pageStore, record, redirecturl, values});
        } else {
            pageStore.applicationStore.redirectToAction(redirecturl, values);
        }
    }

    redirectusequery &&
        redirectUseQuery({
            bc,
            pageStore,
            query: redirectusequery,
            record,
            values,
        });
};
