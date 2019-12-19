// @flow
import {type ObservableMap} from "mobx";

export {PageModelType} from "./PageModel";

export type SessionType = {
    session: string,
    login: string,
};

export interface ApplicationModelType {
    +session: string;
    +blockText: string;
    +login: string;
    +actions: Array<number>;
    +pagesStore: any;
    +isApplicationReady: boolean;
    +isBlock: boolean;
    +globalValues: ObservableMap<string, mixed>;
    +routesStore: any;
    +settingsStore: any;
    +authData: any;
    +setSesssionAction: (session: SessionType) => void;
    +logoutAction: () => void;
    +redirectToAction: (pageId: string, params: Object) => void;
    +updateGlobalValuesAction: (values: Object) => void;
    +blockApplicationAction: (type: string, text: string) => void;
}
