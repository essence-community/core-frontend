// @flow
import * as React from "react";
import {camelCaseKeys} from "@essence/essence-constructor-share/utils";
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

        applicationStore.updateGlobalValuesAction(globalSettings);

        if (applicationStore.settingsStore.settings.projectName) {
            document.title = applicationStore.settingsStore.settings.projectName;
        }
    }

    render() {
        const {settingsStore} = this.props.applicationStore;

        if (settingsStore.recordsStore.records.length === 0) {
            return "Загрузка...";
        }

        return this.props.children;
    }
}

export default observer(Settings);
