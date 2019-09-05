// @flow
import {type PageModelType} from "../PageModel";
import {type ApplicationModelType} from "../StoreTypes";
import {type RecordsModelType} from "../RecordsModel";
import type {ProgressModelType} from "../ProgressModel/ProgressModel";

export type StatusType =
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

export type SnackbarType = {|
    autoHidden: boolean,
    text: string,
    status: StatusType,
    id: string,
    createdAt: string,
    hiddenTimeout: number,
    pageName: string,
    open: boolean,
    read: boolean,
    progressStore?: ProgressModelType,
    type: "msg" | "progress",
    title?: string,
|};

export type PropsType = {
    applicationStore: ApplicationModelType,
    pageStore: PageModelType,
};

export interface SnackbarModelType {
    +snackbars: Array<SnackbarType>;
    +snackbarsAll: Array<SnackbarType>;
    +recordsStore: RecordsModelType;
    +applicationStore: ApplicationModelType;
    snackbarsCount: number;
    snackbarsInStatus: Array<SnackbarType>;
    snackbarsInStatusToReadCount: number;
    constructor(props: PropsType): void;
    +deleteAllSnackbarAction: () => void;
    +readSnackbarAction: (snackbarId: string) => void;
    +readActiveSnackbarsAction: () => void;
    +setStatusAction: (status: StatusType) => void;
    +deleteSnackbarAction: (snackbarId: string) => void;
    +snackbarOpenAction: (snakebar: SnackbarType) => void;
    +setClosebleAction: (snackbarId: string) => void;
    +snackbarCloseAction: (snackbarId: string) => void;
    +checkValidResponseAction: (response: any, activePage: Object, warnCallBack?: Function) => number;
    +checkValidLoginResponse: (response: Object) => boolean;
    +checkExceptResponse: (error: Object, activePage: Object) => boolean;
    +snackbarChangeStatusAction: (snackbarId: string, status: StatusType) => void;
}
