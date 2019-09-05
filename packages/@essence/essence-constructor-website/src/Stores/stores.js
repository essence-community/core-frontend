/* eslint-disable jsx-a11y/href-no-hash */
// @flow
import {applicationStore, ApplicationModelType} from "./ApplicationModel";
import {AuthModel, type AuthModelType} from "./AuthModel";

export type StoresType = {|
    applicationStore: ApplicationModelType,
    authStore: AuthModelType,
|};

export const stores: StoresType = {
    applicationStore,
    authStore: new AuthModel(),
};
