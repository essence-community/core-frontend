// @flow
import * as React from "react";
import {camelCaseKeys, initI18n, WithT, withTranslation} from "@essence/essence-constructor-share/utils";
import {settingsStore} from "@essence/essence-constructor-share/models/SettingsModel";
import {observer} from "mobx-react";
import {COMMIT_ID, BRANCH_DATE_TIME, BRANCH_NAME} from "../../constants";
import {type ApplicationModelType} from "../../Stores/ApplicationModel";

type PropsType = WithT & {
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
                cv_value: this.props.t("26686005b3584a12aeb9ca9e96e54753", {
                    BRANCH_DATE_TIME,
                    BRANCH_NAME,
                    COMMIT_ID,
                }),
            },
        ];
        /* eslint-enable camelcase */

        applicationStore.settingsStore.recordsStore.setRecordsAction(camelCaseKeys(setting));

        settingsStore.setSettings(setting);

        initI18n();

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
            return this.props.t("8aebd9c71dda43fc8583d96f1d4d0d01");
        }

        return this.props.children;
    }
}

export default withTranslation("meta")(observer(Settings));
