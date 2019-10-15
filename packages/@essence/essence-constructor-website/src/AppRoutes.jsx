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

import {ApplicationRouter} from "./containers/ApplicationRouter";
import {history} from "./history";

export const AppRoutes = () => (
    <Router history={history}>
        <Switch>
            <Route path="/auth" component={(props: any) => <AuthPage {...props} />} />
            <Route path="/redirect/:b64" component={(props: any) => <RedirectPage {...props} />} />
            <Route path="/reports/session/:session" component={(props: any) => <ReportsPage {...props} />} />
            <Route path="/reports/token/:token" component={(props: any) => <ReportsPage {...props} />} />
            <Route path="/pages/:ckId" component={(props: any) => <ApplicationRouter {...props} />} />
            <AuthorizationPage>
                <Switch>
                    <Route path="/page/:ckId" component={(props: any) => <ProjectPage {...props} />} />
                    <Route path="/home" component={(props: any) => <HomePage {...props} />} />
                    <Route path="/preference" component={(props: any) => <PreferencePage {...props} />} />
                    <Redirect to="/auth" />
                </Switch>
            </AuthorizationPage>
        </Switch>
    </Router>
);
