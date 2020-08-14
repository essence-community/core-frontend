// eslint-disable-next-line import/named
import {IObservableArray} from "mobx";
import {TFunction} from "i18next";
import {VAR_ERROR_TEXT, VAR_ERROR_ID, VAR_ERROR_CODE} from "../constants/variables";
import {IForm} from "../Form";
import {IRecordsModelLite} from "./RecordsModel";
import {IResponse, FieldValue, IProgressModel, IApplicationModel, IRouteRecord} from ".";

export type SnackbarStatus =
    | "all"
    | "warning"
    | "error"
    | "info"
    | "notification"
    | "debug"
    | "progress"
    | "block"
    | "unblock"
    | "uploaded"
    | "errorUpload";

export type TText = string | JSX.Element | ((trans: TFunction) => string | JSX.Element);
export interface ISnackbar {
    autoHidden: boolean;
    text: TText;
    status: SnackbarStatus;
    id: string;
    createdAt: string;
    hiddenTimeout: number;
    pageName: string;
    open: boolean;
    read: boolean;
    progressStore?: IProgressModel;
    type: "msg" | "progress";
    title?: TText;
    description?: string;
    code?: string;
}

export interface IErrorData {
    [VAR_ERROR_ID]: string;
    [VAR_ERROR_TEXT]: string;
    [VAR_ERROR_CODE]: string;
    query: string;
}

export interface IOptionCheck {
    applicationStore?: IApplicationModel | null;
    form?: IForm;
    route?: Record<string, FieldValue>;
    warnCallBack?: Function;
}

export interface ISnackbarModel {
    snackbars: IObservableArray<ISnackbar>;
    snackbarsAll: ISnackbar[];
    recordsStore: IRecordsModelLite;
    snackbarsCount: number;
    activeStatus: SnackbarStatus;
    snackbarsInStatus: ISnackbar[];
    snackbarsInStatusToReadCount: number;
    deleteAllSnackbarAction: () => void;
    readSnackbarAction: (snackbarId: string) => void;
    readActiveSnackbarsAction: () => void;
    setStatusAction: (status: SnackbarStatus) => void;
    deleteSnackbarAction: (snackbarId: string) => void;
    snackbarOpenAction: (snakebar: ISnackbar) => void;
    setClosebleAction: (snackbarId: string) => void;
    snackbarCloseAction: (snackbarId: ISnackbar["id"]) => void;
    snackbarChangeAction: (snackbarId: string, snackbar: Record<string, any>) => void;
    checkValidResponseAction: (response: IResponse, options: IOptionCheck) => number;
    checkValidLoginResponse: (response: Record<string, FieldValue>) => boolean;
    checkExceptResponse: (
        error: Record<string, any>,
        route?: IRouteRecord,
        applicationStore?: IApplicationModel,
    ) => boolean;
}
