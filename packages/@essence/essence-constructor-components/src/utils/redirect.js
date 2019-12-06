// @flow
import {type ObservableMap} from "mobx";
import {camelCaseMemoized, parseMemoize} from "@essence/essence-constructor-share/utils";
import {snackbarStore} from "@essence/essence-constructor-share/models";
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

const SESSION_PREFIX = "sess_";

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
 * @param {string} ckPage - Номер страницы.
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

    url.pathname = url.pathname.replace(/{([^}]+)}/g, (match, pattern) => {
        if (pattern.indexOf(SESSION_PREFIX) > -1) {
            return authData[camelCaseMemoized(pattern.substring(SESSION_PREFIX.length))];
        }

        const key = camelCaseMemoized(pattern);
        const globalValue = globalValues.get(key);

        if (key in record) {
            return record[key];
        }

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

export const redirectUseQuery = ({
    bc,
    query,
    pageStore,
    values,
}: {
    bc: Object,
    query: string,
    pageStore: PageModelType,
    values: Object,
}) =>
    sendRequest({
        action: "dml",
        gate: bc.ckDEndpoint,
        json: {
            filter: values,
        },
        pageObject: bc.ckPageObject,
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

            if (isValid) {
                window.open(res.cvUrl);
            }

            return isValid;
        })
        .catch(() => {
            snackbarStore.checkValidResponseAction(
                {
                    ckId: null,
                    cvError: {
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

function redirectToUrl(redirecturl: string, values: Object) {
    const url = parseMemoize(redirecturl).runer(values);

    window.open(url);
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
            redirectToUrl(redirecturl, values);
        } else {
            pageStore.applicationStore.redirectToAction(redirecturl, values);
        }
    }

    redirectusequery &&
        redirectUseQuery({
            bc,
            pageStore,
            query: redirectusequery,
            values,
        });
};
