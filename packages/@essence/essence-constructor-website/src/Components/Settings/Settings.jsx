// @flow
import * as React from "react";
import {camelCaseKeys} from "@essence/essence-constructor-share";
import {settingsStore} from "@essence/essence-constructor-share/models/SettingsModel";
import {observer} from "mobx-react";
import {type ApplicationModelType} from "../../Stores/ApplicationModel";

type PropsType = {
    children: React.Node,
    applicationStore: ApplicationModelType,
};

class Settings extends React.Component<PropsType> {
    componentDidMount() {
        const {applicationStore} = this.props;

        applicationStore.settingsStore.recordsStore.setRecordsAction(camelCaseKeys(window.SETTINGS));

        const {settings} = applicationStore.settingsStore;

        const globalSettings = Object.keys(settings).reduce((acc, settingKey) => {
            if (settingKey.indexOf("g") === 0) {
                acc[settingKey] = settings[settingKey];
            }

            return acc;
        }, {});

        settingsStore.setSettings(window.SETTINGS);

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
