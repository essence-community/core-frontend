import {AxiosProgressEvent} from "axios";

export interface IProgressModel {
    progressCount: number;
    isFinished: boolean;
    changeProgress: (progressEvent: AxiosProgressEvent) => void;
    changeStatusProgress: (status: "errorUpload" | "uploaded" | "progress") => void;
}
