// @flow
import {authStore, applicationStore, ApplicationModelType} from "./ApplicationModel";
import {type AuthModelType} from "./AuthModel";

export type StoresType = {|
    applicationStore: ApplicationModelType,
    authStore: AuthModelType,
|};

export const stores: StoresType = {
    applicationStore,
    authStore,
};
