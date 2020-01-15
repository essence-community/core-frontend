// @flow
import * as React from "react";
import {inject} from "mobx-react";
import {VAR_RECORD_CV_TOKEN} from "@essence-community/constructor-share/constants";
import {type StoresType} from "../../Stores/stores";
import {type AuthModelType} from "../../Stores/AuthModel";

type OwnType = {
    match: {
        params: {
            session?: string,
            token?: string,
        },
    },
    history: History,
};

type StoresPropsType = {
    authStore: AuthModelType,
};

type PropsType = OwnType & StoresPropsType;

const mapStoresToProps = (stores: StoresType): StoresPropsType => ({
    authStore: stores.authStore,
});

class ReportsPage extends React.Component<PropsType> {
    componentDidMount() {
        const {authStore, history} = this.props;
        const {session, token} = this.props.match.params;

        if (session) {
            authStore.successLoginAction(
                {
                    mode: "reports",
                    session,
                },
                history,
            );
        } else if (token) {
            authStore.loginAction(
                {
                    [VAR_RECORD_CV_TOKEN]: token,
                },
                history,
                {
                    mode: "reports",
                },
            );
        }
    }

    render() {
        return null;
    }
}

export default inject(mapStoresToProps)(ReportsPage);
