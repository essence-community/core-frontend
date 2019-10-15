import {extendObservable, action} from "mobx";
import {VAR_SETTING_VALUE} from "../../constants";

export class SettingsModel {
    settings: Record<string, string>;

    constructor() {
        extendObservable(this, {
            settings: {},
        });
    }

    setSettings = action("SettingsModel.setSettings", (records: Record<string, string>[]) => {
        this.settings = records.reduce((acc: Record<string, string>, setting: Record<string, string>) => {
            acc[setting.ck_id] = setting[VAR_SETTING_VALUE];

            return acc;
        }, {});
    });
}
