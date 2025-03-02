import {action, makeObservable, observable} from "mobx";
import {IPageModel, ISnackbar, IProgressModel} from "../../types";
import {snackbarStore} from "../SnackbarModel";
import {toTranslateText} from "../../utils";
import { AxiosProgressEvent } from "axios";

export interface IProgressConfig {
    pageStore: IPageModel;
}

const MAX_COUNT = 100;

export class ProgressModel implements IProgressModel {
    public name: "ProgressModel";

    @observable
    public progressCount = 0;

    private snackbar: ISnackbar;

    constructor({pageStore}: IProgressConfig) {
        this.snackbar = snackbarStore.snackbarOpenAction(
            {
                autoHidden: false,
                progressStore: this,
                status: "progress",
                type: "progress",
            },
            pageStore.route,
        );
        makeObservable(this);
    }

    @action
    changeProgress = (progressEvent: AxiosProgressEvent) => {
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
            data.autoHidden = true;
        }
        snackbarStore.snackbarChangeAction(this.snackbar.id, {
            ...data,
            status,
        });
    };
}
