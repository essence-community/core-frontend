import * as React from "react";
import {unstable_HistoryRouter as HistoryRouter, Route, Routes} from "react-router-dom";
import {settingsStore} from "@essence-community/constructor-share/models/SettingsModel";
import {VAR_SETTING_BASE_PATH} from "@essence-community/constructor-share/constants/variables";
import {appHistory} from "@essence-community/constructor-share/utils/appHistory";
import {ApplicationRouter} from "./Components/ApplicationRouter";

export const AppRoutes: React.FC = () => (
    <HistoryRouter basename={settingsStore.settings[VAR_SETTING_BASE_PATH]} history={appHistory}>
        <Routes>
            {/* Static pages from mocks */}
            <Route path="/reports/session/:session" element={<ApplicationRouter />} />
            <Route path="/reports/token/:token" element={<ApplicationRouter />} />
            <Route path="/redirect/:b64" element={<ApplicationRouter />} />
            <Route path="/frame/session/:session/:app/:pageId/:filter?" element={<ApplicationRouter />} />
            <Route path="/frame/token/:token/:app/:pageId/:filter?" element={<ApplicationRouter />} />
            <Route path="/safe/:ckId?/:filter?" element={<ApplicationRouter />} />
            <Route path="/preference" element={<ApplicationRouter />} />
            {/* Dynamic page from meta */}
            <Route path="/:appName?/:ckId?/:filter?" element={<ApplicationRouter />} />
        </Routes>
    </HistoryRouter>
);
