import * as React from "react";
import {Router, Route, Switch} from "react-router-dom";
import {ApplicationRouter} from "./Components/ApplicationRouter";
import {history} from "./history";

export const AppRoutes = () => (
    <Router history={history}>
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
