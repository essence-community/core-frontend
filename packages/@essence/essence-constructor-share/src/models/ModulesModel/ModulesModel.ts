import {i18next} from "../../utils/I18n";
import {settingsStore} from "../SettingsModel";
import {VAR_SETTING_BRANCH_NAME} from "../../constants";
import {request} from "../../request";
import {setModule} from "../../components";
import {camelCaseKeys} from "../../utils";
import {snackbarStore} from "../SnackbarModel";

export class ModulesModel {
    isLoaded = false;

    loadModules = (moduleUrl: string) =>
        request({
            json: {
                filter: {
                    clAvailable: 1,
                    cvVersionApi: settingsStore.settings[VAR_SETTING_BRANCH_NAME],
                },
            },
            list: true,
            query: "GetModuleList",
        })
            .then((modules: Record<string, string>[]) =>
                modules.forEach(({cvName, cvVersion, ccConfig, ccManifest}) => {
                    const files = JSON.parse(ccConfig).files.map(
                        (fileName: string) => `${moduleUrl}/${cvName}/${cvVersion}${fileName}`,
                    );

                    setModule(cvName, files, camelCaseKeys(JSON.parse(ccManifest)) as any[]);
                }),
            )
            .catch((error) => {
                snackbarStore.snackbarOpenAction({
                    status: "error",
                    text: i18next.t("b9c874da6b0e4694b93db69088a556da"),
                });
                snackbarStore.snackbarOpenAction(
                    {
                        status: "debug",
                        text: error.message,
                    },
                    {cvName: i18next.t("02f274362cf847cba8d806687d237698")},
                );
            })
            .then(() => {
                this.isLoaded = true;
            });
}
