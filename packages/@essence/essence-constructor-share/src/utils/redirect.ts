import {ObservableMap} from "mobx";
import qs from "qs";
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
import {request} from "../request";
import {attachGlobalStore} from "../models/RecordsModel/loadRecordsAction";
import {parseMemoize} from "./parser";
import {getMasterObject} from "./getMasterObject";

interface IGetQueryParams {
    columnsName?: IBuilderConfig["columnsfilter"];
    record?: IRecord;
    globalValues: ObservableMap<string, FieldValue>;
}

interface IMakeRedirectUrlProps {
    authData: Partial<IAuthSession>;
    bc: IBuilderConfig;
    redirecturl: string;
    columnsName?: IBuilderConfig["columnsfilter"];
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

export function prepareUrl(url: string, pageStore: IPageModel, record: Record<string, FieldValue> = {}) {
    // eslint-disable-next-line require-unicode-regexp,  prefer-named-capture-group
    return url.replace(/{([^}]+)}/g, (_match, pattern): string => {
        if (pattern in record) {
            return record[pattern] as string;
        }

        const globalValue = pageStore.globalValues.get(pattern);

        if (typeof globalValue === "string") {
            return globalValue;
        }

        if (typeof globalValue === "number") {
            return String(globalValue);
        }

        return "";
    });
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
    const renerProc = parseMemoize(pathname);
    const url = renerProc.hasError ? pathname : renerProc.runer({get: getValue});

    if (typeof url === "string") {
        return url;
    }

    return undefined;
}

function redirectToApplication(pageStore: IPageModel, values: IRecord, redirectUrl: string) {
    const parts = redirectUrl.split("/").filter(Boolean);

    if (Object.keys(values).length > 0) {
        parts.push(encodeURIComponent(btoa(unescape(encodeURIComponent(JSON.stringify(values))))));
    }

    pageStore.applicationStore.history.push(`/${parts.join("/")}`);
}

function redirectToUrl({redirecturl, values, pageStore, record}: IRedirectToUrlProps) {
    const url = choiceUrl(redirecturl, pageStore.globalValues, record);

    if (url) {
        if (url.indexOf("redirect/") === 0) {
            redirectToApplication(pageStore, values, url.replace("redirect/", ""));
        } else {
            window.open(prepareUrl(url, pageStore, record));
        }
    }
}

async function redirectUseQuery({bc, query, pageStore, values, record}: IRedirectUseQueryProps) {
    try {
        const json = {
            filter: values,
            master: getMasterObject(bc[VAR_RECORD_MASTER_ID], pageStore, bc.getmastervalue),
        };

        attachGlobalStore({bc, globalValues: pageStore.globalValues, json});
        const res: any = await request({
            [META_PAGE_OBJECT]: bc[VAR_RECORD_PAGE_OBJECT_ID],
            action: "dml",
            json,
            list: false,
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
    const values: IRecord = {};

    columnsName?.forEach(({in: keyIn, out}) => {
        const name = keyIn || out;
        const value: FieldValue = record[name] || globalValues.get(name);

        if (value !== undefined) {
            values[out] = value;
        }
    });

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
    const {redirecturl, redirectusequery, columnsfilter} = bc;
    const {globalValues} = pageStore;

    const values: IRecord = getQueryParams({columnsName: columnsfilter, globalValues, record});

    if (redirecturl) {
        if (redirecturl.indexOf("redirect/") === 0) {
            redirectToApplication(pageStore, values, redirecturl.replace("redirect/", ""));
        } else if (redirecturl.indexOf("/") >= 0) {
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
