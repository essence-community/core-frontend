/* eslint-disable max-lines */
// eslint-disable-next-line import/named
import {observable, computed, action, IObservableArray, makeObservable} from "mobx";
import {v4} from "uuid";
import {isObject, forEach, get} from "lodash";
import {
    IBuilderConfig,
    IRecord,
    IApplicationModel,
    FieldValue,
    IResponse,
    ISnackbarModel,
    ISnackbar,
    SnackbarStatus,
    IErrorData,
} from "../../types";
import {isEmpty, i18next, TFunction} from "../../utils";
import {
    VAR_RECORD_ROUTE_NAME,
    VAR_RECORD_RES_ERROR,
    VAR_RECORD_RES_STACK_TRACE,
    VAR_RECORD_ID,
    VAR_RECORD_PARENT_ID,
    VAR_RECORD_PAGE_OBJECT_ID,
    VAR_RECORD_QUERY_ID,
    VAR_RECORD_CV_TEXT,
    VAR_RECORD_CR_TYPE,
    VAR_RECORD_CV_RESULT,
    VAR_ERROR_CODE,
    VAR_ERROR_ID,
    VAR_ERROR_TEXT,
    VAR_RECORD_RES_FORM_ERROR,
    VAR_RESULT_MESSAGE,
} from "../../constants";
import {IRouteRecord} from "../../types/RoutesModel";
import {TText, IOptionCheck, MessageType, MessageTypeStrings, IMessage} from "../../types/SnackbarModel";
import {IForm} from "../../Form";
import {RecordsModelLite} from "../RecordsModelLite/RecordsModelLite";
import {IRecordsModelLite} from "../../types/RecordsModel";
import {saveToLocalStore} from "../../utils/storage";
import {
    MAX_OPENED_SNACKBARS,
    CODE_ACCESS_DENIEND,
    GROUP_ACTION_MAP,
    CODE_GROUP_MAP,
    MAX_DEBUG_SNACKBARS,
    MAX_SNACKBARS,
} from "./SnackbarModel.contants";

/**
 * @class SnackbarModel
 *
 * Класс является signleton и может экспортироваться как snackbarStore.
 * Использование происходит на всех приложениях и служить для вывода нотификаций между приложениями.
 * Для создания нотификации для отдельного приложения можно создавать отдельные экзепляры класса.
 */
export class SnackbarModel implements ISnackbarModel {
    @observable
    snackbars: IObservableArray<ISnackbar> = observable.array([]);
    @observable
    snackbarsAll: IObservableArray<ISnackbar> = observable.array([]);

    recordsStore: IRecordsModelLite;

    @observable
    activeStatus: SnackbarStatus = "all";
    @computed
    get snackbarsCount(): number {
        return this.snackbarsAll.filter((snackbar: ISnackbar) => snackbar.status !== "debug" && snackbar.read === false)
            .length;
    }
    @computed
    get snackbarsInStatus(): Array<ISnackbar> {
        if (this.activeStatus === "all") {
            return this.snackbarsAll.filter((snackbar: ISnackbar) => snackbar.status !== "debug");
        } else if (this.activeStatus === "notification") {
            return this.snackbarsAll.filter(
                (snackbar: ISnackbar) =>
                    snackbar.pageName === i18next.t("static:2ff612aa52314ddea65a5d303c867eb8") ||
                    snackbar.status === this.activeStatus,
            );
        }

        return this.snackbarsAll.filter((snackbar: ISnackbar) => snackbar.status === this.activeStatus);
    }
    @computed
    get snackbarsInStatusToReadCount(): number {
        return this.snackbarsInStatus.filter((snackbar: ISnackbar) => snackbar.read === false).length;
    }

    constructor() {
        // eslint-disable-next-line @typescript-eslint/no-var-requires, global-require
        const bc: IBuilderConfig = {
            [VAR_RECORD_PAGE_OBJECT_ID]: "Snackbar",
            [VAR_RECORD_PARENT_ID]: "root",
            [VAR_RECORD_QUERY_ID]: "GetMsgList",
            type: "NONE",
        };

        this.recordsStore = new RecordsModelLite(bc);
        makeObservable(this);
    }

    @action
    deleteAllSnackbarAction = () => {
        if (this.activeStatus === "all") {
            this.snackbarsAll = observable.array(this.snackbarsAll.filter((snackbar) => snackbar.status === "debug"));
        } else if (this.activeStatus === "notification") {
            this.snackbarsAll = observable.array(
                this.snackbarsAll.filter(
                    (snackbar) =>
                        snackbar.pageName !== i18next.t("static:2ff612aa52314ddea65a5d303c867eb8") &&
                        snackbar.status !== this.activeStatus,
                ),
            );
        } else {
            this.snackbarsAll = observable.array(
                this.snackbarsAll.filter((snackbar) => snackbar.status !== this.activeStatus),
            );
        }
    };

    @action
    deleteSnackbarAction = (snackbarId: string) => {
        this.snackbarsAll = observable.array(this.snackbarsAll.filter((snakebar) => snakebar.id !== snackbarId));
    };

    @action
    readSnackbarAction = (snackbarId: string) => {
        const snackbar = this.snackbarsAll.find((snack) => snack.id === snackbarId);

        if (snackbar) {
            snackbar.read = true;
        }
    };

    @action
    readActiveSnackbarsAction = () => {
        this.snackbarsInStatus.forEach((snackbar) => {
            if (snackbar.read === false) {
                snackbar.read = true;
            }
        });
    };

    @action
    setStatusAction = (status: SnackbarStatus) => {
        this.activeStatus = status;
    };

    @action
    snackbarOpenAction = (snackbar: Partial<ISnackbar>, route?: IRouteRecord): ISnackbar => {
        const routeName = route && route[VAR_RECORD_ROUTE_NAME];
        const {id, ...snackbarData} = snackbar;
        const date = new Date();
        const snackbarProps: ISnackbar = {
            autoHidden: true,
            // TODO: should be format "DD.MM.YYYY, HH:mm";
            createdAt: date.toLocaleString(),
            hiddenTimeout: 5000,
            id: id || v4(),
            open: true,
            pageName: typeof routeName === "string" ? routeName : "",
            read: false,
            status: "all",
            text: "",
            type: "msg",
            ...snackbarData,
        };

        if (snackbar.hiddenTimeout !== 0) {
            const openedSnackbars = observable.array(this.snackbars.filter((snack) => snack.open !== false));

            if (openedSnackbars.length >= MAX_OPENED_SNACKBARS) {
                openedSnackbars[openedSnackbars.length - 1].open = false;
            }

            this.snackbars.unshift(snackbarProps);
        }

        this.snackbarsAll.unshift(snackbarProps);

        let debugCount = 0;

        this.snackbarsAll = observable.array(
            this.snackbarsAll.filter((msg) => {
                if (msg.status === "debug") {
                    if (debugCount > MAX_DEBUG_SNACKBARS) {
                        return false;
                    }
                    debugCount = +1;
                }

                return true;
            }),
        );

        if (this.snackbarsAll.length > MAX_SNACKBARS) {
            this.snackbarsAll = observable.array(this.snackbarsAll.slice(0, MAX_SNACKBARS));
        }

        return snackbarProps;
    };

    @action
    setClosebleAction = (snackbarId: string) => {
        const closableSnackbar = this.snackbars.find((snakebar) => snakebar.id === snackbarId);

        if (closableSnackbar) {
            closableSnackbar.open = false;
        }
    };

    @action
    snackbarCloseAction = (snackbarId: ISnackbar["id"]) => {
        const removedSnackbar = this.snackbars.find((snakebar) => snakebar.id === snackbarId);

        if (removedSnackbar) {
            this.snackbars.remove(removedSnackbar);
        }
    };

    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    forMessage = (
        messageType: SnackbarStatus,
        route?: Record<string, FieldValue>,
        message: string[][] | IMessage[] = [],
        isSnack = true,
    ) => {
        const textArr: IMessage[] = [];

        forEach(message, (value) => {
            if (Array.isArray(value)) {
                const [message, ...values] = value;
                const text = (trans: TFunction) =>
                    typeof message === "string"
                        ? trans(message, {
                              defaultValue: message,
                              ns: "message",
                          })
                              // eslint-disable-next-line require-unicode-regexp, prefer-named-capture-group
                              .replace(/{(\d+)}/g, (match, pattern) =>
                                  values.length
                                      ? trans(values[pattern], {
                                            defaultValue: values[pattern],
                                            ns: "message",
                                        })
                                      : "",
                              )
                        : "";

                textArr.push({text: message});
                if (isSnack) {
                    this.snackbarOpenAction(
                        {
                            status: messageType,
                            text,
                        },
                        route,
                    );
                }
            } else if (typeof value === "object") {
                const msg = value as IMessage;

                msg.text = (trans: TFunction) =>
                    typeof msg.text === "string"
                        ? trans(msg.text, {
                              defaultValue: msg.text,
                              ns: "message",
                          })
                              // eslint-disable-next-line require-unicode-regexp, prefer-named-capture-group
                              .replace(/{(\d+)}/g, (match, pattern) =>
                                  msg.args && msg.args.length
                                      ? trans(msg.args[pattern], {
                                            defaultValue: msg.args[pattern],
                                            ns: "message",
                                        })
                                      : "",
                              )
                        : "";
                msg.description =
                    typeof msg.description === "string"
                        ? (trans: TFunction) =>
                              trans(msg.description as string, {
                                  defaultValue: msg.description,
                                  ns: "message",
                              })
                        : msg.description;
                msg.title =
                    typeof msg.title === "string"
                        ? (trans: TFunction) =>
                              trans(msg.title as string, {
                                  defaultValue: msg.title,
                                  ns: "message",
                              })
                        : msg.title;

                textArr.push(msg);
                if (isSnack) {
                    this.snackbarOpenAction(
                        {
                            description: msg.description as any,
                            status: messageType,
                            text: msg.text,
                            title: msg.title,
                        },
                        route,
                    );
                }
            }
        });

        return textArr;
    };

    // eslint-disable-next-line max-statements
    @action
    checkValidResponseAction = // eslint-disable-next-line max-statements
        (
            // eslint-disable-next-line default-param-last
            response: IResponse = {},
            {applicationStore, form, route, warnCallBack} = {} as IOptionCheck,
        ) =>
            // eslint-disable-next-line max-params
            {
                if (typeof response !== "object") {
                    if (typeof response === "boolean") {
                        return response ? 0 : 1;
                    }
                    if (
                        typeof response === "string" &&
                        ((response as string).trim().toLowerCase() === "true" ||
                            (response as string).trim().toLowerCase() === "false")
                    ) {
                        return (response as string).trim().toLowerCase() === "true" ? 0 : 1;
                    }

                    return 0;
                }
                const error = response[VAR_RECORD_RES_ERROR];
                const jtMessage = response[VAR_RESULT_MESSAGE];
                const formError = response[VAR_RECORD_RES_FORM_ERROR];
                const stackTrace = response[VAR_RECORD_RES_STACK_TRACE];
                let isError = false;
                let isWarn = false;
                let rec: boolean | IRecord | undefined = false;
                let warningText: TText[] = [];

                if (isEmpty(error) && isEmpty(formError) && isEmpty(jtMessage)) {
                    return 1;
                }
                if (isObject(formError)) {
                    isError = this.formError(formError, form, route);
                }
                if (isObject(error)) {
                    // eslint-disable-next-line default-param-last
                    forEach(error, (values: string[] = [], code) => {
                        rec =
                            code === "block" || code === "unblock"
                                ? {
                                      [VAR_RECORD_CR_TYPE]: code,
                                      [VAR_RECORD_CV_TEXT]: "{0}",
                                  }
                                : this.recordsStore.recordsState.records.find(
                                      (record: IRecord) => String(record[this.recordsStore.recordId]) === code,
                                  );

                        if (code === CODE_ACCESS_DENIEND && applicationStore && route) {
                            const routeId = route[VAR_RECORD_ID];

                            if (typeof routeId === "string") {
                                applicationStore.pagesStore.removePageAction(routeId);
                            }
                        }
                        if (rec) {
                            const {[VAR_RECORD_CV_TEXT]: message = ""} = rec;
                            const messageType = rec[VAR_RECORD_CR_TYPE];
                            const text = (trans: TFunction) =>
                                typeof message === "string"
                                    ? trans(message, {
                                          defaultValue: message,
                                          ns: "message",
                                      })
                                          // eslint-disable-next-line require-unicode-regexp, prefer-named-capture-group
                                          .replace(/{(\d+)}/g, (match, pattern) =>
                                              values.length
                                                  ? trans(values[pattern], {
                                                        defaultValue: values[pattern],
                                                        ns: "message",
                                                    })
                                                  : "",
                                          )
                                    : "";

                            if (messageType === "error") {
                                isError = true;
                            }
                            if (warnCallBack && messageType === "warning") {
                                isWarn = true;
                                warningText.push(text);
                            }

                            if ((messageType === "block" || messageType === "unblock") && applicationStore) {
                                applicationStore.blockApplicationAction(messageType, text);
                            }
                            this.snackbarOpenAction(
                                {
                                    status: String(messageType) as SnackbarStatus,
                                    text,
                                },
                                route,
                            );
                        }
                    });
                }
                if (isObject(jtMessage)) {
                    forEach(jtMessage, (value: string[][] | IMessage[], key: MessageTypeStrings) => {
                        if (key in MessageType) {
                            const textArr = this.forMessage(key, route, value);

                            if (key === "error") {
                                isError = true;
                            }
                            if (key === "warning") {
                                isWarn = true;
                                warningText = textArr.map((val) => val.text);
                            }
                            if (key === "block" || key === "unblock") {
                                const [text] = textArr;

                                applicationStore?.blockApplicationAction(key, text.text);
                            }
                        }
                    });
                }
                if ((isError || isWarn) && stackTrace) {
                    this.snackbarOpenAction(
                        {
                            status: "debug",
                            text: stackTrace,
                        },
                        route,
                    );
                }
                if (!isError && isWarn && warnCallBack) {
                    warnCallBack(warningText);

                    return 2;
                }

                return isError ? 0 : 1;
            };

    /**
     * Add error to field
     */
    formError = (
        formError: Record<string, Record<string, string[] | string[][]>>,
        form?: IForm,
        route?: Record<string, FieldValue>,
    ): boolean => {
        let isError = false;

        // eslint-disable-next-line default-param-last
        forEach(formError, (errors: Record<string, string[] | string[][] | IMessage[]> = {}, fieldName: string) => {
            const field = form?.select(fieldName);
            const fieldError: any[] = [];

            // eslint-disable-next-line default-param-last
            forEach(errors, (values: string[] | string[][] = [], code) => {
                if (code in MessageType) {
                    const arrText = this.forMessage(code as SnackbarStatus, route, values as string[][], false);

                    forEach(arrText, (msg) => {
                        if (code === "error") {
                            isError = true;
                            fieldError.push(msg.text);
                        } else {
                            this.snackbarOpenAction(
                                {
                                    description: msg.description as any,
                                    status: code as SnackbarStatus,
                                    text: msg.text,
                                    title: msg.title,
                                },
                                route,
                            );
                        }
                    });

                    return;
                }
                const rec = this.recordsStore.recordsState.records.find(
                    (record: IRecord) => String(record[this.recordsStore.recordId]) === code,
                );

                if (rec) {
                    const {[VAR_RECORD_CV_TEXT]: message = ""} = rec;
                    const messageType = rec[VAR_RECORD_CR_TYPE];
                    const text = (trans: TFunction) =>
                        typeof message === "string"
                            ? trans(message, {
                                  defaultValue: message,
                                  ns: "message",
                              })
                                  // eslint-disable-next-line require-unicode-regexp, prefer-named-capture-group
                                  .replace(/{(\d+)}/g, (match, pattern) =>
                                      values.length
                                          ? trans(values[pattern], {
                                                defaultValue: values[pattern],
                                                ns: "message",
                                            })
                                          : "",
                                  )
                            : "";

                    if (messageType === "error") {
                        isError = true;
                        fieldError.push(text);
                    } else {
                        this.snackbarOpenAction(
                            {
                                status: String(messageType) as SnackbarStatus,
                                text,
                            },
                            route,
                        );
                    }
                }
            });
            if (fieldError.length) {
                if (field) {
                    field.invalidate(fieldError);
                } else {
                    forEach(fieldError, (text) => {
                        this.snackbarOpenAction(
                            {
                                status: "debug",
                                text,
                                title: `Not Found Field (${fieldName})`,
                            },
                            route,
                        );
                    });
                }
            }
        });

        return isError;
    };

    @action
    snackbarChangeAction = (snackbarId: string, snackbar: Record<string, any>) => {
        const changedSnakebar = this.snackbars.findIndex((snakebar) => snakebar.id === snackbarId);
        const changedSnakebarAll = this.snackbarsAll.findIndex((snakebar) => snakebar.id === snackbarId);

        if (changedSnakebar > -1) {
            this.snackbars[changedSnakebar] = {
                ...this.snackbars[changedSnakebar],
                ...snackbar,
            };
        }
        if (changedSnakebarAll > -1) {
            this.snackbarsAll[changedSnakebarAll] = {
                ...this.snackbarsAll[changedSnakebarAll],
                ...snackbar,
            };
        }
    };

    @action
    checkValidLoginResponse = (response: Record<string, FieldValue>) => {
        if (isEmpty(response.session)) {
            this.snackbarOpenAction({status: "warning", text: String(response[VAR_RECORD_CV_RESULT])});

            return false;
        }

        return true;
    };

    @action
    checkExceptResponse = (error: Record<string, any>, route?: IRouteRecord, applicationStore?: IApplicationModel | null) => {
            if (error.message?.indexOf("aborted") > -1) {
                return;
            }
            const responseError = error.responseError || {};
            const errCode = responseError[VAR_ERROR_CODE] as keyof typeof CODE_GROUP_MAP;
            const groupCode = CODE_GROUP_MAP[errCode] as keyof typeof GROUP_ACTION_MAP;
            const functionName = `${get(GROUP_ACTION_MAP[groupCode], "TEST", "error")}Action`;
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            const callback = this[functionName];

            if (error.extrainfo) {
                this.snackbarOpenAction({
                    description: error.extrainfo,
                    hiddenTimeout: 0,
                    status: "debug",
                    text: (trans) => trans("static:515a199e09914e3287afd9c95938f3a7", {query: error.query}),
                    title: `Request ${error.requestId || ""}`,
                });
            }

            if (callback) {
                return callback({...responseError, query: error.query}, route, applicationStore);
            }

            return false;
        };

    @action
    errorResponseAction = (errorData: IErrorData, route?: IRouteRecord) => {
        this.snackbarOpenAction(
            {
                description: errorData?.[VAR_ERROR_TEXT] || errorData?.[VAR_ERROR_CODE] || errorData?.[VAR_ERROR_ID],
                status: "error",
                text: (trans) => trans("static:515a199e09914e3287afd9c95938f3a7", {query: errorData.query}),
            },
            route,
        );
    };

    @action
    errorDetailsAction = (errorData: IErrorData, route?: IRouteRecord) => {
        this.snackbarOpenAction(
            {
                code: errorData?.[VAR_ERROR_CODE] || errorData?.[VAR_ERROR_ID] || "",
                description: errorData?.[VAR_ERROR_TEXT] || "",
                status: "error",
                text: (trans) => trans("static:4fdb3577f24440ceb8c717adf68bac48"),
            },
            route,
        );
    };

    @action
    errorMaskAction = (errorData: IErrorData, route?: IRouteRecord) => {
        this.snackbarOpenAction(
            {
                description: errorData?.[VAR_ERROR_CODE] || errorData?.[VAR_ERROR_ID],
                status: "error",
                text: (trans) => trans("static:515a199e09914e3287afd9c95938f3a7"),
            },
            route,
        );
    };

    @action
    errorAction = (_error: Error, route?: IRouteRecord) => {
        this.snackbarOpenAction(
            {
                status: "error",
                text: (trans) => trans("static:2d209550310a4fae90389134a5b12353"),
            },
            route,
        );
    };

    @action
    errorRemoteAuthAction = (_error: Error, route?: IRouteRecord) => {
        this.snackbarOpenAction(
            {
                status: "error",
                text: (trans) => trans("static:23cd49d589b74476acaa0b347b207d00"),
            },
            route,
        );
    };

    @action
    accessDeniedAction = (_error: Error, route?: Record<string, FieldValue>, applicationStore?: IApplicationModel) => {
            this.snackbarOpenAction(
                {status: "error", text: (trans) => trans("static:1d5ca35298f346cab823812e2b57e15a")},
                route,
            );
            const recordId = route ? route[VAR_RECORD_ID] : undefined;

            if (applicationStore && typeof recordId === "string") {
                applicationStore.pagesStore.removePageAction(recordId);
            }
        };

    @action
    unauthorizedAction = (_error: Error, route?: Record<string, FieldValue>, applicationStore?: IApplicationModel) => {
        this.snackbarOpenAction(
            {status: "error", text: (trans) => trans("static:1d5ca35298f346cab823812e2b57e155")},
            route,
        );
        const recordId = route ? route[VAR_RECORD_ID] : undefined;

        if (applicationStore && typeof recordId === "string") {
            applicationStore.pagesStore.removePageAction(recordId);
        }
    };

    @action
    invalidSessionAction = (_error: Error, route?: IRouteRecord, applicationStore?: IApplicationModel) => {
            this.snackbarOpenAction(
                {status: "info", text: (trans) => trans("static:5bf781f61f9c44b8b23c76aec75e5d10")},
                route,
            );

            if (applicationStore) {
                applicationStore.logoutAction();
            }
        };

    @action
    loginFailedAction = (_error: Error, route?: IRouteRecord) => {
        this.snackbarOpenAction(
            {status: "error", text: (trans) => trans("static:b5a60b8ff5cd419ebe487a68215f4490")},
            route,
        );
    };

    @action
    errorMoveResponseAction = (errorData: IErrorData, route?: IRouteRecord, applicationStore?: IApplicationModel) => {
        if (errorData?.[VAR_ERROR_TEXT]) {
            applicationStore?.history.replace(applicationStore?.history.location.pathname, {
                backUrl: applicationStore?.history.location.pathname,
            });
            saveToLocalStore("errorMoveResponse", applicationStore?.history.location.pathname);
            window.location.href = errorData?.[VAR_ERROR_TEXT];
        }
    };

    @action
    reinitSessionAction = (errorData: IErrorData, route?: IRouteRecord, applicationStore?: IApplicationModel) => {
        if (applicationStore) {
            applicationStore.authStore.checkAuthAction(applicationStore.history, undefined, undefined, true);
        }
    };
}
