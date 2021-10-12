import {observable, computed, action} from "mobx";
import {VAR_SETTING_VALUE, VAR_RECORD_ID, VAR_SETTING_BASE_PATH, VAR_SETTING_BASE_URL} from "../../constants/variables";

export class SettingsModel {
    @observable
    settings: Record<string, string> = {};

    @computed
    get globals(): Record<string, string> {
        return Object.keys(this.settings).reduce<Record<string, string>>((acc, settingKey) => {
            if (settingKey.indexOf("g") === 0) {
                acc[settingKey] = this.settings[settingKey];
            }

            return acc;
        }, {});
    }
    @action
    setSettings = (records: Record<string, string>[]) => {
        this.settings = records.reduce(
            (acc: Record<string, string>, setting: Record<string, string>) => {
                acc[setting[VAR_RECORD_ID]] = setting[VAR_SETTING_VALUE];

                return acc;
            },
            {
                [VAR_SETTING_BASE_PATH]: this.settings[VAR_SETTING_BASE_PATH],
                [VAR_SETTING_BASE_URL]: this.settings[VAR_SETTING_BASE_URL],
            },
        );
    };
    @action
    setSetting = (key: string, value: string) => {
        this.settings[key] = value;
    };
}
