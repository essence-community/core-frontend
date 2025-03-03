import { AxiosProgressEvent } from "axios";

export interface IProgressModel {
    progressCount: number;
    changeProgress: (progressEvent: AxiosProgressEvent) => void;
    changeStatusProgress: (status: "errorUpload" | "uploaded" | "progress") => void;
}
