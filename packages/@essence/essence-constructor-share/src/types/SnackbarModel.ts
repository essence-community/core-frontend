// eslint-disable-next-line import/named
import {IObservableArray} from "mobx";
import {IResponse, FieldValue, IRecordsModel, IProgressModel, IApplicationModel, IRouteRecord} from ".";

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

export interface ISnackbar {
    autoHidden: boolean;
    text: string | Element;
    status: SnackbarStatus;
    id: string;
    createdAt: string;
    hiddenTimeout: number;
    pageName: string;
    open: boolean;
    read: boolean;
    progressStore?: IProgressModel;
    type: "msg" | "progress";
    title?: string;
    description?: string;
    code?: string;
}

export interface IErrorData {
    errText: string;
    errCode: string;
    query: string;
    errId: string;
}

export interface ISnackbarModel {
    snackbars: IObservableArray<ISnackbar>;
    snackbarsAll: ISnackbar[];
    recordsStore: IRecordsModel;
    snackbarsCount: number;
    snackbarsInStatus: ISnackbar[];
    snackbarsInStatusToReadCount: number;
    deleteAllSnackbarAction: () => void;
    readSnackbarAction: (snackbarId: string) => void;
    readActiveSnackbarsAction: () => void;
    setStatusAction: (status: SnackbarStatus) => void;
    deleteSnackbarAction: (snackbarId: string) => void;
    snackbarOpenAction: (snakebar: ISnackbar) => void;
    setClosebleAction: (snackbarId: string) => void;
    snackbarCloseAction: (snackbarId: string) => void;
    checkValidResponseAction: (
        response: IResponse,
        route?: Record<string, FieldValue>,
        warnCallBack?: Function,
        applicationStore?: IApplicationModel,
    ) => number;
    checkValidLoginResponse: (response: Record<string, FieldValue>) => boolean;
    checkExceptResponse: (
        error: Record<string, any>,
        route?: IRouteRecord,
        applicationStore?: IApplicationModel,
    ) => boolean;
}
