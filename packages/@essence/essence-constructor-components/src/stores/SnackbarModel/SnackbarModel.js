/* eslint max-lines: ["error", 500]*/
// @flow
import {extendObservable, action} from "mobx";
import moment from "moment";
import uuidv4 from "uuid/v4";
import isEmpty from "lodash/isEmpty";
import isObject from "lodash/isObject";
import forEach from "lodash/forEach";
import get from "lodash/get";
import last from "lodash/last";
import {RecordsModel, type RecordsModelType} from "../RecordsModel";
import {type ApplicationModelType} from "../StoreTypes";
import {type SnackbarModelType, type SnackbarType, type PropsType, type StatusType} from "./SnackbarModelType";

/* eslint-disable quote-props */
const codeGroupMap = {
    "-1": "1*",
    "102": "1*",
    "103": 1,
    "104": 2,
    "105": 1,
    "107": 1,
    "108": 1,
    "201": 3,
    "202": 2,
    "203": 4,
    "204": 2,
    "205": 2,
    "207": 5,
    "208": 7,
    "300": 6,
    "301": "1*",
};

const groupActionMap = {
    "1": {
        DEV: "errorResponse",
        PROD: "errorMask",
        TEST: "errorDetails",
    },
    "1*": {
        DEV: "errorResponse",
        PROD: "errorMask",
        TEST: "errorDetails",
    },
    "2": {
        DEV: "errorResponse",
        PROD: "errorMask",
        TEST: "errorMask",
    },
    "3": {
        DEV: "invalidSession",
        PROD: "invalidSession",
        TEST: "invalidSession",
    },
    "4": {
        DEV: "loginFailed",
        PROD: "loginFailed",
        TEST: "loginFailed",
    },
    "5": {
        DEV: "errorResponse",
        PROD: "errorMask",
        TEST: "errorDetails",
    },
    "6": {
        DEV: "errorResponse",
        PROD: "errorMask",
        TEST: "errorMask",
    },
    "7": {
        DEV: "errorResponse",
        PROD: "errorRemoteAuth",
        TEST: "errorRemoteAuth",
    },
};
/* eslint-enable quote-props */

const CREATE_AT_FORMAT = "DD.MM.YYYY, HH:mm";
const MAX_OPENED_SNACKBARS = 5;
const CODE_ACCESS_DENIEND = "513";

export class SnackbarModel implements SnackbarModelType {
    snackbars: Array<SnackbarType>;

    snackbarsAll: Array<SnackbarType>;

    recordsStore: RecordsModelType;

    applicationStore: ApplicationModelType;

    activeStatus: StatusType;

    snackbarsInStatus: Array<SnackbarType>;

    snackbarsCount: number;

    snackbarsInStatusToReadCount: number;

    constructor({applicationStore, pageStore}: PropsType) {
        const bc = {
            ckQuery: "GetMsgList",
        };

        extendObservable(this, {
            activeStatus: "all",
            snackbars: [],
            snackbarsAll: [],
            get snackbarsCount() {
                return this.snackbarsAll.filter((snackbar) => snackbar.status !== "debug" && snackbar.read === false)
                    .length;
            },
            get snackbarsInStatus() {
                if (this.activeStatus === "all") {
                    return this.snackbarsAll.filter((snackbar) => snackbar.status !== "debug");
                } else if (this.activeStatus === "notification") {
                    return this.snackbarsAll.filter(
                        (snackbar) => snackbar.pageName === "Оповещение" || snackbar.status === this.activeStatus,
                    );
                }

                return this.snackbarsAll.filter((snackbar) => snackbar.status === this.activeStatus);
            },
            get snackbarsInStatusToReadCount() {
                return this.snackbarsInStatus.filter((snackbar) => snackbar.read === false).length;
            },
        });

        this.applicationStore = applicationStore;
        this.recordsStore = new RecordsModel(bc, pageStore);
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

    setStatusAction = action("setStatusAction", (status: StatusType) => {
        this.activeStatus = status;
    });

    snackbarOpenAction = action("snackbarOpenAction", (snackbar, activePage = {}) => {
        const {id, ...snackbarData} = snackbar;
        const snackbarProps = {
            autoHidden: true,
            createdAt: moment().format(CREATE_AT_FORMAT),
            hiddenTimeout: 5000,
            id: id || uuidv4(),
            open: true,
            pageName: activePage.cvName,
            read: false,
            type: "msg",
            ...snackbarData,
        };

        if (snackbar.hiddenTimeout !== 0) {
            const openedSnackbars = this.snackbars.filter((snack) => snack.open !== false);

            if (openedSnackbars.length >= MAX_OPENED_SNACKBARS) {
                last(openedSnackbars).open = false;
            }

            this.snackbars.unshift(snackbarProps);
        }

        this.snackbarsAll.unshift(snackbarProps);
    });

    setClosebleAction = action("setClosebleAction", (snackbarId: string) => {
        const closableSnackbar = this.snackbars.find((snakebar) => snakebar.id === snackbarId);

        // $FlowFixMe
        closableSnackbar.open = false;
    });

    snackbarCloseAction = action("snackbarCloseAction", (snackbarId: string) => {
        const removedSnackbar = this.snackbars.find((snakebar) => snakebar.id === snackbarId);

        // $FlowFixMe
        this.snackbars.remove(removedSnackbar);
    });

    // eslint-disable-next-line max-statements
    checkValidResponseAction = action("checkValidResponseAction", (response: any = {}, activePage, warnCallBack) => {
        const {cvError} = response;
        let isError = false;
        let isWarn = false;
        let rec = false;
        let warningText = "";

        if (isEmpty(cvError)) {
            return 1;
        }
        if (isObject(cvError)) {
            const {cvStackTrace} = response;

            // eslint-disable-next-line max-statements, guard-for-in
            forEach(cvError, (values = [], code) => {
                rec =
                    code === "block" || code === "unblock"
                        ? {
                              crType: code,
                              cvText: "{0}",
                          }
                        : this.recordsStore.records.find((record) => String(record.ckId) === code);

                if (code === CODE_ACCESS_DENIEND) {
                    this.applicationStore.pagesStore.removePageAction(activePage.ckId);
                }
                if (rec) {
                    const {cvText = ""} = rec;
                    const text = cvText.replace(/{(\d+)}/g, (match, pattern) => values[pattern] || "");

                    if (rec.crType === "error") {
                        isError = true;
                    }
                    if (warnCallBack && rec.crType === "warning") {
                        isWarn = true;
                        warningText = `${warningText}${text}\r\n`;
                    }

                    if (rec.crType === "block" || rec.crType === "unblock") {
                        this.applicationStore.blockApplicationAction(rec.crType, text);
                    }
                    this.snackbarOpenAction(
                        {
                            status: rec.crType,
                            text,
                        },
                        activePage,
                    );
                }
            });

            if (cvStackTrace) {
                this.snackbarOpenAction(
                    {
                        status: "debug",
                        text: cvStackTrace,
                    },
                    activePage,
                );
            }
        }
        if (!isError && isWarn) {
            warnCallBack(`${warningText.trim()}`);

            return 2;
        }

        return isError ? 0 : 1;
    });

    snackbarChangeStatusAction = action("snackbarChangeStatusAction", (snackbarId: string, status: StatusType) => {
        const changedSnakebar = this.snackbars.find((snakebar) => snakebar.id === snackbarId);
        const changedSnakebarAll = this.snackbarsAll.find((snakebar) => snakebar.id === snackbarId);

        if (changedSnakebar) {
            changedSnakebar.status = status;
        }

        if (changedSnakebarAll) {
            changedSnakebarAll.status = status;
        }
    });

    checkValidLoginResponse = action("checkValidLoginResponse", (response: Object) => {
        if (isEmpty(response.session)) {
            this.snackbarOpenAction({status: "warning", text: response.cvResult});

            return false;
        }

        return true;
    });

    checkExceptResponse = action("checkExceptResponse", (error: Object, activePage) => {
        const responseError = error.responseError || {};
        const functionName = get(groupActionMap[codeGroupMap[responseError.errCode]], "TEST", "error");
        // $FlowFixMe
        const callback = this[`${functionName}Action`];

        if (callback) {
            return callback({...responseError, query: error.query}, activePage);
        }

        return false;
    });

    errorResponseAction = action("errorResponseAction", (errorData, activePage) => {
        this.snackbarOpenAction(
            {
                status: "error",
                text: get(errorData, "errText", errorData),
                title: `Ошибка обращения к сервису ${errorData.query}`,
            },
            activePage,
        );
    });

    errorDetailsAction = action("errorDetailsAction", (errorData, activePage) => {
        this.snackbarOpenAction(
            {
                code: errorData.errCode || errorData.errId,
                description: errorData.errText,
                status: "error",
                title: `Сервис временно недоступен - ${errorData.query}. Попробуйте выполнить операцию позднее.`,
            },
            activePage,
        );
    });

    errorMaskAction = action("errorMaskAction", ({errId, query}, activePage) => {
        this.snackbarOpenAction(
            {
                description: errId,
                status: "error",
                title: `Ошибка обращения к сервису ${query}.`,
            },
            activePage,
        );
    });

    errorAction = action("errorAction", (error, activePage) => {
        this.snackbarOpenAction(
            {
                status: "error",
                text: "Не получилось распознать ошибку. Возможно, возникла проблема с сетевым подключением",
            },
            activePage,
        );
    });

    errorRemoteAuthAction = action("errorRemoteAuthAction", (error, activePage) => {
        this.snackbarOpenAction(
            {
                status: "error",
                text: "Сервер авторизации временно недоступен",
            },
            activePage,
        );
    });

    accessDeniedAction = action("accessDeniedAction", (error, activePage) => {
        this.snackbarOpenAction({status: "error", title: "Не удалось получить доступ к сервису"}, activePage);
        if (activePage) {
            this.applicationStore.pagesStore.removePageAction(activePage.ckId);
        }
    });

    invalidSessionAction = action("invalidSessionAction", (error, activePage) => {
        this.snackbarOpenAction({status: "error", title: "Сессия недействительна"}, activePage);
        this.applicationStore.logoutAction();
    });

    loginFailedAction = action("loginFailedAction", (error, activePage) => {
        this.snackbarOpenAction({status: "error", title: "Неверные имя пользователя или пароль"}, activePage);
    });
}
