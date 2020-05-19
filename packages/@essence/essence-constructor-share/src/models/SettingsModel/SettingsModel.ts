import {extendObservable, action} from "mobx";
import {VAR_SETTING_VALUE, VAR_RECORD_ID} from "../../constants/variables";

export class SettingsModel {
    settings: Record<string, string>;

    globals: Record<string, string>;

    constructor() {
        extendObservable(this, {
            get globals() {
                return Object.keys(this.settings).reduce<Record<string, string>>((acc, settingKey) => {
                    if (settingKey.indexOf("g") === 0) {
                        acc[settingKey] = this.settings[settingKey];
                    }

                    return acc;
                }, {});
            },
            settings: {},
        });
    }

    setSettings = action("SettingsModel.setSettings", (records: Record<string, string>[]) => {
        this.settings = records.reduce((acc: Record<string, string>, setting: Record<string, string>) => {
            acc[setting[VAR_RECORD_ID]] = setting[VAR_SETTING_VALUE];

            return acc;
        }, {});
    });
}
