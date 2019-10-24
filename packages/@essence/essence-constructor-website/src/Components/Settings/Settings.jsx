// @flow
import * as React from "react";
import {camelCaseKeys} from "@essence/essence-constructor-share";
import {settingsStore} from "@essence/essence-constructor-share/models/SettingsModel";
import {observer} from "mobx-react";
import {COMMIT_ID, BRANCH_DATE_TIME, BRANCH_NAME} from "../../constants";
import {type ApplicationModelType} from "../../Stores/ApplicationModel";

type PropsType = {
    children: React.Node,
    applicationStore: ApplicationModelType,
};

class Settings extends React.Component<PropsType> {
    componentDidMount() {
        const {applicationStore} = this.props;

        /* eslint-disable camelcase */
        const setting = [
            ...window.SETTINGS,
            {
                ck_id: "gSysFrontAppVersion",
                cv_value: `Версия ${COMMIT_ID} (${BRANCH_NAME} от ${BRANCH_DATE_TIME})`,
            },
        ];
        /* eslint-enable camelcase */

        applicationStore.settingsStore.recordsStore.setRecordsAction(camelCaseKeys(setting));

        settingsStore.setSettings(setting);

        const {settings} = applicationStore.settingsStore;

        const globalSettings = Object.keys(settings).reduce((acc, settingKey) => {
            if (settingKey.indexOf("g") === 0) {
                acc[settingKey] = settings[settingKey];
            }

            return acc;
        }, {});

        applicationStore.updateGlobalValuesAction(globalSettings);

        if (applicationStore.settingsStore.settings.projectName) {
            document.title = applicationStore.settingsStore.settings.projectName;
        }
    }

    render() {
        if (this.props.applicationStore.settingsStore.recordsStore.records.length === 0) {
            return "Загрузка...";
        }

        return this.props.children;
    }
}

export default observer(Settings);
