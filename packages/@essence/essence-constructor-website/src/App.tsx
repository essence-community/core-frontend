import React, {Component, Suspense} from "react";
import {createMuiTheme, CssBaseline, ThemeProvider} from "@material-ui/core";
import moment from "moment";
import "moment/locale/ru";
import {SnackbarMobx, themeVars, Tooltip} from "@essence-community/constructor-components";
import {snackbarStore, settingsStore, ProjectModel} from "@essence-community/constructor-share/models";
import {ProjectContext} from "@essence-community/constructor-share/context";
import {PageLoader} from "@essence-community/constructor-share/uicomponents";
import {VAR_SETTING_PROJECT_LOADER} from "@essence-community/constructor-share/constants";

// TODO Need to use typesctipt
import {KeyboardStatusManager} from "./Components/KeyboardStatusManager";
import {Settings} from "./Components/Settings";

import {AppRoutes} from "./AppRoutes";

themeVars.typography.fontFamily = `"Uni Neue Regular", ${themeVars.typography.fontFamily}`;

const theme = createMuiTheme(themeVars);
const projectStore = new ProjectModel();

moment.locale("ru");

class App extends Component {
    render() {
        return (
            <ThemeProvider theme={theme}>
                <ProjectContext.Provider value={projectStore}>
                    <Suspense
                        fallback={
                            <PageLoader
                                container={null}
                                isLoading
                                loaderType={
                                    settingsStore.settings[VAR_SETTING_PROJECT_LOADER] as "default" | "bfl-loader"
                                }
                            />
                        }
                    >
                        <Settings>
                            <KeyboardStatusManager />
                            <AppRoutes />
                            <CssBaseline />
                            <SnackbarMobx
                                snackbars={snackbarStore.snackbars}
                                onClose={snackbarStore.snackbarCloseAction}
                                onSetCloseble={snackbarStore.setClosebleAction}
                            />
                            <Tooltip />
                        </Settings>
                    </Suspense>
                </ProjectContext.Provider>
            </ThemeProvider>
        );
    }
}

export default App;
