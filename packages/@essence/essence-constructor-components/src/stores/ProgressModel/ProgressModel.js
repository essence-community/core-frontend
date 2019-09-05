// @flow
import {extendObservable, action} from "mobx";
import uuidv4 from "uuid/v4";
import type {PageModelType} from "../PageModel/PageModelType";

export type ProgressConfigType = {
    pageStore: PageModelType,
    filesNames?: Array<string>,
};

export interface ProgressModelType {
    progressCount: number;
    snackbarIdentifier: string;
    changeProgress: (progressEvent: ProgressEvent) => void;
}
const MAX_COUNT = 100;

export default class ProgressModel implements ProgressModelType {
    name: "ProgressModel";

    snackbarIdentifier: string;

    progressCount: number;

    constructor({pageStore, filesNames}: ProgressConfigType) {
        extendObservable(this, {
            progressCount: 0,
        });

        this.snackbarIdentifier = uuidv4();

        const snackbar: Object = {
            autoHidden: false,
            id: this.snackbarIdentifier,
            progressStore: this,
            status: "progress",
            type: "progress",
        };

        if (filesNames) {
            snackbar.title = filesNames.join(",");
        }

        pageStore.applicationStore.snackbarStore.snackbarOpenAction(snackbar, pageStore.route);
    }

    changeProgress = action("changeProgress", (progressEvent: ProgressEvent) => {
        const totalLength = progressEvent.total;

        if (totalLength !== null) {
            this.progressCount = Math.round((progressEvent.loaded * MAX_COUNT) / totalLength);
        }
    });
}
