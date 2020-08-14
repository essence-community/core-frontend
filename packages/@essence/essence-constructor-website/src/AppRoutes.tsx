import * as React from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {ApplicationRouter} from "./Components/ApplicationRouter";

const basename = process.env.REACT_APP_PUBLIC_URL || "";

export const AppRoutes: React.FC = () => (
    <Router basename={basename}>
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
