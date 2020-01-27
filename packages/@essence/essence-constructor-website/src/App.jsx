import React, {Component, Suspense} from "react";
import {Provider} from "mobx-react";
import {createMuiTheme, CssBaseline, ThemeProvider} from "@material-ui/core";
import moment from "moment";
import "moment/locale/ru";
import {SnackbarMobx, themeVars, Tooltip} from "@essence-community/constructor-components";
import {snackbarStore, settingsStore, ProjectModel} from "@essence-community/constructor-share/models";
import {ProjectContext} from "@essence-community/constructor-share/context";
import {PageLoader} from "@essence-community/constructor-share/uicomponents";
import {VAR_SETTING_PROJECT_LOADER} from "@essence-community/constructor-share/constants";

import {KeyboardStatusManager} from "./Components/KeyboardStatusManager/index.ts";
import {Block} from "./Components/Block/Block";
import Settings from "./Components/Settings/Settings";
import {AppRoutes} from "./AppRoutes";
import {stores} from "./Stores/stores";

themeVars.typography.fontFamily = `"Uni Neue Regular", ${themeVars.typography.fontFamily}`;

const theme = createMuiTheme(themeVars);
const projectStore = new ProjectModel();

moment.locale("ru");

class App extends Component {
    render() {
        return (
            <Provider {...stores}>
                <ThemeProvider theme={theme}>
                    <ProjectContext.Provider value={projectStore}>
                        <Suspense
                            fallback={
                                <PageLoader isLoading loaderType={settingsStore.settings[VAR_SETTING_PROJECT_LOADER]} />
                            }
                        >
                            <Settings applicationStore={stores.applicationStore}>
                                <KeyboardStatusManager />
                                <AppRoutes />
                                <CssBaseline />
                                <SnackbarMobx
                                    snackbars={snackbarStore.snackbars}
                                    onClose={snackbarStore.snackbarCloseAction}
                                    onSetCloseble={snackbarStore.setClosebleAction}
                                />
                                <Tooltip />
                                <Block applicationStore={stores.applicationStore} />
                            </Settings>
                        </Suspense>
                    </ProjectContext.Provider>
                </ThemeProvider>
            </Provider>
        );
    }
}

export default App;
