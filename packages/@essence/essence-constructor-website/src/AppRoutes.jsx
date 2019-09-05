/* eslint-disable jsx-a11y/href-no-hash */
// @flow
import * as React from "react";
import {Router, Route, Switch, Redirect} from "react-router-dom";
import AuthPage from "./Pages/AuthPage/AuthPage";
import ProjectPage from "./Pages/ProjectPage";

import HomePage from "./Pages/HomePage/HomePage";

import AuthorizationPage from "./Pages/AuthorizationPage/AuthorizationPage";
import PreferencePage from "./Pages/PreferencePage/PreferencePage";
import ReportsPage from "./Pages/ReportsPage/ReportsPage";
import RedirectPage from "./Pages/RedirectPage/RedirectPage";
import {history} from "./history";

const AppRoutes = () => (
    <Router history={history}>
        <Switch>
            <Route path="/auth" component={AuthPage} />
            <Route path="/redirect/:b64" component={RedirectPage} />
            <Route path="/reports/session/:session" component={ReportsPage} />
            <Route path="/reports/token/:token" component={ReportsPage} />
            <AuthorizationPage>
                <Switch>
                    <Route path="/page/:ckId" component={ProjectPage} />
                    <Route path="/home" component={HomePage} />
                    <Route path="/preference" component={PreferencePage} />
                    <Redirect to="/auth" />
                </Switch>
            </AuthorizationPage>
        </Switch>
    </Router>
);

export default AppRoutes;
