import {action, extendObservable} from "mobx";
import {IPageModel} from "../../types";
import {snackbarStore} from "../SnackbarModel";

export interface IProgressConfig {
    pageStore: IPageModel;
}

export interface IProgressModel {
    progressCount: number;
    changeProgress: (progressEvent: ProgressEvent) => void;
}
const MAX_COUNT = 100;

export class ProgressModel implements IProgressModel {
    public name: "ProgressModel";

    public progressCount: number;

    public changeProgress = action("changeProgress", (progressEvent: ProgressEvent) => {
        const totalLength = progressEvent.total;

        if (totalLength !== null) {
            this.progressCount = Math.round((progressEvent.loaded * MAX_COUNT) / totalLength);
        }
    });

    constructor({pageStore}: IProgressConfig) {
        extendObservable(this, {
            progressCount: 0,
        });

        snackbarStore.snackbarOpenAction(
            {
                autoHidden: false,
                progressStore: this,
                status: "progress",
                type: "progress",
            },
            pageStore.route,
        );
    }
}
