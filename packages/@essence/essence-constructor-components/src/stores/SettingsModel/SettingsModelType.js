// @flow
import {type DefaultRecordsModelInterface} from "../DefaultRecordsModel";

export interface SettingsModelInterface extends DefaultRecordsModelInterface {
    settings: Object;
}

export type SettingsModelType = SettingsModelInterface;
