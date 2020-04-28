import {ObservableMap} from "mobx";
import qs from "qs";
import {baseRequest} from "../request/baseRequest";
import {IRecord, FieldValue, IAuthSession, IBuilderConfig, IPageModel} from "../types";
import {
    SESSION_PREFIX,
    META_PAGE_OBJECT,
    VAR_RECORD_PAGE_OBJECT_ID,
    VAR_RECORD_MASTER_ID,
    VAR_RECORD_URL,
    VAR_RECORD_ID,
    VAR_RECORD_RES_ERROR,
} from "../constants";
import {snackbarStore} from "../models";
import {findSetKey, findGetGlobalKey} from "./findKey";
import {parseMemoize} from "./parser";
import {getMasterObject} from "./getMasterObject";
import {prepareUrl} from "./download";

interface IGetQueryParams {
    columnsName: string;
    record?: IRecord;
    globalValues: ObservableMap<string, FieldValue>;
}

interface IMakeRedirectUrlProps {
    authData: IAuthSession;
    bc: IBuilderConfig;
    redirecturl: string;
    columnsName?: string;
    record?: IRecord;
    globalValues: ObservableMap<string, FieldValue>;
}

interface IMakeRedirectUrlReturn {
    blank: boolean;
    pathname?: string;
}

interface IRedirectUseQueryProps {
    bc: IBuilderConfig;
    query: string;
    pageStore: IPageModel;
    values: IRecord;
    record: IRecord;
}

interface IRedirectToUrlProps {
    redirecturl: string;
    pageStore: IPageModel;
    values: IRecord;
    record: IRecord;
}

/**
 * Convert path into url
 * @param {string} pathname Parse string for pathname
 * @param {ObservableMap<string, FieldValue>} globalValues Global variabled
 * @param {IRecord} record - Record for data
 * @returns {string|null} URL
 */
function choiceUrl(
    pathname: string,
    globalValues: ObservableMap<string, FieldValue>,
    record: IRecord,
): string | undefined {
    const getValue = (name: string) => (record && name.charAt(0) !== "g" ? record[name] : globalValues.get(name));
    const url = parseMemoize(pathname).runer({get: getValue});

    if (typeof url === "string") {
        return url;
    }

    return undefined;
}

function redirectToUrl({redirecturl, values, pageStore, record}: IRedirectToUrlProps) {
    const url = parseMemoize(redirecturl).runer(values);

    window.open(prepareUrl(String(url), pageStore, record));
}

async function redirectUseQuery({bc, query, pageStore, values, record}: IRedirectUseQueryProps) {
    try {
        const res = await baseRequest({
            [META_PAGE_OBJECT]: bc[VAR_RECORD_PAGE_OBJECT_ID],
            action: "dml",
            json: {
                filter: values,
                master: getMasterObject(bc[VAR_RECORD_MASTER_ID], pageStore, bc.getmastervalue),
            },
            plugin: bc.extraplugingate,
            query,
            session: pageStore.applicationStore.authStore.userInfo.session,
            timeout: bc.timeout,
        });
        const isValid = snackbarStore.checkValidResponseAction(res, {
            applicationStore: pageStore.applicationStore,
            route: pageStore.route,
        });
        const url = res[VAR_RECORD_URL];

        if (isValid && url) {
            window.open(prepareUrl(url, pageStore, record));
        }

        return isValid;
    } catch (err) {
        snackbarStore.checkValidResponseAction(
            {
                // @ts-ignore
                [VAR_RECORD_ID]: null,
                [VAR_RECORD_RES_ERROR]: {
                    1000: [],
                },
            },
            {
                applicationStore: pageStore.applicationStore,
                route: pageStore.route,
            },
        );

        return false;
    }
}

/**
 * Get query params from record
 *
 * @param {string} options.columnsName - name of columns, example: ck_id,cv_name,cv_value.
 * @param {ObservableMap<string, FieldValue>} options.globalValues Global variables
 * @param {Ext.data.Model} [options.record] - Record
 *
 * @return {Object} queryParams
 */
export function getQueryParams({columnsName, record = {}, globalValues}: IGetQueryParams): IRecord {
    const keys = findSetKey(columnsName);
    const values: IRecord = {};

    for (const fieldName in keys) {
        if (Object.prototype.hasOwnProperty.call(keys, fieldName)) {
            const globaleKey = keys[fieldName];
            const value = record[fieldName] || globalValues.get(fieldName);

            if (value !== undefined) {
                values[globaleKey] = value;
            }
        }
    }

    return values;
}

/**
 * Create a link for redirect
 *
 * @param {IMakeRedirectUrlProps} props
 * @returns {Object} url
 */
export function makeRedirectUrl(props: IMakeRedirectUrlProps): IMakeRedirectUrlReturn {
    const {redirecturl, columnsName, record = {}, globalValues, authData} = props;

    const url: IMakeRedirectUrlReturn = {
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
    url.pathname = url.pathname.replace(/{([^}]+)}/g, (match, pattern: string): string => {
        if (pattern.indexOf(SESSION_PREFIX) === 0) {
            const sessKey: string = pattern.substring(SESSION_PREFIX.length);
            const value = authData[sessKey as keyof IAuthSession];

            return String(value);
        }

        if (pattern in record) {
            return String(record[pattern]);
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

export function makeRedirect(bc: IBuilderConfig, pageStore: IPageModel, record: IRecord = {}): void {
    const {redirecturl, redirectusequery, columnsfilter = ""} = bc;
    const {globalValues} = pageStore;

    const keys = findGetGlobalKey(columnsfilter);
    const values: IRecord = {};

    for (const fieldName in keys) {
        if (Object.prototype.hasOwnProperty.call(keys, fieldName)) {
            const globaleKey = keys[fieldName];
            const value: FieldValue = record[fieldName] || globalValues.get(fieldName);

            if (value !== undefined) {
                values[globaleKey] = value;
            }
        }
    }

    if (redirecturl) {
        if (redirecturl.indexOf("/") >= 0) {
            redirectToUrl({pageStore, record, redirecturl, values});
        } else {
            pageStore.applicationStore.redirectToAction(redirecturl, values);
        }
    }

    if (redirectusequery) {
        redirectUseQuery({
            bc,
            pageStore,
            query: redirectusequery,
            record,
            values,
        });
    }
}
