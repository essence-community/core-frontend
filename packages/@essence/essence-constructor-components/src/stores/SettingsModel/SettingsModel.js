// @flow
import {extendObservable} from "mobx";
import {VAR_RECORD_ID, VAR_SETTING_VALUE} from "@essence-community/constructor-share/constants";
import {DefaultRecordsModel, type DefaultRecordsModelPropsType} from "../DefaultRecordsModel";

export class SettingsModel extends DefaultRecordsModel {
    constructor(props: DefaultRecordsModelPropsType) {
        super(props);

        extendObservable(this, {
            get settings() {
                return this.recordsStore.records.reduce((acc, setting) => {
                    acc[setting[VAR_RECORD_ID]] = setting[VAR_SETTING_VALUE];

                    return acc;
                }, {});
            },
        });
    }
}
