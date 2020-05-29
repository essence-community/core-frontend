import {i18next} from "../../utils/I18n";
import {settingsStore} from "../SettingsModel";
import {
    VAR_SETTING_BRANCH_NAME,
    VAR_RECORD_NAME,
    VAR_RECORD_CL_AVAILABLE,
    VAR_RECORD_CV_VERSION_API,
    VAR_RECORD_CV_VERSION,
    VAR_RECORD_CC_CONFIG,
    VAR_RECORD_CC_MANIFEST,
} from "../../constants";
import {request} from "../../request";
import {setModule} from "../../components";
import {snackbarStore} from "../SnackbarModel";
import {loadFiles} from "../../utils/browser";
import {getPreference} from "../../utils";

export class ModulesModel {
    isLoaded = false;

    loadModules = async (moduleUrl: string) => {
        const preference = getPreference();

        if (preference.modules) {
            await loadFiles(preference.modules.split(","), true);
        }

        return request({
            json: {
                filter: {
                    [VAR_RECORD_CL_AVAILABLE]: 1,
                    [VAR_RECORD_CV_VERSION_API]: settingsStore.settings[VAR_SETTING_BRANCH_NAME],
                },
            },
            list: true,
            query: "GetModuleList",
        })
            .then((modules: Record<string, string>[]) =>
                modules.forEach(
                    ({
                        [VAR_RECORD_NAME]: moduleName,
                        [VAR_RECORD_CV_VERSION]: moduleVersion,
                        [VAR_RECORD_CC_CONFIG]: moduleConfig,
                        [VAR_RECORD_CC_MANIFEST]: moduleManifest,
                    }) => {
                        const files = JSON.parse(moduleConfig).files.map(
                            (fileName: string) => `${moduleUrl}/${moduleName}/${moduleVersion}${fileName}`,
                        );

                        setModule(moduleName, files, JSON.parse(moduleManifest) as any[]);
                    },
                ),
            )
            .catch((error) => {
                snackbarStore.snackbarOpenAction({
                    status: "error",
                    text: i18next.t("static:b9c874da6b0e4694b93db69088a556da"),
                });
                snackbarStore.snackbarOpenAction(
                    {
                        status: "debug",
                        text: error.message,
                    },
                    {[VAR_RECORD_NAME]: i18next.t("static:02f274362cf847cba8d806687d237698")},
                );
            })
            .then(() => {
                this.isLoaded = true;
            });
    };
}
