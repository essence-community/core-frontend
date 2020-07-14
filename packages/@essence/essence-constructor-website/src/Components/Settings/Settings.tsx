import * as React from "react";
import {initI18n, loadStore, i18next} from "@essence-community/constructor-share/utils";
import {settingsStore} from "@essence-community/constructor-share/models/SettingsModel";
import {
    VAR_RECORD_ID,
    VAR_RECORD_CV_VALUE,
    VAR_SETTING_PROJECT_NAME,
    VAR_SETTING_FRONT_BRANCH_DATE_TIME,
    VAR_SETTING_FRONT_BRANCH_NAME,
    VAR_SETTING_FRONT_COMMIT_ID,
} from "@essence-community/constructor-share/constants";

export const COMMIT_ID = process.env.REACT_APP_COMMIT_ID || "";
export const BRANCH_NAME = process.env.REACT_APP_BRANCH_NAME || "";
export const BRANCH_DATE_TIME = process.env.REACT_APP_BRANCH_DATE_TIME || "";
const RELOAD_APP = 5000;

export const Settings: React.FC = (props) => {
    const isReady = React.useMemo(() => {
        if (!(window as any).SETTINGS) {
            setTimeout(() => document.location.reload(), RELOAD_APP);

            return false;
        }

        const setting = [
            ...((window as any).SETTINGS || []),
            {
                [VAR_RECORD_CV_VALUE]: BRANCH_DATE_TIME,
                [VAR_RECORD_ID]: VAR_SETTING_FRONT_BRANCH_DATE_TIME,
            },
            {
                [VAR_RECORD_CV_VALUE]: BRANCH_NAME,
                [VAR_RECORD_ID]: VAR_SETTING_FRONT_BRANCH_NAME,
            },
            {
                [VAR_RECORD_CV_VALUE]: COMMIT_ID,
                [VAR_RECORD_ID]: VAR_SETTING_FRONT_COMMIT_ID,
            },
        ];

        settingsStore.setSettings(setting);

        loadStore();

        initI18n();

        if (settingsStore.settings[VAR_SETTING_PROJECT_NAME]) {
            document.title = settingsStore.settings[VAR_SETTING_PROJECT_NAME];
        }

        return true;
    }, []);

    return <>{isReady ? props.children : i18next.t("static:8aebd9c71dda43fc8583d96f1d4d0d01", "Loading...")}</>;
};
