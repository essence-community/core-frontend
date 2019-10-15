import {settingsStore} from "../SettingsModel";
import {VAR_SETTING_BRANCH_NAME} from "../../constants";
import {request} from "../../request";
import {setModule} from "../../components";
import {camelCaseKeys} from "../../utils";
import {snackbarStore} from "../SnackbarModel";

export class ModulesModel {
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
                    text: "Невозможно загрузить модули",
                });
                snackbarStore.snackbarOpenAction(
                    {
                        status: "debug",
                        text: error.message,
                    },
                    {cvName: "Модули"},
                );
            });
}
