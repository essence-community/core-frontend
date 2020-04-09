// @flow
import * as React from "react";
import {Router, Route, Switch, Redirect} from "react-router-dom";
import ProjectPage from "./Pages/ProjectPage";

import HomePage from "./Pages/HomePage/HomePage";

import AuthorizationPage from "./Pages/AuthorizationPage/AuthorizationPage";
import PreferencePage from "./Pages/PreferencePage/PreferencePage";
import ReportsPage from "./Pages/ReportsPage/ReportsPage";
import RedirectPage from "./Pages/RedirectPage/RedirectPage";
import FramePage from "./Pages/FramePage/FramePage";

import {ApplicationRouter} from "./containers/ApplicationRouter";
import {history} from "./history";

export const AppRoutes = () => (
    <Router history={history}>
        <Switch>
            <Route path="/redirect/:b64" render={(props: any) => <RedirectPage {...props} />} />
            <Route path="/reports/session/:session" render={(props: any) => <ReportsPage {...props} />} />
            <Route path="/reports/token/:token" render={(props: any) => <ReportsPage {...props} />} />
            <Route
                path="/frame/session/:session/:app/:pageId/:filter?"
                render={(props: any) => <FramePage {...props} />}
            />
            <Route path="/frame/token/:token/:app/:pageId/:filter?" render={(props: any) => <FramePage {...props} />} />
            <Route
                path={["/page/:ckId", "/home", "/preference"]}
                exact
                render={() => (
                    <AuthorizationPage>
                        <Switch>
                            <Route path="/page/:ckId" render={(props: any) => <ProjectPage {...props} />} />
                            <Route path="/home" render={(props: any) => <HomePage {...props} />} />
                            <Route path="/preference" render={(props: any) => <PreferencePage {...props} />} />
                            {/* <Redirect to="/auth" /> */}
                        </Switch>
                    </AuthorizationPage>
                )}
            />
            <Route path="/:appName/:ckId?/:filter?" render={(props: any) => <ApplicationRouter {...props} />} />
            <Redirect to="/auth" />
        </Switch>
    </Router>
);
