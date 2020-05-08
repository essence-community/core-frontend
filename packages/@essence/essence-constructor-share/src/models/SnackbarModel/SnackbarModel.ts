/* eslint-disable max-lines */
// eslint-disable-next-line import/named
import {extendObservable, action, IObservableArray} from "mobx";
import uuidv4 from "uuid/v4";
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
    IRecordsModel,
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
} from "../../constants";
import {IRouteRecord} from "../../types/RoutesModel";
import {TText, IOptionCheck} from "../../types/SnackbarModel";
import {IForm} from "../../Form";
import {MAX_OPENED_SNACKBARS, CODE_ACCESS_DENIEND, GROUP_ACTION_MAP, CODE_GROUP_MAP} from "./SnackbarModel.contants";

/**
 * @class SnackbarModel
 *
 * Класс является signleton и может экспортироваться как snackbarStore.
 * Использование происходит на всех приложениях и служить для вывода нотификаций между приложениями.
 * Для создания нотификации для отдельного приложения можно создавать отдельные экзепляры класса.
 */
export class SnackbarModel implements ISnackbarModel {
    snackbars: IObservableArray<ISnackbar>;

    snackbarsAll: Array<ISnackbar>;

    recordsStore: IRecordsModel;

    activeStatus: SnackbarStatus;

    snackbarsInStatus: Array<ISnackbar>;

    snackbarsCount: number;

    snackbarsInStatusToReadCount: number;

    constructor() {
        // eslint-disable-next-line @typescript-eslint/no-var-requires, global-require
        const {RecordsModel} = require("../RecordsModel");
        const bc: IBuilderConfig = {
            [VAR_RECORD_PAGE_OBJECT_ID]: "Snackbar",
            [VAR_RECORD_PARENT_ID]: "root",
            [VAR_RECORD_QUERY_ID]: "GetMsgList",
        };

        this.recordsStore = new RecordsModel(bc);

        extendObservable(this, {
            activeStatus: "all",
            snackbars: [],
            snackbarsAll: [],
            get snackbarsCount() {
                return this.snackbarsAll.filter(
                    (snackbar: ISnackbar) => snackbar.status !== "debug" && snackbar.read === false,
                ).length;
            },
            get snackbarsInStatus() {
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
            },
            get snackbarsInStatusToReadCount() {
                return this.snackbarsInStatus.filter((snackbar: ISnackbar) => snackbar.read === false).length;
            },
        });
    }

    deleteAllSnackbarAction = action("deleteAllSnackbarAction", () => {
        if (this.activeStatus === "all") {
            this.snackbarsAll = this.snackbarsAll.filter((snackbar) => snackbar.status === "debug");
        } else if (this.activeStatus === "notification") {
            this.snackbarsAll = this.snackbarsAll.filter(
                (snackbar) =>
                    snackbar.pageName !== i18next.t("static:2ff612aa52314ddea65a5d303c867eb8") &&
                    snackbar.status !== this.activeStatus,
            );
        } else {
            this.snackbarsAll = this.snackbarsAll.filter((snackbar) => snackbar.status !== this.activeStatus);
        }
    });

    deleteSnackbarAction = action("deleteSnackbarAction", (snackbarId: string) => {
        this.snackbarsAll = this.snackbarsAll.filter((snakebar) => snakebar.id !== snackbarId);
    });

    readSnackbarAction = action("readSnackbarAction", (snackbarId: string) => {
        const snackbar = this.snackbarsAll.find((snack) => snack.id === snackbarId);

        if (snackbar) {
            snackbar.read = true;
        }
    });

    readActiveSnackbarsAction = action("readActiveSnackbarsAction", () => {
        this.snackbarsInStatus.forEach((snackbar) => {
            if (snackbar.read === false) {
                snackbar.read = true;
            }
        });
    });

    setStatusAction = action("setStatusAction", (status: SnackbarStatus) => {
        this.activeStatus = status;
    });

    snackbarOpenAction = action("snackbarOpenAction", (snackbar: Partial<ISnackbar>, route?: IRouteRecord) => {
        const routeName = route && route[VAR_RECORD_ROUTE_NAME];
        const {id, ...snackbarData} = snackbar;
        const date = new Date();
        const snackbarProps: ISnackbar = {
            autoHidden: true,
            // TODO: should be format "DD.MM.YYYY, HH:mm";
            createdAt: date.toLocaleString(),
            hiddenTimeout: 5000,
            id: id || uuidv4(),
            open: true,
            pageName: typeof routeName === "string" ? routeName : "",
            read: false,
            status: "all",
            text: "",
            type: "msg",
            ...snackbarData,
        };

        if (snackbar.hiddenTimeout !== 0) {
            const openedSnackbars = this.snackbars.filter((snack) => snack.open !== false);

            if (openedSnackbars.length >= MAX_OPENED_SNACKBARS) {
                openedSnackbars[openedSnackbars.length - 1].open = false;
            }

            this.snackbars.unshift(snackbarProps);
        }

        this.snackbarsAll.unshift(snackbarProps);
    });

    setClosebleAction = action("setClosebleAction", (snackbarId: string) => {
        const closableSnackbar = this.snackbars.find((snakebar) => snakebar.id === snackbarId);

        if (closableSnackbar) {
            closableSnackbar.open = false;
        }
    });

    snackbarCloseAction = action("snackbarCloseAction", (snackbarId: string) => {
        const removedSnackbar = this.snackbars.find((snakebar) => snakebar.id === snackbarId);

        if (removedSnackbar) {
            this.snackbars.remove(removedSnackbar);
        }
    });

    // eslint-disable-next-line max-statements
    checkValidResponseAction = action(
        "checkValidResponseAction",
        (
            // eslint-disable-next-line default-param-last
            response: IResponse = {},
            {applicationStore, form, route, warnCallBack} = {} as IOptionCheck,
        ) =>
            // eslint-disable-next-line max-params
            {
                const error = response[VAR_RECORD_RES_ERROR];
                const formError = response[VAR_RECORD_RES_FORM_ERROR];
                let isError = false;
                let isWarn = false;
                let rec: boolean | IRecord | undefined = false;
                const warningText: TText[] = [];

                if (isEmpty(error) && isEmpty(formError)) {
                    return 1;
                }
                if (isObject(formError)) {
                    isError = this.formError(formError, form, route);
                }
                if (isObject(error)) {
                    const stackTrace = response[VAR_RECORD_RES_STACK_TRACE];

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

                    if (stackTrace) {
                        this.snackbarOpenAction(
                            {
                                status: "debug",
                                text: stackTrace,
                            },
                            route,
                        );
                    }
                }
                if (!isError && isWarn && warnCallBack) {
                    warnCallBack(warningText);

                    return 2;
                }

                return isError ? 0 : 1;
            },
    );

    /**
     * Add error to field
     */
    formError = (
        formError: Record<string, Record<string, string[]>>,
        form?: IForm,
        route?: Record<string, FieldValue>,
    ): boolean => {
        let isError = false;

        // eslint-disable-next-line default-param-last
        forEach(formError, (errors: Record<string, string[]> = {}, fieldName: string) => {
            const field = form?.select(fieldName);
            const fieldError: any[] = [];

            // eslint-disable-next-line default-param-last
            forEach(errors, (values: string[] = [], code) => {
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

    snackbarChangeAction = action("snackbarChangeAction", (snackbarId: string, snackbar: Record<string, any>) => {
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
    });

    checkValidLoginResponse = action("checkValidLoginResponse", (response: Record<string, FieldValue>) => {
        if (isEmpty(response.session)) {
            this.snackbarOpenAction({status: "warning", text: String(response[VAR_RECORD_CV_RESULT])});

            return false;
        }

        return true;
    });

    checkExceptResponse = action(
        "checkExceptResponse",
        (error: Record<string, any>, route?: IRouteRecord, applicationStore?: IApplicationModel | null) => {
            const responseError = error.responseError || {};
            const errCode = responseError[VAR_ERROR_CODE] as keyof typeof CODE_GROUP_MAP;
            const groupCode = CODE_GROUP_MAP[errCode] as keyof typeof GROUP_ACTION_MAP;
            const functionName = `${get(GROUP_ACTION_MAP[groupCode], "TEST", "error")}Action`;
            // @ts-ignore
            const callback = this[functionName];

            if (callback) {
                return callback({...responseError, query: error.query}, route, applicationStore);
            }

            return false;
        },
    );

    errorResponseAction = action("errorResponseAction", (errorData: IErrorData, route?: IRouteRecord) => {
        this.snackbarOpenAction(
            {
                description: errorData?.[VAR_ERROR_TEXT] || errorData?.[VAR_ERROR_CODE] || errorData?.[VAR_ERROR_ID],
                status: "error",
                text: (trans) => trans("static:515a199e09914e3287afd9c95938f3a7", errorData.query),
            },
            route,
        );
    });

    errorDetailsAction = action("errorDetailsAction", (errorData: IErrorData, route?: IRouteRecord) => {
        this.snackbarOpenAction(
            {
                code: errorData?.[VAR_ERROR_CODE] || errorData?.[VAR_ERROR_ID] || "",
                description: errorData?.[VAR_ERROR_TEXT] || "",
                status: "error",
                text: (trans) => trans("static:4fdb3577f24440ceb8c717adf68bac48", errorData),
            },
            route,
        );
    });

    errorMaskAction = action("errorMaskAction", (errorData: IErrorData, route?: IRouteRecord) => {
        this.snackbarOpenAction(
            {
                description: errorData?.[VAR_ERROR_CODE] || errorData?.[VAR_ERROR_ID],
                status: "error",
                text: (trans) => trans("static:515a199e09914e3287afd9c95938f3a7", errorData),
            },
            route,
        );
    });

    errorAction = action("errorAction", (_error: Error, route?: IRouteRecord) => {
        this.snackbarOpenAction(
            {
                status: "error",
                text: (trans) => trans("static:2d209550310a4fae90389134a5b12353"),
            },
            route,
        );
    });

    errorRemoteAuthAction = action("errorRemoteAuthAction", (_error: Error, route?: IRouteRecord) => {
        this.snackbarOpenAction(
            {
                status: "error",
                text: (trans) => trans("static:23cd49d589b74476acaa0b347b207d00"),
            },
            route,
        );
    });

    accessDeniedAction = action(
        "accessDeniedAction",
        (_error: Error, route?: Record<string, FieldValue>, applicationStore?: IApplicationModel) => {
            this.snackbarOpenAction(
                {status: "error", text: (trans) => trans("static:1d5ca35298f346cab823812e2b57e15a")},
                route,
            );
            const recordId = route ? route[VAR_RECORD_ID] : undefined;

            if (applicationStore && typeof recordId === "string") {
                applicationStore.pagesStore.removePageAction(recordId);
            }
        },
    );

    invalidSessionAction = action(
        "invalidSessionAction",
        (_error: Error, route?: IRouteRecord, applicationStore?: IApplicationModel) => {
            this.snackbarOpenAction(
                {status: "error", text: (trans) => trans("static:5bf781f61f9c44b8b23c76aec75e5d10")},
                route,
            );

            if (applicationStore) {
                applicationStore.logoutAction();
            }
        },
    );

    loginFailedAction = action("loginFailedAction", (_error: Error, route?: IRouteRecord) => {
        this.snackbarOpenAction(
            {status: "error", text: (trans) => trans("static:b5a60b8ff5cd419ebe487a68215f4490")},
            route,
        );
    });
}
