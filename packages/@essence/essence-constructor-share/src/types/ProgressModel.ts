export interface IProgressModel {
    progressCount: number;
    changeProgress: (progressEvent: ProgressEvent) => void;
    changeStatusProgress: (status: "errorUpload" | "uploaded" | "progress") => void;
}
