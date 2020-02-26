// @flow
import {extendObservable, action} from "mobx";
import uuidv4 from "uuid/v4";
import {snackbarStore} from "@essence-community/constructor-share/models";
import type {PageModelType} from "../PageModel/PageModelType";

export type ProgressConfigType = {
    pageStore: PageModelType,
    filesNames?: Array<string>,
};

export interface ProgressModelType {
    progressCount: number;
    snackbarIdentifier: string;
    changeProgress: (progressEvent: ProgressEvent) => void;
    changeStatusProgress: (status: "errorUpload" | "uploaded" | "progress") => void;
}
const MAX_COUNT = 100;

export default class ProgressModel implements ProgressModelType {
    name: "ProgressModel";

    snackbarIdentifier: string;

    progressCount: number;

    snackbar: Object;

    constructor({pageStore, filesNames}: ProgressConfigType) {
        extendObservable(this, {
            progressCount: 0,
        });

        this.snackbarIdentifier = uuidv4();

        this.snackbar = {
            autoHidden: false,
            id: this.snackbarIdentifier,
            progressStore: this,
            status: "progress",
            type: "progress",
        };

        if (filesNames) {
            this.snackbar.title = filesNames.join(",");
        }

        snackbarStore.snackbarOpenAction(this.snackbar, pageStore.route);
    }

    changeProgress = action("changeProgress", (progressEvent: ProgressEvent) => {
        const totalLength = progressEvent.total;

        if (totalLength !== null) {
            this.progressCount = Math.round((progressEvent.loaded * MAX_COUNT) / totalLength);
        }
    });

    changeStatusProgress = action("changeStatusProgress", (status: "errorUpload" | "uploaded" | "progress") => {
        const data = {};

        if (status === "errorUpload") {
            data.text = "static:c80abfb5b59c400ca1f8f9e868e4c761";
        }
        if (status === "uploaded") {
            const {title} = this.snackbar;

            data.text = (trans) =>
                `${trans("static:179cc83540e94b87a8d8aff919552f22")} ${
                    typeof title === "function" ? title(trans) : trans(title)
                }`;
            data.title = "static:31b05bf92be1431894c448c4c3ef95bb";
        }
        snackbarStore.snackbarChangeAction(this.snackbarIdentifier, {
            ...data,
            status,
        });
    });
}
