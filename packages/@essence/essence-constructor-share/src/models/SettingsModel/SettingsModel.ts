import {observable, computed, action} from "mobx";
import {
    VAR_SETTING_VALUE,
    VAR_RECORD_ID,
    VAR_SETTING_BASE_PATH,
    VAR_SETTING_BASE_URL,
    VAR_CACHE_DATE,
} from "../../constants/variables";
import cacheQueryStorage from "../../request/cacheQueryStorage";
import {loggerRoot} from "../../constants/base";

const logger = loggerRoot.extend("SettingsModel");

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
        if (this.settings[VAR_CACHE_DATE]) {
            cacheQueryStorage.load(this.settings[VAR_CACHE_DATE]).catch((err) => logger(err));
        }
    };
    @action
    setSetting = (key: string, value: string) => {
        this.settings[key] = value;
        if (key === VAR_CACHE_DATE) {
            cacheQueryStorage.load(this.settings[VAR_CACHE_DATE]).catch((err) => logger(err));
        }
    };
}
