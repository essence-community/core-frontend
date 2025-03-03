import {ObservableMap} from "mobx";
import qs from "qs";
import {History} from "history";
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
import {settingsStore} from "../models/SettingsModel";
import {
    META_PAGE_ID,
    VAR_RECORD_IS_NOT_BLANC,
    VAR_RECORD_ROUTE_PAGE_ID,
    VAR_SETTING_AUTH_URL,
    VAR_SETTING_BASE_PATH,
    VAR_SETTING_BASE_URL,
} from "../constants/variables";
import {parseMemoize} from "./parser";
import {getMasterObject} from "./getMasterObject";
import {encodePathUrl} from "./base";
import {setMask} from "./mask";

interface IGetQueryParams {
    columnsName?: IBuilderConfig["columnsfilter"];
    record?: IRecord;
    globalValues: ObservableMap<string, FieldValue>;
}

interface IRedirectAuthParam {
    history: History;
    pageStore: IPageModel;
    backUrl?: string;
}

interface IMakeRedirectUrlProps {
    bc: IBuilderConfig;
    record?: IRecord;
    pageStore: IPageModel;
}

interface IMakeRedirectUrlReturn {
    isRedirect: boolean;
    blank: boolean;
    pathname?: string;
}

interface IRedirectUseQueryProps {
    bc: IBuilderConfig;
    query: string;
    pageStore: IPageModel;
    values: IRecord;
    record: IRecord;
    noBlank?: boolean;
}

interface IRedirectToUrlProps {
    redirecturl: string;
    pageStore: IPageModel;
    values: IRecord;
    record: IRecord;
    noBlank?: boolean;
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
    const getValue = (name: string) =>
        typeof name === "string" && name.charAt(0) === "g"
            ? globalValues.get(name)
            : (typeof record === "object" ? record : {})[name];
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
        parts.push(encodePathUrl(values));
    }

    pageStore.applicationStore.history.push(`/${parts.join("/")}`);
}

function redirectToUrl({noBlank, redirecturl, values, pageStore, record}: IRedirectToUrlProps) {
    const url = choiceUrl(redirecturl, pageStore.globalValues, record);

    if (url) {
        if (url.indexOf("redirect/") === 0) {
            redirectToApplication(pageStore, values, url.replace("redirect/", ""));
        } else if (noBlank) {
            document.location.href = prepareUrl(url, pageStore, record);
        } else {
            window.open(prepareUrl(url, pageStore, record));
        }
    }
}

async function redirectUseQuery({bc, noBlank, query, pageStore, values, record}: IRedirectUseQueryProps) {
    try {
        const json = {
            filter: values,
            master: getMasterObject(bc[VAR_RECORD_MASTER_ID], pageStore, bc.getmastervalue),
        };

        attachGlobalStore({
            bc,
            getValue: (name: string) =>
                pageStore.globalValues.has(name) ? pageStore.globalValues.get(name) : record[name],
            globalValues: pageStore.globalValues,
            json,
        });
        setMask(true, bc.noglobalmask, pageStore);
        const res: any = await request({
            [META_PAGE_ID]: pageStore.pageId || bc[VAR_RECORD_ROUTE_PAGE_ID],
            [META_PAGE_OBJECT]: bc[VAR_RECORD_PAGE_OBJECT_ID],
            json,
            list: false,
            plugin: bc.extraplugingate,
            query,
            session: pageStore.applicationStore.authStore.userInfo.session,
            timeout: bc.timeout,
        });

        setMask(false, bc.noglobalmask, pageStore);
        const isValid = snackbarStore.checkValidResponseAction(res, {
            applicationStore: pageStore.applicationStore,
            route: pageStore.route,
        });
        const url = res[VAR_RECORD_URL];
        const isNotBlank = res[VAR_RECORD_IS_NOT_BLANC] || noBlank;

        if (isValid && url) {
            if (isNotBlank) {
                document.location.href = prepareUrl(url, pageStore, record);
            } else {
                window.open(prepareUrl(url, pageStore, record));
            }
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
        setMask(false, bc.noglobalmask, pageStore);

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
    const {bc, record = {}, pageStore} = props;
    const {redirectusequery, redirecturl, columnsfilter} = bc;
    const {globalValues} = pageStore;

    const url: IMakeRedirectUrlReturn = {
        blank: typeof bc.noblank === "boolean" ? !bc.noblank : false,
        isRedirect: false,
        pathname:
            redirecturl &&
            ((redirecturl.indexOf("?") > -1 && redirecturl.indexOf("\x22")) || redirecturl.startsWith("`"))
                ? choiceUrl(redirecturl, globalValues, record)
                : redirecturl,
    };

    if (!url.pathname) {
        if (redirectusequery) {
            url.isRedirect = true;
        }

        return url;
    }

    url.isRedirect = true;

    // eslint-disable-next-line require-unicode-regexp,  prefer-named-capture-group
    url.pathname = url.pathname.replace(/{([^}]+)}/g, (match, pattern: string): string => {
        if (pattern.indexOf(SESSION_PREFIX) === 0) {
            const sessKey: string = pattern.substring(SESSION_PREFIX.length);
            const value = pageStore.applicationStore.authStore.userInfo[sessKey as keyof IAuthSession];

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
    const queryParams = columnsfilter ? getQueryParams({columnsName: columnsfilter, globalValues, record}) : {};

    if (
        url.pathname &&
        !url.pathname.startsWith("http:") &&
        !url.pathname.startsWith("https:") &&
        (url.pathname.indexOf("\\") < 0 || url.pathname.startsWith("redirect"))
    ) {
        url.pathname = `${settingsStore.settings[VAR_SETTING_BASE_URL]}${
            settingsStore.settings[VAR_SETTING_BASE_PATH]
        }${
            url.pathname.startsWith("redirect")
                ? url.pathname.replace("redirect", "")
                : `${pageStore.applicationStore.url}/${url.pathname}`
        }/${encodePathUrl(queryParams)}`;
    }

    if (url.pathname && url.pathname.indexOf("_blank") > -1) {
        url.blank = true;
        url.pathname = `${url.pathname.replace("_blank", "")}${
            Object.keys(queryParams).length ? `?${qs.stringify(queryParams)}` : ""
        }`;
    }

    return url;
}

export function makeRedirect(
    bc: IBuilderConfig,
    pageStore: IPageModel,
    record: IRecord = {},
    noBlank = typeof bc.noblank === "boolean" ? bc.noblank : false,
): void {
    const {redirecturl, redirectusequery, columnsfilter} = bc;
    const {globalValues} = pageStore;
    let redirectUrl = redirecturl;
    const values: IRecord = getQueryParams({columnsName: columnsfilter, globalValues, record});

    if (redirectUrl) {
        if (redirectUrl.startsWith("`") && redirectUrl.endsWith("`")) {
            redirectUrl = choiceUrl(redirectUrl, pageStore.globalValues, record);
        }
        if (redirectUrl) {
            if (redirectUrl.indexOf("redirect/") === 0) {
                redirectToApplication(pageStore, values, redirectUrl.replace("redirect/", ""));
            } else if (redirectUrl.indexOf("/") >= 0 || redirectUrl[0] === "`") {
                redirectToUrl({noBlank, pageStore, record, redirecturl: redirectUrl, values});
            } else {
                pageStore.applicationStore.redirectToAction(redirectUrl, values);
            }
        }
    }

    if (redirectusequery) {
        redirectUseQuery({
            bc,
            noBlank,
            pageStore,
            query: redirectusequery,
            record,
            values,
        });
    }
}

/**
 * Переход в авторизацию
 * @param param0
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function redirectAuth({backUrl, history, pageStore}: IRedirectAuthParam) {
    let url = settingsStore.settings[VAR_SETTING_AUTH_URL] || "/auth";
    const params =
        history.location.search && history.location.search.slice(1) ? qs.parse(history.location.search.slice(1)) : {};

    if (url.startsWith("/") || url.startsWith("http") || url.startsWith("{")) {
        url = prepareUrl(url, pageStore, {
            ...params,
            backUrl,
        });
    } else {
        url =
            choiceUrl(url, pageStore.globalValues, {
                ...params,
                backUrl,
            }) || "/auth";
    }
    if (url.startsWith("http")) {
        window.location.href = url;
    } else {
        history.push(url, backUrl ? {backUrl} : undefined);
    }
}
