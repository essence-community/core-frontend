import {i18next} from "../../utils/I18n";
import {VAR_RECORD_NAME, VAR_RECORD_CL_AVAILABLE, VAR_RECORD_CCT_CONFIG, VAR_RECORD_ID} from "../../constants";
import {request} from "../../request";
import {snackbarStore} from "../SnackbarModel";
import {loadFiles} from "../../utils/browser";
import {IRecord} from "../../types/Base";
import {reloadSystemComponents} from "../../components";

interface IView {
    loadingPromise: null | Promise<any>;
    isReady: false;
    load: () => Promise<boolean>;
}

const views: {
    [key: string]: IView;
} = {};

export class ViewModel {
    isLoaded = false;

    loadView = async (view: string, viewUrl: string) => {
        if (views[view]) {
            return views[view].isReady ? true : views[view].loadingPromise;
        }

        return request({
            json: {
                filter: {
                    [VAR_RECORD_CL_AVAILABLE]: 1,
                    [VAR_RECORD_ID]: view,
                },
            },
            list: true,
            query: "MTViewOnlyConfig",
        })
            .then((res) => {
                const [{[VAR_RECORD_CCT_CONFIG]: viewConfig}] = res as IRecord[];
                const files = (
                    (typeof viewConfig === "string" ? JSON.parse(viewConfig) : viewConfig || {}).files || []
                ).map((fileName: string) => `${viewUrl}/${fileName}`);

                const viewEssence: IView = {
                    isReady: false,
                    load: () => {
                        if (!viewEssence.loadingPromise) {
                            reloadSystemComponents();
                            viewEssence.loadingPromise = loadFiles(files);
                        }

                        return viewEssence.loadingPromise;
                    },
                    loadingPromise: null,
                };

                views[view] = viewEssence;

                return viewEssence.load();
            })
            .catch((error) => {
                snackbarStore.snackbarOpenAction({
                    status: "error",
                    text: i18next.t("static:fd7c7f3539954cc8a55878e6514906b5"),
                });
                snackbarStore.snackbarOpenAction(
                    {
                        status: "debug",
                        text: error.message,
                    },
                    {[VAR_RECORD_NAME]: i18next.t("static:fd7c7f3539954ff8a55878e6514906f5")},
                );
            })
            .then(() => {
                this.isLoaded = true;
            });
    };
}
