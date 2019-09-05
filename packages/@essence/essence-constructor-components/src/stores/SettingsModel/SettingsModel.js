// @flow
import camelCase from "lodash/camelCase";
import {extendObservable} from "mobx";
import {DefaultRecordsModel, type DefaultRecordsModelPropsType} from "../DefaultRecordsModel";

export class SettingsModel extends DefaultRecordsModel {
    constructor(props: DefaultRecordsModelPropsType) {
        super(props);

        extendObservable(this, {
            get settings() {
                return this.recordsStore.records.reduce((acc, setting) => {
                    acc[camelCase(setting.ckId)] = setting.cvValue;

                    return acc;
                }, {});
            },
        });
    }
}
