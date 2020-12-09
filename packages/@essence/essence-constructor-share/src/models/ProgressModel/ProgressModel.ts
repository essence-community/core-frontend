import {action, extendObservable} from "mobx";
import {IPageModel, ISnackbar, IProgressModel} from "../../types";
import {snackbarStore} from "../SnackbarModel";
import {toTranslateText} from "../../utils";

export interface IProgressConfig {
    pageStore: IPageModel;
}

const MAX_COUNT = 100;

export class ProgressModel implements IProgressModel {
    public name: "ProgressModel";

    public progressCount: number;

    private snackbar: ISnackbar;

    constructor({pageStore}: IProgressConfig) {
        extendObservable(this, {
            progressCount: 0,
        });

        this.snackbar = snackbarStore.snackbarOpenAction(
            {
                autoHidden: false,
                progressStore: this,
                status: "progress",
                type: "progress",
            },
            pageStore.route,
        );
    }

    @action
    changeProgress = (progressEvent: ProgressEvent) => {
        const totalLength = progressEvent.total;

        if (totalLength !== null) {
            this.progressCount = Math.round((progressEvent.loaded * MAX_COUNT) / totalLength);
        }
    };

    @action
    changeStatusProgress = (status: "errorUpload" | "uploaded" | "progress") => {
        const data: Partial<ISnackbar> = {};

        if (status === "errorUpload") {
            snackbarStore.snackbarCloseAction(this.snackbar.id);
            snackbarStore.deleteSnackbarAction(this.snackbar.id);

            return;
        }
        if (status === "uploaded") {
            const {title = ""} = this.snackbar;

            data.text = (trans) =>
                `${trans("static:179cc83540e94b87a8d8aff919552f22")} ${toTranslateText(trans, title)}`;
            data.title = "static:31b05bf92be1431894c448c4c3ef95bb";
        }
        snackbarStore.snackbarChangeAction(this.snackbar.id, {
            ...data,
            status,
        });
    };
}
