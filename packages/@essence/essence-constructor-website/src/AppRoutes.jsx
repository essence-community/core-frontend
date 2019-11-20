/* eslint-disable jsx-a11y/href-no-hash */
// @flow
import * as React from "react";
import {Router, Route, Switch} from "react-router-dom";
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
            <Route path="/auth" render={(props: any) => <AuthPage {...props} />} />
            <Route path="/redirect/:b64" render={(props: any) => <RedirectPage {...props} />} />
            <Route path="/reports/session/:session" render={(props: any) => <ReportsPage {...props} />} />
            <Route path="/reports/token/:token" render={(props: any) => <ReportsPage {...props} />} />
            <Route
                path={["/page/:ckId", "/home", "/preference"]}
                render={() => (
                    <AuthorizationPage>
                        <Switch>
                            <Route path="/page/:ckId" render={(props: any) => <ProjectPage {...props} />} />
                            <Route path="/home" render={(props: any) => <HomePage {...props} />} />
                            <Route path="/preference" render={(props: any) => <PreferencePage {...props} />} />
                        </Switch>
                    </AuthorizationPage>
                )}
            />
            <Route path="/:appName/:ckId?" render={(props: any) => <ApplicationRouter {...props} />} />
        </Switch>
    </Router>
);
