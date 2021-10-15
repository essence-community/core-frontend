import React, {Component, Suspense} from "react";
import moment from "moment";
import "moment/locale/ru";
import {settingsStore} from "@essence-community/constructor-share/models/SettingsModel";
import {ProjectModel} from "@essence-community/constructor-share/models/ProjectModel";
import {ProjectContext} from "@essence-community/constructor-share/context";
import {PageLoader, Tooltip} from "@essence-community/constructor-share/uicomponents";
import {
    VAR_SETTING_BASE_PATH,
    VAR_SETTING_BASE_URL,
    VAR_SETTING_PROJECT_LOADER,
} from "@essence-community/constructor-share/constants";

import {KeyboardStatusManager} from "./Components/KeyboardStatusManager";
import {Settings} from "./Components/Settings";
import {AppRoutes} from "./AppRoutes";

const projectStore = new ProjectModel();

moment.locale("ru");
const basename = process.env.REACT_APP_PUBLIC_URL || "";

settingsStore.setSetting(VAR_SETTING_BASE_PATH, basename);
settingsStore.setSetting(VAR_SETTING_BASE_URL, document.location.origin);

class App extends Component {
    render() {
        return (
            <ProjectContext.Provider value={projectStore}>
                <Suspense
                    fallback={
                        <PageLoader
                            container={null}
                            isLoading
                            loaderType={settingsStore.settings[VAR_SETTING_PROJECT_LOADER] as "default" | "bfl-loader"}
                        />
                    }
                >
                    <Settings>
                        <KeyboardStatusManager />
                        <AppRoutes />
                        <Tooltip />
                    </Settings>
                </Suspense>
            </ProjectContext.Provider>
        );
    }
}

export default App;
