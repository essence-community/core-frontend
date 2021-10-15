import * as React from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {settingsStore} from "@essence-community/constructor-share/models/SettingsModel";
import {VAR_SETTING_BASE_PATH} from "@essence-community/constructor-share/constants/variables";
import {ApplicationRouter} from "./Components/ApplicationRouter";

export const AppRoutes: React.FC = () => (
    <Router basename={settingsStore.settings[VAR_SETTING_BASE_PATH]}>
        <Switch>
            {/* Static pages from mocks */}
            <Route path="/reports/session/:session" component={ApplicationRouter} />
            <Route path="/reports/token/:token" component={ApplicationRouter} />
            <Route path="/redirect/:b64" component={ApplicationRouter} />
            <Route path="/frame/session/:session/:app/:pageId/:filter?" component={ApplicationRouter} />
            <Route path="/frame/token/:token/:app/:pageId/:filter?" component={ApplicationRouter} />
            <Route path="/safe/:ckId?/:filter?" component={ApplicationRouter} />
            <Route path="/preference" component={ApplicationRouter} />
            {/* Dynamic page from meta */}
            <Route path="/:appName?/:ckId?/:filter?" component={ApplicationRouter} />
        </Switch>
    </Router>
);
