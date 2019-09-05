// @flow
import {IApplicationModel} from "./Application";
import {IProgressModel} from "./ProgressModel";
import {IRecordsModel} from "./RecordsModel";

export type StatusType = "warning" | "error" | "info" | "notification" | "debug" | "progress" | "block" | "unblock";

export interface ISnackbar {
    autoHidden: boolean;
    text: string;
    status: StatusType;
    id: string;
    createdAt: string;
    hiddenTimeout: number;
    pageName: string;
    open: boolean;
    read: boolean;
    progressStore?: IProgressModel;
    type: "msg" | "progress";
}

export interface ISnackbarModel {
    snackbars: ISnackbar[];
    snackbarsAll: ISnackbar[];
    recordsStore: IRecordsModel;
    applicationStore: IApplicationModel;
    snackbarsCount: number;
    snackbarsInStatus: ISnackbar[];
    snackbarsInStatusToReadCount: number;
    deleteAllSnackbarAction: () => void;
    readSnackbarAction: (snackbarId: string) => void;
    readActiveSnackbarsAction: () => void;
    setStatusAction: (status: StatusType) => void;
    deleteSnackbarAction: (snackbarId: string) => void;
    snackbarOpenAction: (snakebar: ISnackbar) => void;
    setClosebleAction: (snackbarId: string) => void;
    snackbarCloseAction: (snackbarId: string) => void;
    checkValidResponseAction: (response: any, activePage: {[key: string]: any}, warnCallBack?: () => void) => number;
    checkValidLoginResponse: (response: {[key: string]: any}) => boolean;
    checkExceptResponse: (error: {[key: string]: any}, activePage: {[key: string]: any}) => boolean;
}
