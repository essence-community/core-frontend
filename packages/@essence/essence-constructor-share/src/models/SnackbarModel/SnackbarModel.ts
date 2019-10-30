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
} from "../../types";
import {RecordsModel} from "../RecordsModel";
import {isEmpty} from "../../utils";
import {VAR_RECORD_ROUTE_NAME, VAR_RECORD_RES_ERROR, VAR_RECORD_RES_STACK_TRACE, VAR_RECORD_ID} from "../../constants";
import {IRouteRecord} from "../../types/RoutesModel";
import {MAX_OPENED_SNACKBARS, CODE_ACCESS_DENIEND, GROUP_ACTION_MAP, CODE_GROUP_MAP} from "./SnackbarModel.contants";

/**
 * @class SnackbarModel
 *
 * Класс является signleton и может экспортироваться как snackbarStore.
 * Использование происходит на всех приложениях и служить для выпода нотификаций между приложения.
 * Для создания нотификации для прииложения можно создавать отдельные экзепляры класса.
 */
export class SnackbarModel implements ISnackbarModel {
    snackbars: IObservableArray<ISnackbar>;

    snackbarsAll: Array<ISnackbar>;

    recordsStore: RecordsModel;

    activeStatus: SnackbarStatus;

    snackbarsInStatus: Array<ISnackbar>;

    snackbarsCount: number;

    snackbarsInStatusToReadCount: number;

    constructor() {
        // eslint-disable-next-line @typescript-eslint/no-var-requires, global-require
        const mod = require("../RecordsModel/RecordsModel");
        const bc: IBuilderConfig = {
            ckPageObject: "Snackbar",
            ckParent: "root",
            ckQuery: "GetMsgList",
        };

        this.recordsStore = new mod.RecordsModel(bc);

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
                            snackbar.pageName === "Оповещение" || snackbar.status === this.activeStatus,
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
                (snackbar) => snackbar.pageName !== "Оповещение" && snackbar.status !== this.activeStatus,
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
    checkValidResponseAction = action("checkValidResponseAction", (
        // eslint-disable-next-line default-param-last
        response: IResponse = {},
        route?: Record<string, FieldValue>,
        warnCallBack?: Function,
        applicationStore?: IApplicationModel,
        // eslint-disable-next-line max-params
    ) => {
        const cvError = response[VAR_RECORD_RES_ERROR];
        let isError = false;
        let isWarn = false;
        let rec: boolean | IRecord | undefined = false;
        let warningText = "";

        if (isEmpty(cvError)) {
            return 1;
        }

        if (isObject(cvError)) {
            const cvStackTrace = response[VAR_RECORD_RES_STACK_TRACE];

            forEach(cvError, (values: string[], code) => {
                rec =
                    code === "block" || code === "unblock"
                        ? {
                              crType: code,
                              cvText: "{0}",
                          }
                        : this.recordsStore.recordsState.records.find(
                              (record: IRecord) => String(record.ckId) === code,
                          );

                if (code === CODE_ACCESS_DENIEND && applicationStore && route) {
                    const routeId = route[VAR_RECORD_ID];

                    if (typeof routeId === "string") {
                        applicationStore.pagesStore.removePageAction(routeId);
                    }
                }
                if (rec) {
                    const {cvText = ""} = rec;
                    const text =
                        typeof cvText === "string"
                            ? // eslint-disable-next-line require-unicode-regexp, prefer-named-capture-group
                              cvText.replace(/{(\d+)}/g, (match, pattern) => (values && values[pattern]) || "")
                            : "";

                    if (rec.crType === "error") {
                        isError = true;
                    }
                    if (warnCallBack && rec.crType === "warning") {
                        isWarn = true;
                        warningText = `${warningText}${text}\r\n`;
                    }

                    if ((rec.crType === "block" || rec.crType === "unblock") && applicationStore) {
                        applicationStore.blockApplicationAction(rec.crType, text);
                    }
                    this.snackbarOpenAction(
                        {
                            status: String(rec.crType) as SnackbarStatus,
                            text,
                        },
                        route,
                    );
                }
            });

            if (cvStackTrace) {
                this.snackbarOpenAction(
                    {
                        status: "debug",
                        text: cvStackTrace,
                    },
                    route,
                );
            }
        }
        if (!isError && isWarn && warnCallBack) {
            warnCallBack(`${warningText.trim()}`);

            return 2;
        }

        return isError ? 0 : 1;
    });

    snackbarChangeStatusAction = action("snackbarChangeStatusAction", (snackbarId: string, status: SnackbarStatus) => {
        const changedSnakebar = this.snackbars.find((snakebar) => snakebar.id === snackbarId);
        const changedSnakebarAll = this.snackbarsAll.find((snakebar) => snakebar.id === snackbarId);

        if (changedSnakebar) {
            changedSnakebar.status = status;
        }

        if (changedSnakebarAll) {
            changedSnakebarAll.status = status;
        }
    });

    checkValidLoginResponse = action("checkValidLoginResponse", (response: Record<string, FieldValue>) => {
        if (isEmpty(response.session)) {
            this.snackbarOpenAction({status: "warning", text: String(response.cvResult)});

            return false;
        }

        return true;
    });

    checkExceptResponse = action(
        "checkExceptResponse",
        (error: Record<string, any>, route?: IRouteRecord, applicationStore?: IApplicationModel) => {
            const responseError = error.responseError || {};
            const errCode = responseError.errCode as keyof typeof CODE_GROUP_MAP;
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
                status: "error",
                text: errorData && errorData.errText ? errorData.errText : "",
                title: `Ошибка обращения к сервису ${errorData.query}`,
            },
            route,
        );
    });

    errorDetailsAction = action("errorDetailsAction", (errorData: IErrorData, route?: IRouteRecord) => {
        this.snackbarOpenAction(
            {
                code: errorData.errCode || errorData.errId,
                description: errorData.errText,
                status: "error",
                title: `Сервис временно недоступен - ${errorData.query}. Попробуйте выполнить операцию позднее.`,
            },
            route,
        );
    });

    errorMaskAction = action("errorMaskAction", ({errId, query}: IErrorData, route?: IRouteRecord) => {
        this.snackbarOpenAction(
            {
                description: errId,
                status: "error",
                title: `Ошибка обращения к сервису ${query}.`,
            },
            route,
        );
    });

    errorAction = action("errorAction", (_error: Error, route?: IRouteRecord) => {
        this.snackbarOpenAction(
            {
                status: "error",
                text: "Не получилось распознать ошибку. Возможно, возникла проблема с сетевым подключением",
            },
            route,
        );
    });

    errorRemoteAuthAction = action("errorRemoteAuthAction", (_error: Error, route?: IRouteRecord) => {
        this.snackbarOpenAction(
            {
                status: "error",
                text: "Сервер авторизации временно недоступен",
            },
            route,
        );
    });

    accessDeniedAction = action(
        "accessDeniedAction",
        (_error: Error, route?: Record<string, FieldValue>, applicationStore?: IApplicationModel) => {
            this.snackbarOpenAction({status: "error", title: "Не удалось получить доступ к сервису"}, route);
            const recordId = route ? route[VAR_RECORD_ID] : undefined;

            if (applicationStore && typeof recordId === "string") {
                applicationStore.pagesStore.removePageAction(recordId);
            }
        },
    );

    invalidSessionAction = action(
        "invalidSessionAction",
        (_error: Error, route?: IRouteRecord, applicationStore?: IApplicationModel) => {
            this.snackbarOpenAction({status: "error", title: "Сессия недействительна"}, route);

            if (applicationStore) {
                applicationStore.logoutAction();
            }
        },
    );

    loginFailedAction = action("loginFailedAction", (_error: Error, route?: IRouteRecord) => {
        this.snackbarOpenAction({status: "error", title: "Неверные имя пользователя или пароль"}, route);
    });
}
