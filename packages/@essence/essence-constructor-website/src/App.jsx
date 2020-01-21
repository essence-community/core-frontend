import React, {Component, Suspense} from "react";
import {Provider} from "mobx-react";
import {createMuiTheme, CssBaseline, ThemeProvider} from "@material-ui/core";
import moment from "moment";
import "moment/locale/ru";
import {SnackbarMobx, themeVars, Tooltip} from "@essence-community/constructor-components";
import {snackbarStore, settingsStore} from "@essence-community/constructor-share/models";
import {PageLoader} from "@essence-community/constructor-share/uicomponents";
import {VAR_SETTING_PROJECT_LOADER} from "@essence-community/constructor-share/constants";

import {Block} from "./Components/Block/Block";
import Settings from "./Components/Settings/Settings";
import {AppRoutes} from "./AppRoutes";
import {stores} from "./Stores/stores";

themeVars.typography.fontFamily = `"Uni Neue Regular", ${themeVars.typography.fontFamily}`;

const theme = createMuiTheme(themeVars);

moment.locale("ru");

class App extends Component {
    render() {
        return (
            <Provider {...stores}>
                <ThemeProvider theme={theme}>
                    <Suspense
                        fallback={
                            <PageLoader isLoading loaderType={settingsStore.settings[VAR_SETTING_PROJECT_LOADER]} />
                        }
                    >
                        <Settings applicationStore={stores.applicationStore}>
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
                </ThemeProvider>
            </Provider>
        );
    }
}

export default App;
