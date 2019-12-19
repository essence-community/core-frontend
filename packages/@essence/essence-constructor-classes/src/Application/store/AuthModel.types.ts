import {VAR_RECORD_CV_LOGIN, VAR_RECORD_CA_ACTIONS} from "@essence/essence-constructor-share/constants";

export interface IAuthSession {
    session: string;
    [VAR_RECORD_CV_LOGIN]: string;
    [VAR_RECORD_CA_ACTIONS]: number[];
}
