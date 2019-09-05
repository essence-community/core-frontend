export interface IProgressModel {
    progressCount: number;
    changeProgress: (progressEvent: ProgressEvent) => void;
}
